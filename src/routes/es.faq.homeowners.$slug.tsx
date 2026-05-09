import { createFileRoute, notFound } from "@tanstack/react-router";
import { breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import {
  getHomeownersFaq,
  getHomeownersFaqs,
  getRelatedTofu,
} from "@/lib/homeowners-faqs";
import { HOMEOWNERS_FAQS_ES } from "@/lib/i18n/homeowners-faqs-es";
import { applyTranslation } from "@/lib/i18n";
import { FaqDetail } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

const DEFAULT_REVIEW_ES = [
  "Límites de cobertura — vivienda, propiedad personal, pérdida de uso y responsabilidad",
  "Deducibles — deducible base más cualquier deducible separado por viento, granizo o techo",
  "Exclusiones — lo que la póliza específicamente no cubre",
  "Endosos — coberturas añadidas o eliminadas que cambian cómo se maneja un reclamo",
  "Cambios en la renovación — prima, límites, deducibles o reglas de la aseguradora",
];

export const Route = createFileRoute("/es/faq/homeowners/$slug")({
  beforeLoad: ({ params }) => {
    if (!getHomeownersFaq(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const base = getHomeownersFaq(params.slug);
    if (!base) return {};
    const faq = applyTranslation(base, HOMEOWNERS_FAQS_ES[base.slug]);
    const path = `/es/faq/homeowners/${faq.slug}`;
    return pageHead({
      title: `${faq.question} | XPRT Insurance`,
      description: faq.metaDescription,
      path,
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Seguro de propietarios", path: "/es/faq/homeowners" },
          { name: faq.question, path },
        ]),
        faqPageJsonLd([
          { question: faq.question, answer: `${faq.shortAnswer} ${faq.paragraphs.join(" ")}` },
        ]),
      ],
    });
  },
  component: HomeownersFaqEsPage,
});

function HomeownersFaqEsPage() {
  const { slug } = Route.useParams();
  const base = getHomeownersFaq(slug)!;
  const faq = applyTranslation(base, HOMEOWNERS_FAQS_ES[base.slug]);
  const goDeeper = getHomeownersFaqs(base.goDeeper)
    .slice(0, 2)
    .map((f) => applyTranslation(f, HOMEOWNERS_FAQS_ES[f.slug]));
  const readyBase = getHomeownersFaq(base.readyToAct);
  const readyToAct = readyBase
    ? applyTranslation(readyBase, HOMEOWNERS_FAQS_ES[readyBase.slug])
    : undefined;
  const related = getHomeownersFaqs(getRelatedTofu(slug, 2)).map((f) =>
    applyTranslation(f, HOMEOWNERS_FAQS_ES[f.slug]),
  );

  return (
    <FaqDetail
      category="homeowners"
      lang={LANG}
      faq={faq}
      related={related}
      goDeeper={goDeeper}
      readyToAct={readyToAct}
      defaultReview={DEFAULT_REVIEW_ES}
    />
  );
}
