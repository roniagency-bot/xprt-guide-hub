import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import homeownersCheatSheetB64 from "@/assets/downloads/homeowners-cheat-sheet.pdf.base64";
import homeownersEbookB64 from "@/assets/downloads/homeowners-ebook.pdf.base64";
import dealershipStarterGuideB64 from "@/assets/downloads/nevada-dealership-starter-guide.pdf.base64";
import dealershipCheatSheetB64 from "@/assets/downloads/nevada-dealership-cheat-sheet.pdf.base64";

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

const FILES: Record<string, { bytes: Uint8Array; downloadName: string }> = {
  "homeowners-cheat-sheet": {
    bytes: b64ToBytes(homeownersCheatSheetB64),
    downloadName: "XPRT-Homeowners-Insurance-Cheat-Sheet.pdf",
  },
  "homeowners-ebook": {
    bytes: b64ToBytes(homeownersEbookB64),
    downloadName: "XPRT-Complete-Homeowners-Coverage-Guide.pdf",
  },
  "nevada-dealership-starter-guide": {
    bytes: b64ToBytes(dealershipStarterGuideB64),
    downloadName: "XPRT-Nevada-Dealership-Startup-Guide.pdf",
  },
  "nevada-dealership-cheat-sheet": {
    bytes: b64ToBytes(dealershipCheatSheetB64),
    downloadName: "XPRT-Nevada-Dealership-Insurance-Cheat-Sheet.pdf",
  },
};

async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  try {
    const data = new TextEncoder().encode(ip + "|xprt-downloads");
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/public/downloads/$slug")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const entry = FILES[params.slug];
        if (!entry) {
          return new Response("Not found", { status: 404 });
        }

        const url = new URL(request.url);
        const trackingToken = url.searchParams.get("t");

        // Fire-and-forget tracking — record the unique-link click and analytics
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ??
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            null;
          const ip_hash = await hashIp(ip);
          void supabaseAdmin
            .from("lead_magnet_events")
            .insert({
              slug: params.slug,
              event: trackingToken ? "download_success_tracked" : "download_success",
              user_agent: request.headers.get("user-agent"),
              referer: request.headers.get("referer"),
              ip_hash,
              metadata: {
                bytes: entry.bytes.byteLength,
                has_token: Boolean(trackingToken),
              },
            })
            .then(({ error }) => {
              if (error) console.error("lead_magnet_events insert failed", error);
            });

          if (trackingToken) {
            // Increment click counter on the unique download token. Atomic
            // enough for our needs — first/last_clicked timestamps + a
            // best-effort counter via read-modify-write.
            void (async () => {
              const { data: tok } = await supabaseAdmin
                .from("download_tokens")
                .select("click_count, first_clicked_at")
                .eq("token", trackingToken)
                .maybeSingle();
              if (!tok) return;
              const now = new Date().toISOString();
              await supabaseAdmin
                .from("download_tokens")
                .update({
                  click_count: (tok.click_count ?? 0) + 1,
                  first_clicked_at: tok.first_clicked_at ?? now,
                  last_clicked_at: now,
                })
                .eq("token", trackingToken);
            })().catch((e) =>
              console.error("download_token tracking failed", e),
            );
          }
        } catch (err) {
          console.error("download analytics error", err);
        }

        return new Response(entry.bytes as BodyInit, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${entry.downloadName}"`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
