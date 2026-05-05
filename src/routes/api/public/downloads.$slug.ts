import { createFileRoute } from "@tanstack/react-router";
import homeownersCheatSheetB64 from "@/assets/downloads/homeowners-cheat-sheet.pdf.base64";

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
