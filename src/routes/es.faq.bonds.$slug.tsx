import { createFileRoute, notFound } from "@tanstack/react-router";
import { breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import {
  getBondsFaq,
  getBondsFaqs,
  getRelatedBondsTofu,
} from "@/lib/bonds-faqs";
import { BONDS_FAQS_ES } from "@/lib/i18n/bonds-faqs-es";
import { applyTranslation } from "@/lib/i18n";
import { FaqDetail } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

const DEFAULT_PREPARE_ES = [
  "Nombre exacto, formulario y monto requerido por el obligante",
  "Nombre legal del principal, dirección y tipo de entidad",
  "Información del propietario / oficial para indemnidad si se requiere",
  "Número de licencia o solicitud, si aplica",
  "Estados financieros, historial de trabajo o indemnizadores para fianzas grandes",
];

export const Route = createFileRoute("/es/faq/bonds/$slug")({
  beforeLoad: ({ params }) => {
    if (!getBondsFaq(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const base = getBondsFaq(params.slug);
    if (!base) return {};
    const faq = applyTranslation(base, BONDS_FAQS_ES[base.slug]);
    const path = `/es/faq/bonds/${faq.slug}`;
    return pageHead({
      title: brandedTitle(faq.question),
      description: faq.metaDescription,
      path,
      locale: "es",
      alternates: {
        en: `/faq/bonds/${faq.slug}`,
        es: `/es/faq/bonds/${faq.slug}`,
      },
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Fianzas", path: "/es/faq/bonds" },
          { name: faq.question, path },
        ]),
        faqPageJsonLd([
          { question: faq.question, answer: `${faq.shortAnswer} ${faq.paragraphs.join(" ")}` },
        ]),
      ],
    });
  },
  component: BondsFaqEsPage,
});

function BondsFaqEsPage() {
  const { slug } = Route.useParams();
  const base = getBondsFaq(slug)!;
  const faq = applyTranslation(base, BONDS_FAQS_ES[base.slug]);
  const goDeeper = getBondsFaqs(base.goDeeper)
    .slice(0, 2)
    .map((f) => applyTranslation(f, BONDS_FAQS_ES[f.slug]));
  const readyBase = getBondsFaq(base.readyToAct);
  const readyToAct = readyBase
    ? applyTranslation(readyBase, BONDS_FAQS_ES[readyBase.slug])
    : undefined;
  const related = getBondsFaqs(getRelatedBondsTofu(slug, 2)).map((f) =>
    applyTranslation(f, BONDS_FAQS_ES[f.slug]),
  );

  return (
    <FaqDetail
      category="bonds"
      lang={LANG}
      faq={faq}
      related={related}
      goDeeper={goDeeper}
      readyToAct={readyToAct}
      defaultPrepare={DEFAULT_PREPARE_ES}
    />
  );
}
