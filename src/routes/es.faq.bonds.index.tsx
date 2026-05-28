import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd, pageHead } from "@/lib/seo";
import { BONDS_FAQS, PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import { BONDS_FAQS_ES } from "@/lib/i18n/bonds-faqs-es";
import { applyTranslation, UI } from "@/lib/i18n";
import { FaqCategoryIndex } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

export const Route = createFileRoute("/es/faq/bonds/")({
  head: () => {
    const localized = BONDS_FAQS.map((f) => applyTranslation(f, BONDS_FAQS_ES[f.slug]));
    return pageHead({
      title: "Preguntas frecuentes — Fianzas surety | XPRT Insurance",
      description:
        "Respuestas educativas sobre fianzas surety — qué son, por qué se requieren, qué afecta la aprobación y el precio, y cómo cotizarlas y comprarlas en línea.",
      path: "/es/faq/bonds",
      locale: "es",
      alternates: { en: "/faq/bonds", es: "/es/faq/bonds" },
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Fianzas", path: "/es/faq/bonds" },
        ]),
        faqPageJsonLd(
          localized.map((f) => ({ question: f.question, answer: f.shortAnswer })),
          { path: "/es/faq/bonds", locale: "es" },
        ),
        itemListJsonLd({
          name: "Preguntas frecuentes — Fianzas surety",
          path: "/es/faq/bonds",
          items: localized.map((f) => ({
            name: f.question,
            path: `/es/faq/bonds/${f.slug}`,
          })),
        }),
      ],
    });
  },
  component: () => (
    <FaqCategoryIndex
      category="bonds"
      lang={LANG}
      faqs={BONDS_FAQS}
      translations={BONDS_FAQS_ES}
      eyebrow="Fianzas surety"
      title="Fianzas surety, explicadas con claridad."
      lead="Comprende los conceptos básicos, aprende cómo funciona la aprobación y el precio, y cotiza y compra fianzas comunes en línea."
      ctaButtons={
        <>
          <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
            <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
              {UI.quotePurchaseOnline[LANG]}
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/bonds">{UI.learnAboutBonds[LANG]}</Link>
          </Button>
        </>
      }
      bottomCta={{
        title: UI.ctaQuoteBondTitle[LANG],
        subtitle: UI.ctaQuoteBondSubtitle[LANG],
        primaryLabel: UI.bookQuickBondReview[LANG],
        secondaryLabel: UI.learnAboutBonds[LANG],
        secondaryHref: "/bonds",
      }}
    />
  ),
});
