/**
 * SEO + JSON-LD utilities for XPRT Insurance.
 * Use these helpers inside a route's `head()` to inject structured data.
 */

const SITE_URL = "https://www.xprtinsurance.com";
const ORG_NAME = "XPRT Insurance, A Roni Rivers Agency";

export const SITE = {
  url: SITE_URL,
  name: ORG_NAME,
  legalName: "XPRT Insurance — A Roni Rivers Agency",
  phone: "+17027663394",
  email: "info@xprtinsurance.com",
  states: ["NV", "CO"],
  description:
    "Independent insurance agency licensed in Nevada and Colorado. Personal, commercial, bonds, and dealership coverage. Educational, advisor-led, bilingual.",
  sameAs: [
    "https://maps.app.goo.gl/9utR7ynkfkt4V2V47",
    "https://www.facebook.com/xprtins/",
    "https://www.instagram.com/xprtinsurance/",
  ] as string[],
  addresses: [
    {
      streetAddress: "2525 S Bruce St",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89169",
      addressCountry: "US",
      telephone: "+17027663394",
    },
    {
      streetAddress: "1350 40th St",
      addressLocality: "Denver",
      addressRegion: "CO",
      postalCode: "80205",
      addressCountry: "US",
      telephone: "+17253442211",
    },
  ],
  /** Primary address for backwards compatibility. */
  get address() {
    const a = this.addresses[0];
    return {
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    };
  },
};

/** Stable @id anchors so all schemas reference one entity. */
export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#roni-rivers`;

const LOGO_URL = `${SITE_URL}/favicon.ico`;

/**
 * Stable, site-wide "last reviewed" date used as a fallback when individual
 * content rows don't carry their own `updated_at`. Bump manually on
 * meaningful editorial passes — never `new Date()`, because that re-stamps
 * every render and looks like auto-generated spam to Google/LLMs.
 */
export const SITE_LAST_REVIEWED = "2026-05-20";

export function canonical(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a page title that stays under `limit` chars (default 60) by truncating
 * the lead text and appending " | XPRT Insurance".
 */
export function brandedTitle(lead: string, limit = 60): string {
  const suffix = " | XPRT Insurance";
  const maxLead = limit - suffix.length;
  const trimmed = lead.trim().replace(/[.?!]+$/, "");
  if (trimmed.length <= maxLead) return `${trimmed}${suffix}`;
  return `${trimmed.slice(0, maxLead - 1).trimEnd()}…${suffix}`;
}

type Meta = { title?: string; name?: string; property?: string; content?: string; charSet?: string };
type LinkTag = { rel: string; href: string; hreflang?: string };
type ScriptTag = { type?: string; children?: string };

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  locale?: "en" | "es";
  alternates?: { en?: string; es?: string };
}): { meta: Meta[]; links: LinkTag[]; scripts: ScriptTag[] } {
  const url = canonical(opts.path);
  const image = opts.image;
  const locale = opts.locale ?? "en";
  const ogLocale = locale === "es" ? "es_US" : "en_US";
  const ogLocaleAlt = locale === "es" ? "en_US" : "es_US";
  const meta: Meta[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: ogLocale },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  const links: LinkTag[] = [{ rel: "canonical", href: url }];
  if (opts.alternates) {
    const { en, es } = opts.alternates;
    if (en) {
      links.push({ rel: "alternate", hreflang: "en", href: canonical(en) } as LinkTag);
      links.push({ rel: "alternate", hreflang: "x-default", href: canonical(en) } as LinkTag);
    }
    if (es) {
      links.push({ rel: "alternate", hreflang: "es", href: canonical(es) } as LinkTag);
      meta.push({ property: "og:locale:alternate", content: locale === "es" ? "en_US" : "es_US" });
    } else if (en) {
      meta.push({ property: "og:locale:alternate", content: ogLocaleAlt });
    }
  }
  const scripts: ScriptTag[] = [];
  if (opts.jsonLd) {
    const arr = Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd];
    for (const obj of arr) {
      scripts.push({ type: "application/ld+json", children: JSON.stringify(obj) });
    }
  }
  return { meta, links, scripts };
}

/**
 * Full Organization (InsuranceAgency) block. Emit ONCE in __root.tsx so every
 * page references the same entity by @id. Omits placeholder phone/address so
 * we don't poison NAP — fill in SITE.phone / SITE.address to populate.
 */
export const orgJsonLd = () => {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    image: LOGO_URL,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
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
  };
  if (SITE.addresses.length > 0) {
    const addresses = SITE.addresses.map((a) => ({
      "@type": "PostalAddress",
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    }));
    node.address = addresses.length === 1 ? addresses[0] : addresses;
    node.location = SITE.addresses.map((a) => ({
      "@type": "Place",
      name: `XPRT Insurance — ${a.addressLocality}`,
      telephone: a.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: a.streetAddress,
        addressLocality: a.addressLocality,
        addressRegion: a.addressRegion,
        postalCode: a.postalCode,
        addressCountry: a.addressCountry,
      },
    }));
  }
  if (SITE.sameAs.length > 0) node.sameAs = SITE.sameAs;
  return node;
};

/** Sitewide WebSite entity — helps Google sitelinks and entity graphs. */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  inLanguage: ["en-US", "es-US"],
  publisher: { "@id": ORG_ID },
});

/** Author entity for FAQ articles — drives EEAT and AI citation. */
export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Roni Rivers",
  jobTitle: "Licensed Insurance Advisor",
  worksFor: { "@id": ORG_ID },
  knowsLanguage: ["en", "es"],
  knowsAbout: [
    "Homeowners Insurance",
    "Auto Insurance",
    "Surety Bonds",
    "Dealership Insurance",
    "Commercial Insurance",
  ],
  sameAs: [
    "https://www.linkedin.com/in/veronica-rivera-nunez-a66b6458/",
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

/**
 * FAQPage — pairs Q&A and references publisher entity. Pass `path` to attach
 * `mainEntityOfPage` and `inLanguage`. `speakableSelectors` enables voice/AI
 * answer extraction (matches CSS selectors on the page).
 */
export const faqPageJsonLd = (
  qas: { question: string; answer: string }[],
  opts?: {
    path?: string;
    locale?: "en" | "es";
    speakableSelectors?: string[];
  },
) => {
  const locale = opts?.locale ?? "en";
  const inLanguage = locale === "es" ? "es-US" : "en-US";
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer, inLanguage },
    })),
  };
  if (opts?.path) {
    node["@id"] = `${canonical(opts.path)}#faq`;
    node.mainEntityOfPage = canonical(opts.path);
  }
  if (opts?.speakableSelectors && opts.speakableSelectors.length > 0) {
    node.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors,
    };
  }
  return node;
};

/**
 * Article schema for FAQ answer pages — adds author/publisher/dates so LLMs
 * can attribute the content. Use ALONGSIDE faqPageJsonLd on slug pages.
 */
export const articleFaqJsonLd = (opts: {
  headline: string;
  description: string;
  path: string;
  locale?: "en" | "es";
  datePublished?: string;
  dateModified?: string;
  speakableSelectors?: string[];
}) => {
  const url = canonical(opts.path);
  const locale = opts.locale ?? "en";
  const inLanguage = locale === "es" ? "es-US" : "en-US";
  // Default to a stable build date so crawlers see freshness signals.
  const today = new Date().toISOString().slice(0, 10);
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: opts.headline.slice(0, 110),
    description: opts.description,
    url,
    mainEntityOfPage: url,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    datePublished: opts.datePublished ?? today,
    dateModified: opts.dateModified ?? today,
    image: LOGO_URL,
  };
  if (opts.speakableSelectors && opts.speakableSelectors.length > 0) {
    node.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors,
    };
  }
  return node;
};

export const serviceJsonLd = (opts: { name: string; description: string; path: string; areaServed?: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: canonical(opts.path),
  provider: { "@id": ORG_ID },
  areaServed: (opts.areaServed ?? SITE.states).map((s) => ({ "@type": "State", name: s })),
});
