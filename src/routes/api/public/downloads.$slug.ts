import { createFileRoute } from "@tanstack/react-router";
import homeownersCheatSheetB64 from "@/assets/downloads/homeowners-cheat-sheet.pdf.base64";

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

const cheatSheetBytes = b64ToBytes(homeownersCheatSheetB64);

const FILES: Record<string, { bytes: Uint8Array; downloadName: string }> = {
  "homeowners-cheat-sheet": {
    bytes: cheatSheetBytes,
    downloadName: "XPRT-Homeowners-Insurance-Cheat-Sheet.pdf",
  },
  // Ebook placeholder — serves the cheat-sheet bytes until the full ebook PDF is uploaded.
  "homeowners-ebook": {
    bytes: cheatSheetBytes,
    downloadName: "XPRT-Complete-Homeowners-Coverage-Guide.pdf",
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
