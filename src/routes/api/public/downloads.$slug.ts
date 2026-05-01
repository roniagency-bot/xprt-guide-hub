import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Map of allowed lead-magnet slugs to the file in public/downloads/.
// Serving via /api/public/* bypasses the preview auth gate so emailed
// links and direct downloads work for end users.
const FILES: Record<string, { file: string; downloadName: string }> = {
  "homeowners-cheat-sheet": {
    file: "homeowners-cheat-sheet.pdf",
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
        try {
          const filePath = path.join(process.cwd(), "public", "downloads", entry.file);
          const data = await readFile(filePath);
          return new Response(new Uint8Array(data), {
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
