import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent" }) }),
  lead_magnet_id: z.string().uuid().optional(),
  category_tag: z.string().max(80).optional(),
  source_path: z.string().max(300).optional(),
  state: z.enum(["NV", "CO"]).optional(),
  // Optional structured metadata. Stored in `notes` as JSON so a
  // GoHighLevel webhook handler can read all marketing context server-side
  // without any further schema changes.
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

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("lead_submissions").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      consent: data.consent,
      lead_magnet_id: data.lead_magnet_id ?? null,
      category_tag: data.category_tag ?? null,
      source_path: data.source_path ?? null,
      state: data.state ?? null,
      notes: data.meta ? JSON.stringify(data.meta) : null,
    });
    if (error) {
      console.error("submitLead failed:", error);
      return { ok: false as const, error: "Could not submit. Please try again." };
    }

    // GoHighLevel webhook hook (server-side). When GHL_WEBHOOK_URL is set
    // as a secret, forward a normalized payload. Failures are non-fatal —
    // the lead is already saved in Supabase.
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

    return { ok: true as const };
  });
