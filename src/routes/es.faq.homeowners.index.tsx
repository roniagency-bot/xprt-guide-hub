import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd, pageHead } from "@/lib/seo";
import { HOMEOWNERS_FAQS } from "@/lib/homeowners-faqs";
import { HOMEOWNERS_FAQS_ES } from "@/lib/i18n/homeowners-faqs-es";
import { applyTranslation, UI } from "@/lib/i18n";
import { FaqCategoryIndex } from "@/components/faq/FaqCategory";

const LANG = "es" as const;

export const Route = createFileRoute("/es/faq/homeowners/")({
  head: () => {
    const localized = HOMEOWNERS_FAQS.map((f) => applyTranslation(f, HOMEOWNERS_FAQS_ES[f.slug]));
    return pageHead({
      title: "Preguntas frecuentes — Seguro de propietarios | XPRT Insurance",
      description:
        "Respuestas educativas sobre el seguro de propietarios — cobertura, exclusiones, costo de reemplazo, endosos, responsabilidad y revisiones de póliza para propietarios en Nevada y Colorado.",
      path: "/es/faq/homeowners",
      locale: "es",
      alternates: { en: "/faq/homeowners", es: "/es/faq/homeowners" },
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
          { name: "Seguro de propietarios", path: "/es/faq/homeowners" },
        ]),
        faqPageJsonLd(
          localized.map((f) => ({ question: f.question, answer: f.shortAnswer })),
          { path: "/es/faq/homeowners", locale: "es" },
        ),
        itemListJsonLd({
          name: "Preguntas frecuentes — Seguro de propietarios",
          path: "/es/faq/homeowners",
          items: localized.map((f) => ({
            name: f.question,
            path: `/es/faq/homeowners/${f.slug}`,
          })),
        }),
      ],
    });
  },
  component: () => (
    <FaqCategoryIndex
      category="homeowners"
      lang={LANG}
      faqs={HOMEOWNERS_FAQS}
      translations={HOMEOWNERS_FAQS_ES}
      eyebrow="Seguro de propietarios"
      title="Seguro de propietarios, explicado con claridad."
      lead="Comienza con lo básico, compara los detalles importantes de cobertura y costo, y reserva una revisión gratuita cuando estés listo."
      ctaButtons={
        <>
          <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
              {UI.downloadHomeownersCheatSheet[LANG]}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/personal/homeowners-insurance">{UI.visitHomeownersInsurance[LANG]}</Link>
          </Button>
        </>
      }
      bottomCta={{
        primaryLabel: UI.bookFreeCoverageReview[LANG],
        secondaryLabel: UI.downloadHomeownersCheatSheet[LANG],
        secondaryHref: "/offers/homeowners-cheat-sheet",
      }}
    />
  ),
});
