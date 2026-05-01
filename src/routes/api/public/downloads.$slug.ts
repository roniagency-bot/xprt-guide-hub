import { createFileRoute } from "@tanstack/react-router";
// Importing the PDF as a URL ensures it is bundled and served from a host
// that does NOT require auth (unlike /downloads/* on preview hosts).
import homeownersCheatSheet from "@/assets/downloads/homeowners-cheat-sheet.pdf?url";

const FILES: Record<string, { url: string; downloadName: string }> = {
  "homeowners-cheat-sheet": {
    url: homeownersCheatSheet,
    downloadName: "XPRT-Homeowners-Insurance-Cheat-Sheet.pdf",
  },
};

export const Route = createFileRoute("/api/public/downloads/$slug")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const entry = FILES[params.slug];
        if (!entry) {
          return new Response("Not found", { status: 404 });
        }
        try {
          // Fetch the bundled asset from the same origin and re-stream it
          // with a clean Content-Disposition so browsers download it nicely.
          const origin = new URL(request.url).origin;
          const assetUrl = entry.url.startsWith("http")
            ? entry.url
            : `${origin}${entry.url}`;
          const upstream = await fetch(assetUrl);
          if (!upstream.ok) {
            return new Response("File unavailable", { status: 502 });
          }
          return new Response(upstream.body, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `inline; filename="${entry.downloadName}"`,
              "Cache-Control": "public, max-age=3600",
            },
          });
        } catch (err) {
          console.error("download failed", err);
          return new Response("File unavailable", { status: 500 });
        }
      },
    },
  },
});
