import { createFileRoute } from "@tanstack/react-router";
// Import the PDF bytes directly so the file is bundled into the Worker
// and we don't depend on runtime fetches to static asset hosts (which
// fail on Cloudflare Workers in production).
// @ts-expect-error - Vite handles ?arraybuffer imports for binary assets
import homeownersCheatSheetBuf from "@/assets/downloads/homeowners-cheat-sheet.pdf?arraybuffer";

const FILES: Record<string, { bytes: ArrayBuffer; downloadName: string }> = {
  "homeowners-cheat-sheet": {
    bytes: homeownersCheatSheetBuf as ArrayBuffer,
    downloadName: "XPRT-Homeowners-Insurance-Cheat-Sheet.pdf",
  },
};

export const Route = createFileRoute("/api/public/downloads/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const entry = FILES[params.slug];
        if (!entry) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(entry.bytes, {
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
