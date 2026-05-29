import { createFileRoute } from "@tanstack/react-router";
import { fetchAllSlugs } from "@/server/content.server";
import { SITE } from "@/lib/seo";
import { HOMEOWNERS_FAQS } from "@/lib/homeowners-faqs";
import { BONDS_FAQS } from "@/lib/bonds-faqs";
import { DEALERSHIP_FAQS } from "@/lib/dealership-faqs";

const KC_CATEGORIES = ["homeowners", "bonds", "dealership"] as const;

function urlEntry(path: string, changefreq?: string, priority?: string) {
  const cf = changefreq ? `<changefreq>${changefreq}</changefreq>` : "";
  const pr = priority ? `<priority>${priority}</priority>` : "";
  return `<url><loc>${SITE.url}${path}</loc>${cf}${pr}</url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const data = await fetchAllSlugs();
        const urls: string[] = [];

        const staticUrls = [
          "/",
          "/about",
          "/book",
          "/es",
          "/es/about",
          "/es/book",
          "/states/nevada",
          "/states/colorado",
          "/bonds",
          "/es/bonds",
          "/bonds/auto-dealer-bond",
          "/contact",
          "/es/contact",

          "/personal/homeowners-insurance",
          "/es/personal/homeowners-insurance",
          "/personal/auto-insurance",
          "/personal/renters-insurance",
          "/personal/landlord-insurance",
        ];
        for (const u of staticUrls) urls.push(urlEntry(u, "monthly", "0.7"));


        for (const c of data.categories)
          urls.push(urlEntry(`/services/${c.slug}`, "monthly", "0.7"));
        for (const s of data.services)
          urls.push(urlEntry(`/services/_/${s.slug}`, "monthly", "0.6"));
        for (const m of data.magnets)
          urls.push(urlEntry(`/offers/${m.slug}`, "monthly", "0.5"));

        // Knowledge Center hub (EN + ES)
        urls.push(urlEntry("/faq", "weekly", "0.8"));
        urls.push(urlEntry("/es/faq", "weekly", "0.6"));

        // Knowledge Center category landing pages (EN + ES)
        for (const cat of KC_CATEGORIES) {
          urls.push(urlEntry(`/faq/${cat}`, "weekly", "0.8"));
          urls.push(urlEntry(`/es/faq/${cat}`, "weekly", "0.6"));
        }

        // Categorized FAQ detail pages (EN + ES) — auto-grow with each lib
        const categorized: Array<[string, { slug: string }[]]> = [
          ["homeowners", HOMEOWNERS_FAQS],
          ["bonds", BONDS_FAQS],
          ["dealership", DEALERSHIP_FAQS],
        ];
        for (const [cat, list] of categorized) {
          for (const f of list) {
            urls.push(urlEntry(`/faq/${cat}/${f.slug}`, "monthly", "0.6"));
            urls.push(urlEntry(`/es/faq/${cat}/${f.slug}`, "monthly", "0.5"));
          }
        }

        // Legacy flat /faq/$slug entries from CMS (kept for back-compat)
        for (const f of data.faqs)
          urls.push(urlEntry(`/faq/${f.slug}`, "monthly", "0.4"));

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
