import { createFileRoute } from "@tanstack/react-router";
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
