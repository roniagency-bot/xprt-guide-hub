/**
 * SEO + JSON-LD utilities for XPRT Insurance.
 * Use these helpers inside a route's `head()` to inject structured data.
 */

const SITE_URL = "https://www.xprtinsurance.com";
const ORG_NAME = "XPRT Insurance";

export const SITE = {
  url: SITE_URL,
  name: ORG_NAME,
  legalName: "XPRT Insurance — A Roni Rivers Agency",
  phone: "+1-702-000-0000",
  email: "info@xprtinsurance.com",
  states: ["NV", "CO"],
  description:
    "Independent insurance agency licensed in Nevada and Colorado. Personal, commercial, bonds, and dealership coverage. Educational, advisor-led, bilingual.",
};

export function canonical(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type Meta = { title?: string; name?: string; property?: string; content?: string; charSet?: string };
type LinkTag = { rel: string; href: string };
type ScriptTag = { type?: string; children?: string };

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}): { meta: Meta[]; links: LinkTag[]; scripts: ScriptTag[] } {
  const url = canonical(opts.path);
  const image = opts.image;
  const meta: Meta[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  const links: LinkTag[] = [{ rel: "canonical", href: url }];
  const scripts: ScriptTag[] = [];
  if (opts.jsonLd) {
    const arr = Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd];
    for (const obj of arr) {
      scripts.push({ type: "application/ld+json", children: JSON.stringify(obj) });
    }
  }
  return { meta, links, scripts };
}

export const orgJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  areaServed: [
    { "@type": "State", name: "Nevada" },
    { "@type": "State", name: "Colorado" },
  ],
  knowsLanguage: ["en", "es"],
  serviceType: [
    "Personal Insurance",
    "Commercial Insurance",
    "Surety Bonds",
    "Dealership Insurance",
  ],
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: canonical(it.path),
  })),
});

export const faqPageJsonLd = (qas: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qas.map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: { "@type": "Answer", text: qa.answer },
  })),
});

export const serviceJsonLd = (opts: { name: string; description: string; path: string; areaServed?: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: canonical(opts.path),
  provider: { "@type": "InsuranceAgency", name: SITE.name, url: SITE.url },
  areaServed: (opts.areaServed ?? SITE.states).map((s) => ({ "@type": "State", name: s })),
});
