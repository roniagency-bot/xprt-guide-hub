import { createFileRoute } from "@tanstack/react-router";
import { fetchAllSlugs } from "@/server/content.server";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const data = await fetchAllSlugs();
        const staticUrls = ["/", "/about", "/contact", "/book", "/faq", "/states/nevada", "/states/colorado"];
        const urls: string[] = [];
        for (const u of staticUrls) urls.push(`<url><loc>${SITE.url}${u}</loc></url>`);
        for (const c of data.categories) urls.push(`<url><loc>${SITE.url}/services/${c.slug}</loc></url>`);
        for (const s of data.services) urls.push(`<url><loc>${SITE.url}/services/_/${s.slug}</loc></url>`);
        for (const f of data.faqs) urls.push(`<url><loc>${SITE.url}/faq/${f.slug}</loc></url>`);
        for (const m of data.magnets) urls.push(`<url><loc>${SITE.url}/offers/${m.slug}</loc></url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
