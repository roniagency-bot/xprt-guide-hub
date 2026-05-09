import { useLocation } from "@tanstack/react-router";

export type Lang = "en" | "es";

export function detectLang(pathname: string): Lang {
  return pathname.startsWith("/es/") || pathname === "/es" ? "es" : "en";
}

export function useLang(): Lang {
  const { pathname } = useLocation();
  return detectLang(pathname);
}

/**
 * Set of EN paths that have a Spanish equivalent. Keep this list in sync
 * whenever you add/remove an `es.*` route file. Used by toLangPath() so that
 * the EN→ES toggle never points at a non-existent Spanish page.
 *
 * Static prefixes match exactly; dynamic prefixes (those ending with "/")
 * match any sub-path.
 */
const ES_AVAILABLE_EXACT = new Set<string>([
  "/",
  "/faq",
  "/faq/homeowners",
  "/faq/bonds",
  "/faq/dealership",
  "/personal/homeowners-insurance",
  "/business-insurance/bonds",
]);
const ES_AVAILABLE_PREFIXES = [
  "/faq/homeowners/",
  "/faq/bonds/",
  "/faq/dealership/",
];

function hasSpanishVersion(enPath: string): boolean {
  if (ES_AVAILABLE_EXACT.has(enPath)) return true;
  return ES_AVAILABLE_PREFIXES.some((p) => enPath.startsWith(p));
}

/** Convert any /faq... path into its /es/faq... mirror, and vice versa. */
export function toLangPath(pathname: string, lang: Lang): string {
  const isEs = pathname.startsWith("/es/") || pathname === "/es";
  const stripped = isEs ? pathname.replace(/^\/es/, "") || "/" : pathname;
  if (lang === "en") return stripped;
  // Going EN → ES: only return the mirrored path if a Spanish route exists,
  // otherwise fall back to the Spanish Knowledge Center so the toggle never
  // produces a 404.
  if (!hasSpanishVersion(stripped)) return "/es";
  return stripped === "/" ? "/es" : `/es${stripped}`;
}

/** Merge a translation patch over an English source object. Missing fields fall back. */
export function applyTranslation<T extends object>(
  source: T,
  translation?: Partial<T>,
): T {
  if (!translation) return source;
  return { ...source, ...translation };
}

/** UI strings shared across Knowledge Center and FAQ pages. */
export const UI = {
  knowledgeCenter: { en: "Knowledge Center", es: "Centro de Conocimiento" },
  home: { en: "Home", es: "Inicio" },
  browseByCategory: { en: "Browse by category", es: "Explorar por categoría" },
  comingSoon: { en: "Coming soon", es: "Próximamente" },
  questions: { en: "questions", es: "preguntas" },
  question: { en: "question", es: "pregunta" },
  bookReview: { en: "Book a Review", es: "Reservar una revisión" },
  bookFreeReview: { en: "Book a Free Review", es: "Reservar una revisión gratuita" },
  bookFreeCoverageReview: {
    en: "Book a Free Coverage Review",
    es: "Reservar una revisión gratuita de cobertura",
  },
  shortAnswer: { en: "Short answer", es: "Respuesta breve" },
  whatThisMeans: { en: "What this means", es: "Qué significa esto" },
  whatToPrepare: { en: "What to prepare", es: "Qué preparar" },
  whatToReview: { en: "What to review", es: "Qué revisar" },
  nextStep: { en: "Next step", es: "Siguiente paso" },
  nvNote: { en: "Nevada note", es: "Nota sobre Nevada" },
  nvCoNote: { en: "Nevada & Colorado note", es: "Nota sobre Nevada y Colorado" },
  relatedBasics: { en: "Related basics", es: "Conceptos relacionados" },
  coverageCostDetails: { en: "Coverage & Cost Details", es: "Detalles de cobertura y costo" },
  readyForReview: {
    en: "Ready for a Coverage Review?",
    es: "¿Listo para una revisión de cobertura?",
  },
  understandingBasics: { en: "Understanding the Basics", es: "Conceptos básicos" },
  faqsHubTitle: {
    en: "Insurance guidance, organized clearly.",
    es: "Orientación de seguros, organizada con claridad.",
  },
  faqsHubLead: {
    en: "Start with the basics, compare important details, and take the next step when you're ready.",
    es: "Comienza con lo básico, compara los detalles importantes y da el siguiente paso cuando estés listo.",
  },
  freeGuides: { en: "Free Guides & Resources", es: "Guías y recursos gratuitos" },
  freeGuidesHeading: {
    en: "Download a guide or book a free coverage review.",
    es: "Descarga una guía o reserva una revisión gratuita de cobertura.",
  },
  freeGuidesLead: {
    en: "Walk through coverage on your own with a guide, or get a structured review with a licensed advisor.",
    es: "Revisa tu cobertura por tu cuenta con una guía o programa una revisión estructurada con un asesor licenciado.",
  },
  homeownersCheatSheet: {
    en: "Homeowners Cheat Sheet",
    es: "Guía rápida para propietarios",
  },
  downloadHomeownersCheatSheet: {
    en: "Download the Homeowners Cheat Sheet",
    es: "Descargar la guía rápida para propietarios",
  },
  visitHomeownersInsurance: {
    en: "Visit Homeowners Insurance",
    es: "Ver seguro de propietarios",
  },
  visitDealershipInsurance: {
    en: "Visit Dealership Insurance",
    es: "Ver seguro para concesionarios",
  },
  learnAboutBonds: { en: "Learn About Bonds", es: "Aprende sobre fianzas" },
  learnAboutDealerBonds: {
    en: "Learn About Dealer Bonds",
    es: "Aprende sobre fianzas para concesionarios",
  },
  quotePurchaseOnline: {
    en: "Quote & Purchase Online",
    es: "Cotizar y comprar en línea",
  },
  quoteDealerBondOnline: {
    en: "Quote a Dealer Bond Online",
    es: "Cotizar una fianza de concesionario en línea",
  },
  bookQuickBondReview: {
    en: "Book a Quick Bond Review",
    es: "Reservar una revisión rápida de fianzas",
  },
  downloadBondQuickGuide: {
    en: "Download the Bond Quick Guide",
    es: "Descargar la guía rápida de fianzas",
  },
  noteOnlyEnglish: {
    en: "",
    es: "Nota: el formulario de reserva y algunas páginas de productos están actualmente disponibles solo en inglés. Atendemos en español por teléfono.",
  },
  englishLabel: { en: "English", es: "English" },
  spanishLabel: { en: "Español", es: "Español" },
  switchLanguage: { en: "Switch language", es: "Cambiar idioma" },
  hubBreadcrumb: { en: "Knowledge Center", es: "Centro de Conocimiento" },
  // Hub category meta
  hubEyebrow: { en: "Knowledge Center", es: "Centro de Conocimiento" },
  // Detail CTA blurbs
  ctaReviewDealershipTitle: {
    en: "Ready to review your Nevada dealership coverage?",
    es: "¿Listo para revisar la cobertura de tu concesionario en Nevada?",
  },
  ctaReviewDealershipSubtitle: {
    en: "Book a free 20-minute review of garage liability, open lot, garagekeepers, workers' comp, umbrella, and your dealer bond — all in one structured walk-through.",
    es: "Reserva una revisión gratuita de 20 minutos de garage liability, open lot, garagekeepers, compensación laboral, umbrella y tu fianza de concesionario, todo en un recorrido estructurado.",
  },
  ctaQuoteBondTitle: {
    en: "Ready to quote your bond?",
    es: "¿Listo para cotizar tu fianza?",
  },
  ctaQuoteBondSubtitle: {
    en: "Quote and purchase common bonds online, or book a short bond review for help with larger or specialized bonds in Nevada and Colorado.",
    es: "Cotiza y compra fianzas comunes en línea, o reserva una revisión breve para fianzas más grandes o especializadas en Nevada y Colorado.",
  },
  // FAQ category labels (hub cards)
  catHomeownersTitle: {
    en: "Homeowners Insurance",
    es: "Seguro de propietarios",
  },
  catHomeownersDesc: {
    en: "Coverage, exclusions, replacement cost, endorsements, liability, and renewal reviews for Nevada and Colorado homeowners.",
    es: "Cobertura, exclusiones, costo de reemplazo, endosos, responsabilidad civil y revisiones de renovación para propietarios en Nevada y Colorado.",
  },
  catBondsTitle: { en: "Bonds", es: "Fianzas" },
  catBondsDesc: {
    en: "What surety bonds are, why they're required, what affects approval and pricing, and how to quote and purchase online.",
    es: "Qué son las fianzas de garantía, por qué se requieren, qué afecta la aprobación y el precio, y cómo cotizarlas y comprarlas en línea.",
  },
  catDealershipTitle: {
    en: "Dealership Insurance",
    es: "Seguro para concesionarios",
  },
  catDealershipDesc: {
    en: "Nevada-focused: garage liability, open lot, garagekeepers, workers' comp, umbrella, and the $100,000 dealer bond.",
    es: "Enfocado en Nevada: garage liability, open lot, garagekeepers, compensación laboral, umbrella y la fianza de concesionario de $100,000.",
  },
  catAutoTitle: { en: "Auto Insurance", es: "Seguro de auto" },
  catAutoDesc: {
    en: "Personal auto coverage basics, cost, and how to review your policy.",
    es: "Conceptos básicos de cobertura de auto personal, costo y cómo revisar tu póliza.",
  },
  catRentersTitle: { en: "Renters Insurance", es: "Seguro de inquilinos" },
  catRentersDesc: {
    en: "What renters insurance covers and how to size your limits.",
    es: "Qué cubre el seguro de inquilinos y cómo dimensionar tus límites.",
  },
  catLandlordTitle: { en: "Landlord Insurance", es: "Seguro para propietarios de alquiler" },
  catLandlordDesc: {
    en: "Rental property coverage essentials for owners and small portfolios.",
    es: "Coberturas esenciales de propiedades de alquiler para dueños y portafolios pequeños.",
  },
  catGLTitle: { en: "General Liability", es: "Responsabilidad civil general" },
  catGLDesc: {
    en: "Business liability basics for small and growing companies.",
    es: "Conceptos básicos de responsabilidad civil para empresas pequeñas y en crecimiento.",
  },
  catWCTitle: { en: "Workers' Compensation", es: "Compensación laboral" },
  catWCDesc: {
    en: "When workers' comp is required and how it's priced.",
    es: "Cuándo se requiere la compensación laboral y cómo se calcula.",
  },
  catCommAutoTitle: { en: "Commercial Auto", es: "Auto comercial" },
  catCommAutoDesc: {
    en: "Coverage for vehicles used in business operations.",
    es: "Cobertura para vehículos utilizados en operaciones comerciales.",
  },
  // Disclaimers
  disclaimerHomeowners: {
    en: "Coverage can vary by state, carrier, underwriting, endorsements, and policy language. This information is educational and is not legal advice or a guarantee of coverage. Always confirm details with your specific policy and licensed advisor.",
    es: "La cobertura puede variar según el estado, la aseguradora, la suscripción, los endosos y el lenguaje de la póliza. Esta información es educativa y no constituye asesoría legal ni garantiza cobertura. Confirma siempre los detalles con tu póliza específica y un asesor licenciado.",
  },
  disclaimerBonds: {
    en: "Bond requirements, underwriting, approval, pricing, and eligibility vary by state, obligee, surety company, and application details. This information is educational and is not legal advice. Completing a quote does not guarantee approval or issuance.",
    es: "Los requisitos de la fianza, la suscripción, la aprobación, el precio y la elegibilidad varían según el estado, el obligante, la compañía surety y los detalles de la solicitud. Esta información es educativa y no constituye asesoría legal. Completar una cotización no garantiza la aprobación ni la emisión.",
  },
  disclaimerDealership: {
    en: "Dealership insurance is offered for Nevada dealers. Coverage availability, eligibility, limits, and pricing depend on the carrier, underwriting, application details, endorsements, exclusions, and Nevada DMV licensing requirements. This information is educational and is not legal advice or a guarantee of coverage.",
    es: "El seguro para concesionarios se ofrece para concesionarios de Nevada. La disponibilidad, elegibilidad, límites y precios de la cobertura dependen de la aseguradora, la suscripción, los detalles de la solicitud, los endosos, las exclusiones y los requisitos de licencia del DMV de Nevada. Esta información es educativa y no constituye asesoría legal ni garantiza cobertura.",
  },
} as const;

export function t(key: keyof typeof UI, lang: Lang): string {
  return UI[key][lang];
}
