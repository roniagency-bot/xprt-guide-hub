// Central registry of GoHighLevel hosted forms.
// Add or change a form ID here and every CTA across the site updates.

export const GHL_FORMS = {
  contact: {
    id: "FNzG1pOCoN5RD2w5ziGZ",
    title: "Contact Us",
    description: "Send us a message and we'll get back to you shortly.",
  },
  personal_quote: {
    id: "4QLIBia5cQgQuWS2DLW9",
    title: "Personal Lines Quote",
    description: "Tell us a bit about your coverage needs and we'll be in touch.",
  },
  bonds: {
    id: "BAwL9ggoEzbScpGbKTG6",
    title: "Bond Application",
    description: "Start your surety bond application — most types issue online.",
  },
  commercial_quote: {
    id: "ORhIVKUzCHklssPs46Cm",
    title: "Commercial Insurance Quote",
    description:
      "Tell us about your business and we'll put together the right commercial coverage — general liability, property, bonds, dealership programs, and more.",
  },
  workers_comp: {
    id: "EgSOk7OI4iHtddPWb4JI",
    title: "Workers' Comp Quote",
    description: "Request a workers' compensation quote.",
  },
  commercial_auto: {
    id: "l7jflX6hwYoGENEcMwDp",
    title: "Commercial Auto Quote",
    description: "Request a commercial auto insurance quote.",
  },
} as const;

export type GhlFormKey = keyof typeof GHL_FORMS;

const GHL_BASE = "https://link.xprtinsurance.com/widget/form";

export function ghlFormUrl(key: GhlFormKey, sourcePath?: string): string {
  const cfg = GHL_FORMS[key];
  const params = new URLSearchParams();
  // GHL's "contact" form is served with notrack=true on the public link.
  if (key === "contact") params.set("notrack", "true");
  params.set("utm_source", "website");
  params.set("utm_medium", "cta");
  params.set("utm_content", key);
  if (sourcePath) params.set("page", sourcePath);
  return `${GHL_BASE}/${cfg.id}?${params.toString()}`;
}
