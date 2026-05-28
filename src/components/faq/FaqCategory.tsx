import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, Section } from "@/components/site/Section";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { BondCallout } from "@/components/site/BondCallout";
import { AuthorByline } from "@/components/site/AuthorByline";
import { applyTranslation, UI, type Lang } from "@/lib/i18n";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";

export type FaqCategory = "homeowners" | "bonds" | "dealership";

type AnyFaq = {
  slug: string;
  question: string;
  shortAnswer: string;
  metaDescription: string;
  paragraphs: string[];
  bullets?: string[];
  whatToPrepare?: string[];
  whatToReview?: string[];
  stateContext?: string;
  stage: "tofu" | "mofu" | "bofu";
  goDeeper: string[];
  readyToAct: string;
  mentionsBond?: boolean;
};

function stageLabel(stage: AnyFaq["stage"], lang: Lang): string {
  if (stage === "tofu") return UI.understandingBasics[lang];
  if (stage === "mofu") return UI.coverageCostDetails[lang];
  return UI.readyForReview[lang];
}

function categoryBasePath(category: FaqCategory, lang: Lang): string {
  const prefix = lang === "es" ? "/es" : "";
  return `${prefix}/faq/${category}`;
}

function hubBasePath(lang: Lang): string {
  return lang === "es" ? "/es/faq" : "/faq";
}

function categoryLabel(category: FaqCategory, lang: Lang): string {
  if (category === "homeowners") return UI.catHomeownersTitle[lang];
  if (category === "bonds") return UI.catBondsTitle[lang];
  return UI.catDealershipTitle[lang];
}

function nvNoteHeader(category: FaqCategory, lang: Lang): string {
  if (category === "dealership") return UI.nvNote[lang];
  return UI.nvCoNote[lang];
}

function disclaimer(category: FaqCategory, lang: Lang): string {
  if (category === "dealership") return UI.disclaimerDealership[lang];
  if (category === "bonds") return UI.disclaimerBonds[lang];
  return UI.disclaimerHomeowners[lang];
}

// --------------------------------------------------------------------------
// Category index page (e.g. /faq/dealership or /es/faq/dealership)
// --------------------------------------------------------------------------

export function FaqCategoryIndex({
  category,
  lang,
  faqs,
  translations,
  eyebrow,
  title,
  lead,
  ctaButtons,
  bottomCta,
}: {
  category: FaqCategory;
  lang: Lang;
  faqs: AnyFaq[];
  translations?: Record<string, Partial<AnyFaq>>;
  eyebrow: string;
  title: string;
  lead: string;
  ctaButtons: React.ReactNode;
  bottomCta: { title?: string; subtitle?: string; primaryLabel: string; secondaryLabel: string; secondaryHref: string };
}) {
  const stages: AnyFaq["stage"][] = ["tofu", "mofu", "bofu"];
  const localized = faqs.map((f) =>
    applyTranslation(f, translations?.[f.slug]),
  );
  const base = categoryBasePath(category, lang);

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14 flex items-start justify-between gap-3 flex-wrap">
          <Breadcrumbs
            items={[
              { name: UI.home[lang], path: lang === "es" ? "/es" : "/" },
              { name: UI.knowledgeCenter[lang], path: hubBasePath(lang) },
              { name: categoryLabel(category, lang) },
            ]}
          />
          <LanguageToggle current={lang} />
        </div>
        <div className="container-prose pb-12 pt-10 md:pb-16 md:pt-14">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">{ctaButtons}</div>
          {lang === "es" && UI.noteOnlyEnglish.es && (
            <p className="mt-5 max-w-2xl text-xs text-muted-foreground">{UI.noteOnlyEnglish.es}</p>
          )}
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {stages.map((stage) => {
            const items = localized.filter((f) => f.stage === stage);
            if (items.length === 0) return null;
            return (
              <div key={stage}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
                  {stageLabel(stage, lang)}
                </p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {items.map((f) => (
                    <li key={f.slug}>
                      <Link
                        to={`${base}/${f.slug}` as never}
                        className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                      >
                        <span className="font-display text-lg leading-tight text-foreground">
                          {f.question}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection
        title={bottomCta.title}
        subtitle={bottomCta.subtitle}
        primaryLabel={bottomCta.primaryLabel}
        secondaryLabel={bottomCta.secondaryLabel}
        secondaryHref={bottomCta.secondaryHref}
      />
    </>
  );
}

// --------------------------------------------------------------------------
// FAQ detail page
// --------------------------------------------------------------------------

export function FaqDetail({
  category,
  lang,
  faq,
  related,
  goDeeper,
  readyToAct,
  defaultPrepare,
  defaultReview,
}: {
  category: FaqCategory;
  lang: Lang;
  faq: AnyFaq;
  related: AnyFaq[];
  goDeeper: AnyFaq[];
  readyToAct?: AnyFaq;
  defaultPrepare?: string[];
  defaultReview?: string[];
}) {
  const base = categoryBasePath(category, lang);
  const whatToPrepare = faq.whatToPrepare ?? defaultPrepare;
  const whatToReview = faq.whatToReview ?? defaultReview;

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14 flex items-start justify-between gap-3 flex-wrap">
          <Breadcrumbs
            items={[
              { name: UI.home[lang], path: lang === "es" ? "/es" : "/" },
              { name: UI.knowledgeCenter[lang], path: hubBasePath(lang) },
              { name: categoryLabel(category, lang), path: base },
              { name: faq.question },
            ]}
          />
          <LanguageToggle current={lang} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{stageLabel(faq.stage, lang)}</Eyebrow>
          <h1 className="speakable mt-5 text-balance text-4xl leading-[1.08] md:text-5xl">{faq.question}</h1>
          <AuthorByline lang={lang} />
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl space-y-12 text-base leading-relaxed text-foreground/85 md:text-lg">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{UI.shortAnswer[lang]}</h2>
            <p className="speakable mt-4 text-pretty text-lg leading-relaxed text-foreground md:text-xl">
              {faq.shortAnswer}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">{UI.whatThisMeans[lang]}</h2>
            <div className="mt-4 space-y-4">
              {faq.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {faq.bullets && (
              <ul className="mt-5 space-y-3 rounded-xl border border-border bg-card p-6">
                {faq.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {whatToPrepare && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl">{UI.whatToPrepare[lang]}</h2>
              <ul className="mt-4 space-y-3 rounded-xl border border-border bg-card p-6">
                {whatToPrepare.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {whatToReview && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl">{UI.whatToReview[lang]}</h2>
              <ul className="mt-4 space-y-3 rounded-xl border border-border bg-card p-6">
                {whatToReview.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="font-display text-2xl md:text-3xl">{nvNoteHeader(category, lang)}</h2>
            {faq.stateContext && <p className="mt-4">{faq.stateContext}</p>}
            <p className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-relaxed md:text-base">
              {disclaimer(category, lang)}
            </p>
          </div>

          {category === "dealership" && faq.mentionsBond && <BondCallout />}

          <div>
            <h2 className="font-display text-2xl md:text-3xl">{UI.nextStep[lang]}</h2>
            <NextStepCopy category={category} lang={lang} />
            <NextStepButtons category={category} lang={lang} />
            {lang === "es" && UI.noteOnlyEnglish.es && (
              <p className="mt-4 text-xs text-muted-foreground">{UI.noteOnlyEnglish.es}</p>
            )}
          </div>
        </article>

        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          {related.length > 0 && (
            <RelatedSection title={UI.relatedBasics[lang]} items={related} base={base} />
          )}
          {goDeeper.length > 0 && (
            <RelatedSection title={UI.coverageCostDetails[lang]} items={goDeeper} base={base} />
          )}
          {readyToAct && readyToAct.slug !== faq.slug && (
            <RelatedSection title={UI.readyForReview[lang]} items={[readyToAct]} base={base} />
          )}
        </div>
      </Section>

      <DetailCta category={category} lang={lang} />
    </>
  );
}

function RelatedSection({
  title,
  items,
  base,
}: {
  title: string;
  items: AnyFaq[];
  base: string;
}) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">{title}</p>
      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={`${base}/${item.slug}` as never}
              className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
            >
              <span className="font-display text-base leading-snug">{item.question}</span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextStepCopy({ category, lang }: { category: FaqCategory; lang: Lang }) {
  if (category === "dealership") {
    return (
      <p className="mt-4">
        {lang === "es"
          ? "Reserva una revisión gratuita de cobertura para concesionarios en Nevada y recorre garage liability, open lot, garagekeepers, compensación laboral, umbrella y tu fianza de concesionario en una sola conversación. Para fianzas estándar también puedes cotizar y comprar en línea."
          : "Book a free Nevada dealer coverage review to walk through garage liability, open lot, garagekeepers, workers' comp, umbrella, and your dealer bond together. For standard bonds you can also quote and purchase online."}
      </p>
    );
  }
  if (category === "bonds") {
    return (
      <p className="mt-4">
        {lang === "es"
          ? "Para muchas fianzas estándar puedes cotizar y comprar en línea en minutos. Para fianzas más grandes o especializadas, reserva una revisión breve con un asesor."
          : "For many standard bonds, you can quote and purchase online in minutes. For larger or specialized bonds, book a short bond review with an advisor."}
      </p>
    );
  }
  return (
    <p className="mt-4">
      {lang === "es"
        ? "Usa la guía rápida para propietarios para revisar tu póliza por tu cuenta, o reserva una revisión breve con un asesor para una mirada guiada a límites, deducibles, exclusiones y endosos."
        : "Use the homeowners cheat sheet to walk through your policy on your own, or book a short coverage review with an advisor for a guided look at limits, deductibles, exclusions, and endorsements."}
    </p>
  );
}

function NextStepButtons({ category, lang }: { category: FaqCategory; lang: Lang }) {
  if (category === "dealership") {
    return (
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/book">{UI.bookFreeCoverageReview[lang]}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/services/$category" params={{ category: "dealership" }}>
            {UI.visitDealershipInsurance[lang]}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/bonds">{UI.learnAboutDealerBonds[lang]}</Link>
        </Button>
      </div>
    );
  }
  if (category === "bonds") {
    return (
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
          <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
            {UI.quotePurchaseOnline[lang]}
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/bonds" hash="bond-quick-guide">
            {UI.downloadBondQuickGuide[lang]}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/book">{UI.bookQuickBondReview[lang]}</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
        <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
          {UI.downloadHomeownersCheatSheet[lang]}
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/book">{UI.bookFreeCoverageReview[lang]}</Link>
      </Button>
    </div>
  );
}

function DetailCta({ category, lang }: { category: FaqCategory; lang: Lang }) {
  if (category === "dealership") {
    return (
      <CTASection
        title={UI.ctaReviewDealershipTitle[lang]}
        subtitle={UI.ctaReviewDealershipSubtitle[lang]}
        primaryLabel={UI.bookFreeCoverageReview[lang]}
        secondaryLabel={UI.visitDealershipInsurance[lang]}
        secondaryHref="/services/dealership"
      />
    );
  }
  if (category === "bonds") {
    return (
      <CTASection
        title={UI.ctaQuoteBondTitle[lang]}
        subtitle={UI.ctaQuoteBondSubtitle[lang]}
        primaryLabel={UI.bookQuickBondReview[lang]}
        secondaryLabel={UI.downloadBondQuickGuide[lang]}
        secondaryHref="/bonds#bond-quick-guide"
      />
    );
  }
  return (
    <CTASection
      primaryLabel={UI.bookFreeCoverageReview[lang]}
      secondaryLabel={UI.downloadHomeownersCheatSheet[lang]}
      secondaryHref="/offers/homeowners-cheat-sheet"
    />
  );
}
