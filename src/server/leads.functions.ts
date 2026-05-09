import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

const LeadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent" }) }),
  lead_magnet_id: z.string().uuid().optional(),
  category_tag: z.string().max(80).optional(),
  source_path: z.string().max(300).optional(),
  state: z.enum(["NV", "CO"]).optional(),
  meta: z
    .object({
      first_name: z.string().trim().max(80).optional(),
      last_name: z.string().trim().max(80).optional(),
      lead_source: z.string().trim().max(120).optional(),
      resource_name: z.string().trim().max(160).optional(),
      page_url: z.string().trim().max(500).optional(),
      submitted_at: z.string().trim().max(40).optional(),
    })
    .partial()
    .optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") || "https://www.xprtinsurance.com";

function detectLang(source_path?: string, page_url?: string): "en" | "es" {
  const candidates = [source_path, page_url].filter(Boolean) as string[];
  for (const raw of candidates) {
    try {
      const path = raw.startsWith("http") ? new URL(raw).pathname : raw;
      if (path === "/es" || path.startsWith("/es/")) return "es";
    } catch {
      if (raw.startsWith("/es/") || raw === "/es") return "es";
    }
  }
  return "en";
}

function generateDownloadToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: inserted, error } = await supabaseAdmin
      .from("lead_submissions")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        consent: data.consent,
        lead_magnet_id: data.lead_magnet_id ?? null,
        category_tag: data.category_tag ?? null,
        source_path: data.source_path ?? null,
        state: data.state ?? null,
        notes: data.meta ? JSON.stringify(data.meta) : null,
      })
      .select("id")
      .single();
    if (error || !inserted) {
      console.error("submitLead failed:", error);
      return { ok: false as const, error: "Could not submit. Please try again." };
    }

    // GoHighLevel webhook (non-fatal)
    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone || null,
            state: data.state ?? null,
            consent: data.consent,
            category: data.category_tag ?? null,
            source_path: data.source_path ?? null,
            ...(data.meta ?? {}),
          }),
        });
      } catch (err) {
        console.error("GHL webhook forward failed:", err);
      }
    }

    // ─── Bilingual tripwire email with tracked download link ───
    if (data.lead_magnet_id) {
      try {
        const { data: magnet } = await supabaseAdmin
          .from("lead_magnets")
          .select("slug,title_en,title_es,is_published")
          .eq("id", data.lead_magnet_id)
          .maybeSingle();

        if (magnet?.is_published && magnet.slug) {
          const lang = detectLang(data.source_path, data.meta?.page_url);
          const offerTitle =
            (lang === "es" ? magnet.title_es : magnet.title_en) ||
            magnet.title_en ||
            magnet.slug;

          const token = generateDownloadToken();
          const { error: tokErr } = await supabaseAdmin
            .from("download_tokens")
            .insert({
              token,
              slug: magnet.slug,
              email: data.email.toLowerCase(),
              lead_submission_id: inserted.id,
              lang,
            });
          if (tokErr) {
            console.error("download_token insert failed:", tokErr);
          }

          const downloadUrl = `${SITE_URL}/api/public/downloads/${magnet.slug}?t=${token}`;
          const firstName =
            data.meta?.first_name ||
            data.full_name.trim().split(/\s+/)[0] ||
            undefined;

          const result = await enqueueTransactionalEmail({
            templateName: "tripwire-offer",
            recipientEmail: data.email,
            idempotencyKey: `tripwire-${inserted.id}`,
            templateData: {
              name: firstName,
              offerTitle,
              downloadUrl,
              lang,
            },
          });
          if (!result.ok) {
            console.warn("Tripwire email not queued:", result.error);
          }
        }
      } catch (err) {
        console.error("Tripwire delivery failed (non-fatal):", err);
      }
    }

    return { ok: true as const };
  });
