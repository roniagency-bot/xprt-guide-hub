import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import { DEALERSHIP_FAQS } from "@/lib/dealership-faqs";
import { DEALERSHIP_FAQS_ES } from "@/lib/i18n/dealership-faqs-es";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import { applyTranslation, UI } from "@/lib/i18n";
import { FaqCategoryIndex } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

export const Route = createFileRoute("/es/faq/dealership/")({
  head: () => {
    const localized = DEALERSHIP_FAQS.map((f) => applyTranslation(f, DEALERSHIP_FAQS_ES[f.slug]));
    return pageHead({
      title: "Preguntas frecuentes — Seguro para concesionarios en Nevada | XPRT Insurance",
      description:
        "Respuestas educativas sobre el seguro para concesionarios en Nevada — garage liability, open lot, garagekeepers, compensación laboral, umbrella y la fianza de concesionario de $100,000.",
      path: "/es/faq/dealership",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Seguro para concesionarios", path: "/es/faq/dealership" },
        ]),
        faqPageJsonLd(localized.map((f) => ({ question: f.question, answer: f.shortAnswer }))),
      ],
    });
  },
  component: () => (
    <FaqCategoryIndex
      category="dealership"
      lang={LANG}
      faqs={DEALERSHIP_FAQS}
      translations={DEALERSHIP_FAQS_ES}
      eyebrow="Seguro para concesionarios en Nevada"
      title="Seguro para concesionarios en Nevada, explicado con claridad."
      lead="Garage liability, open lot, garagekeepers, compensación laboral, umbrella y la fianza de concesionario de $100,000 del DMV de Nevada — organizados para revisarlos juntos."
      ctaButtons={
        <>
          <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/book">{UI.bookFreeCoverageReview[LANG]}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/services/$category" params={{ category: "dealership" }}>
              {UI.visitDealershipInsurance[LANG]}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
              {UI.quoteDealerBondOnline[LANG]}
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </>
      }
      bottomCta={{
        title: UI.ctaReviewDealershipTitle[LANG],
        subtitle: UI.ctaReviewDealershipSubtitle[LANG],
        primaryLabel: UI.bookFreeCoverageReview[LANG],
        secondaryLabel: UI.visitDealershipInsurance[LANG],
        secondaryHref: "/services/dealership",
      }}
    />
  ),
});
