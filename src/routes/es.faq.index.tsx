import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, ShieldCheck, Car, Building2, HardHat, Truck, Key, Briefcase } from "lucide-react";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";
import { HOMEOWNERS_FAQS } from "@/lib/homeowners-faqs";
import { BONDS_FAQS } from "@/lib/bonds-faqs";
import { DEALERSHIP_FAQS } from "@/lib/dealership-faqs";
import { HOMEOWNERS_FAQS_ES } from "@/lib/i18n/homeowners-faqs-es";
import { BONDS_FAQS_ES } from "@/lib/i18n/bonds-faqs-es";
import { DEALERSHIP_FAQS_ES } from "@/lib/i18n/dealership-faqs-es";
import { applyTranslation, UI } from "@/lib/i18n";

const LANG = "es" as const;

export const Route = createFileRoute("/es/faq/")({
  head: () =>
    pageHead({
      title: "Centro de Conocimiento — Guía de Seguros | XPRT Insurance",
      description:
        "Orientación de seguros, organizada con claridad. Comprende lo básico, compara detalles de cobertura y costo, y da el siguiente paso cuando estés listo.",
      path: "/es/faq",
      locale: "es",
      alternates: { en: "/faq", es: "/es/faq" },
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Centro de Conocimiento", path: "/es/faq" },
        ]),
      ],
    }),
  component: FaqHubEs,
});

type Cat = {
  titleKey: keyof typeof UI;
  descKey: keyof typeof UI;
  Icon: typeof Home;
  status: "ready" | "coming-soon";
  href?: "/es/faq/homeowners" | "/es/faq/bonds" | "/es/faq/dealership";
  count?: number;
};

const CATEGORIES: Cat[] = [
  { titleKey: "catHomeownersTitle", descKey: "catHomeownersDesc", Icon: Home, status: "ready", href: "/es/faq/homeowners", count: HOMEOWNERS_FAQS.length },
  { titleKey: "catBondsTitle", descKey: "catBondsDesc", Icon: ShieldCheck, status: "ready", href: "/es/faq/bonds", count: BONDS_FAQS.length },
  { titleKey: "catDealershipTitle", descKey: "catDealershipDesc", Icon: Car, status: "ready", href: "/es/faq/dealership", count: DEALERSHIP_FAQS.length },
  { titleKey: "catAutoTitle", descKey: "catAutoDesc", Icon: Car, status: "coming-soon" },
  { titleKey: "catRentersTitle", descKey: "catRentersDesc", Icon: Key, status: "coming-soon" },
  { titleKey: "catLandlordTitle", descKey: "catLandlordDesc", Icon: Building2, status: "coming-soon" },
  { titleKey: "catGLTitle", descKey: "catGLDesc", Icon: Briefcase, status: "coming-soon" },
  { titleKey: "catWCTitle", descKey: "catWCDesc", Icon: HardHat, status: "coming-soon" },
  { titleKey: "catCommAutoTitle", descKey: "catCommAutoDesc", Icon: Truck, status: "coming-soon" },
];

function FaqHubEs() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14 flex items-start justify-between gap-3 flex-wrap">
          <Breadcrumbs items={[{ name: UI.home[LANG], path: "/es" }, { name: UI.knowledgeCenter[LANG] }]} />
          <LanguageToggle current={LANG} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{UI.hubEyebrow[LANG]}</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">{UI.faqsHubTitle[LANG]}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{UI.faqsHubLead[LANG]}</p>
        </div>
      </section>

      <Section>
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gold">{UI.browseByCategory[LANG]}</p>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <li key={cat.titleKey}>
              <CardLink cat={cat} />
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{UI.freeGuides[LANG]}</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">{UI.freeGuidesHeading[LANG]}</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{UI.freeGuidesLead[LANG]}</p>
              {UI.noteOnlyEnglish.es && (
                <p className="mt-2 text-xs text-muted-foreground">{UI.noteOnlyEnglish.es}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/book">{UI.bookFreeReview[LANG]}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
                  {UI.homeownersCheatSheet[LANG]}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function CardLink({ cat }: { cat: Cat }) {
  const { Icon } = cat;
  const isReady = cat.status === "ready";
  const className =
    "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/50";
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        {isReady ? (
          <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        ) : (
          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {UI.comingSoon[LANG]}
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl leading-tight text-foreground">{UI[cat.titleKey][LANG]}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{UI[cat.descKey][LANG]}</p>
      {isReady && cat.count !== undefined && (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">
          {cat.count} {cat.count === 1 ? UI.question[LANG] : UI.questions[LANG]}
        </p>
      )}
      {!isReady && (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {UI.bookReview[LANG]} →
        </p>
      )}
    </>
  );
  if (isReady && cat.href === "/es/faq/homeowners") return <Link to="/es/faq/homeowners" className={className}>{content}</Link>;
  if (isReady && cat.href === "/es/faq/bonds") return <Link to="/es/faq/bonds" className={className}>{content}</Link>;
  if (isReady && cat.href === "/es/faq/dealership") return <Link to="/es/faq/dealership" className={className}>{content}</Link>;
  return <Link to="/book" className={className}>{content}</Link>;
}
