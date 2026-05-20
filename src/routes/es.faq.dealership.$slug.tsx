import { createFileRoute, notFound } from "@tanstack/react-router";
import { articleFaqJsonLd, brandedTitle, breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import {
  getDealershipFaq,
  getDealershipFaqs,
  getRelatedDealershipTofu,
} from "@/lib/dealership-faqs";
import { DEALERSHIP_FAQS_ES } from "@/lib/i18n/dealership-faqs-es";
import { applyTranslation } from "@/lib/i18n";
import { FaqDetail } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

const DEFAULT_PREPARE_ES = [
  "Declaraciones actuales de garage liability, physical damage, garagekeepers, compensación laboral y umbrella",
  "Detalles de la licencia del DMV de Nevada y fecha de renovación",
  "Número de empleados y nómina anual aproximada",
  "Inventario promedio en el lote y vehículos de clientes bajo cuidado",
  "Cualquier reclamo abierto o reciente",
];

export const Route = createFileRoute("/es/faq/dealership/$slug")({
  beforeLoad: ({ params }) => {
    if (!getDealershipFaq(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const base = getDealershipFaq(params.slug);
    if (!base) return {};
    const faq = applyTranslation(base, DEALERSHIP_FAQS_ES[base.slug]);
    const path = `/es/faq/dealership/${faq.slug}`;
    const fullAnswer = [
      faq.shortAnswer,
      ...faq.paragraphs,
      ...(faq.bullets ?? []),
      faq.stateContext ?? "",
    ]
      .filter(Boolean)
      .join(" ");
    return pageHead({
      title: brandedTitle(faq.question),
      description: faq.metaDescription,
      path,
      locale: "es",
      alternates: {
        en: `/faq/dealership/${faq.slug}`,
        es: `/es/faq/dealership/${faq.slug}`,
      },
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Seguro para concesionarios", path: "/es/faq/dealership" },
          { name: faq.question, path },
        ]),
        faqPageJsonLd(
          [{ question: faq.question, answer: fullAnswer }],
          { path, locale: "es", speakableSelectors: [".speakable", "h1"] },
        ),
        articleFaqJsonLd({
          headline: faq.question,
          description: faq.metaDescription,
          path,
          locale: "es",
          speakableSelectors: [".speakable", "h1"],
        }),
      ],
    });
  },
  component: DealershipFaqEsPage,
});

function DealershipFaqEsPage() {
  const { slug } = Route.useParams();
  const base = getDealershipFaq(slug)!;
  const faq = applyTranslation(base, DEALERSHIP_FAQS_ES[base.slug]);
  const goDeeper = getDealershipFaqs(base.goDeeper)
    .slice(0, 2)
    .map((f) => applyTranslation(f, DEALERSHIP_FAQS_ES[f.slug]));
  const readyBase = getDealershipFaq(base.readyToAct);
  const readyToAct = readyBase
    ? applyTranslation(readyBase, DEALERSHIP_FAQS_ES[readyBase.slug])
    : undefined;
  const related = getDealershipFaqs(getRelatedDealershipTofu(slug, 2)).map((f) =>
    applyTranslation(f, DEALERSHIP_FAQS_ES[f.slug]),
  );

  return (
    <FaqDetail
      category="dealership"
      lang={LANG}
      faq={faq}
      related={related}
      goDeeper={goDeeper}
      readyToAct={readyToAct}
      defaultPrepare={DEFAULT_PREPARE_ES}
    />
  );
}
