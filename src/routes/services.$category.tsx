import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Car,
  Warehouse,
  KeyRound,
  HardHat,
  Umbrella,
  FileBadge,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { getCategoryHub } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";

export const Route = createFileRoute("/services/$category")({
  loader: async ({ params }) => {
    const data = await getCategoryHub({ data: { slug: params.category } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const c = loaderData.category;
    return pageHead({
      title: c.meta_title ?? `${c.name_en} | XPRT Insurance`,
      description: c.meta_description ?? c.description_en ?? "",
      path: `/services/${params.category}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: c.name_en, path: `/services/${params.category}` },
      ]),
    });
  },
  component: CategoryHub,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <Link to="/" className="mt-4 inline-block text-gold underline">Back home</Link>
    </div>
  ),
});

function CategoryHub() {
  const { category, services, lead_magnets } = Route.useLoaderData();

  if (category.slug === "dealership") {
    return <DealershipHub category={category} lead_magnets={lead_magnets} />;
  }

  const isNvOnly = category.state_restriction === "NV";

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: category.name_en }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>{category.line.toUpperCase()} · Coverage</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">{category.name_en}</h1>
            {category.tagline_en && (
              <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">{category.tagline_en}</p>
            )}
            {category.description_en && (
              <p className="mt-4 text-pretty text-base text-muted-foreground">{category.description_en}</p>
            )}
            {isNvOnly && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-gold" /> Available for licensed Nevada dealerships only
              </div>
            )}
            {category.slug === "personal" && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GhlFormButton
                  form="personal_quote"
                  size="lg"
                  className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
                >
                  Get a Personal Lines Quote
                </GhlFormButton>
                <Button asChild size="lg" variant="outline">
                  <Link to="/book">Book a Free Coverage Review</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Coverages" title={`${category.name_en} services`} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 && (
            <p className="text-muted-foreground">More services coming soon. Book a review to discuss your needs.</p>
          )}
          {services.map((s: any) => {
            const isPersonal = category.slug === "personal";
            const className =
              "group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift";
            const inner = (
              <>
                <h3 className="font-display text-2xl leading-tight">{s.name_en}</h3>
                {s.hero_sub_en && (
                  <p className="mt-3 text-sm text-muted-foreground">{s.hero_sub_en}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </>
            );
            return isPersonal ? (
              <a key={s.id} href={`/personal/${s.slug}`} className={className}>
                {inner}
              </a>
            ) : (
              <Link
                key={s.id}
                to="/services/$category/$slug"
                params={{ category: category.slug, slug: s.slug }}
                className={className}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </Section>

      {lead_magnets.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow="Free guides" title="Educational resources" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lead_magnets.map((lm: any) => (
              <Link
                key={lm.id}
                to="/offers/$slug"
                params={{ slug: lm.slug }}
                className="group rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Free guide</span>
                <h3 className="mt-3 font-display text-xl leading-tight">{lm.title_en}</h3>
                {lm.subtitle_en && <p className="mt-2 text-sm text-muted-foreground">{lm.subtitle_en}</p>}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Download <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection
        {...(category.slug === "personal"
          ? { primaryForm: "personal_quote" as const, primaryLabel: "Get a Personal Lines Quote" }
          : {})}
      />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Dealership hub — custom layout (similar feel to Personal Lines pages)
 * ------------------------------------------------------------------------ */

type Coverage = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string;
  bullets: string[];
  bestFor: string;
  cta: { label: string; to?: string; href?: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
  highlight?: boolean;
  badge?: string;
};

const DEALERSHIP_COVERAGES: Coverage[] = [
  {
    id: "garage-liability",
    icon: Car,
    title: "Garage Liability",
    summary:
      "Third-party bodily injury and property damage protection arising from dealership operations, including test drives and on-lot incidents.",
    bullets: [
      "Covers customers, employees driving inventory, and lot operations",
      "Often required to satisfy Nevada DMV dealer licensing",
      "Pairs with dealer plates and inventory coverage",
    ],
    bestFor: "Every Nevada-licensed dealer — new, used, wholesale, or auction.",
    cta: { label: "Book a Coverage Review", to: "/book" },
  },
  {
    id: "open-lot",
    icon: Warehouse,
    title: "Open Lot / Dealer Physical Damage",
    summary:
      "Physical damage protection for vehicles held for sale on your lot — hail, theft, vandalism, fire, and collision while inventory is in your care.",
    bullets: [
      "Reporting forms (monthly inventory) or stated-value options",
      "Hail and weather endorsements available",
      "Coordinates with garage liability for full lot protection",
    ],
    bestFor: "Dealers with on-site inventory exposure or finance-company requirements.",
    cta: { label: "Book a Coverage Review", to: "/book" },
  },
  {
    id: "garage-keepers",
    icon: KeyRound,
    title: "Garage Keepers",
    summary:
      "Covers customer-owned vehicles in your care, custody, or control — service bays, detailing, valet, or overnight storage.",
    bullets: [
      "Direct primary or legal-liability options",
      "Protects against theft, fire, vandalism, and collision",
      "Critical for service departments and body shops",
    ],
    bestFor: "Dealerships with service, detail, or repair operations.",
    cta: { label: "Book a Coverage Review", to: "/book" },
  },
  {
    id: "workers-comp",
    icon: HardHat,
    title: "Workers' Compensation",
    summary:
      "Statutory protection for employees injured on the job — medical, lost wages, and rehabilitation. Required in Nevada once you have employees.",
    bullets: [
      "Covers technicians, sales staff, lot attendants",
      "Pay-as-you-go options available",
      "Coordinates with your commercial program",
    ],
    bestFor: "Any dealership with W-2 employees.",
    cta: {
      label: "Workers' Comp details",
      href: "/services/commercial/workers-compensation",
    },
  },
  {
    id: "umbrella",
    icon: Umbrella,
    title: "Commercial Umbrella",
    summary:
      "Adds an extra layer of liability above your garage liability, auto, and general liability limits — for catastrophic claims that exceed primary coverage.",
    bullets: [
      "Typical limits: $1M – $10M+",
      "Sits over garage liability and workers' comp employer's liability",
      "Often required by lenders and floor-plan providers",
    ],
    bestFor: "Dealers with significant inventory value, employee count, or floor-plan lending.",
    cta: {
      label: "Commercial coverages",
      href: "/services/commercial",
    },
  },
  {
    id: "dealer-bond",
    icon: FileBadge,
    title: "Nevada Dealer Surety Bond",
    summary:
      "Nevada dealers are typically required to maintain a $100,000 surety bond before licensing approval. We help you secure the right bond and coordinate it with your dealership insurance.",
    bullets: [
      "Standard $100,000 Nevada Dealer Bond",
      "Fast online quote & purchase",
      "Renewals coordinated with your dealership program",
    ],
    bestFor: "Nevada dealer applicants and renewals.",
    highlight: true,
    badge: "Required for licensing",
    cta: {
      label: "Quote & Purchase Online",
      href: PROPELLER_QUOTE_URL,
      external: true,
    },
    secondary: {
      label: "Learn About Dealer Bonds",
      href: "/business-insurance/bonds",
    },
  },
];

function DealershipHub({ category, lead_magnets }: { category: any; lead_magnets: any[] }) {
  return (
    <>
      {/* HERO */}
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: category.name_en }]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Dealership · Coverage</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              {category.name_en}
            </h1>
            {category.tagline_en && (
              <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
                {category.tagline_en}
              </p>
            )}
            {category.description_en && (
              <p className="mt-4 text-pretty text-base text-muted-foreground">
                {category.description_en}
              </p>
            )}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-gold" /> Available for licensed Nevada dealerships only
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book">Book a Coverage Review</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#coverages">Explore coverages</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGES */}
      <Section id="coverages">
        <SectionHeading
          eyebrow="Coverages"
          title="Dealership coverages, explained"
          intro="Each section below is a building block of a complete dealership program. Some coordinate with your commercial insurance — they all work together."
        />
        <div className="mt-12 space-y-6">
          {DEALERSHIP_COVERAGES.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.id}
                id={c.id}
                className={
                  c.highlight
                    ? "rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-9"
                    : "rounded-2xl border border-border bg-card p-7 md:p-9"
                }
              >
                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-background">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    {c.badge && (
                      <span className="mb-2 inline-block text-xs uppercase tracking-[0.2em] text-gold">
                        {c.badge}
                      </span>
                    )}
                    <h3 className="font-display text-2xl leading-tight md:text-3xl">{c.title}</h3>
                    <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg">
                      {c.summary}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span className="text-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm text-muted-foreground">
                      <strong className="text-foreground">Best for:</strong> {c.bestFor}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a
                          href={c.cta.to ?? c.cta.href}
                          target={c.cta.external ? "_blank" : undefined}
                          rel={c.cta.external ? "noopener noreferrer" : undefined}
                        >
                          {c.cta.label}
                          {c.cta.external && <ExternalLink className="ml-1 h-4 w-4" />}
                        </a>
                      </Button>
                      {c.secondary && (
                        <Button asChild variant="outline">
                          <a
                            href={c.secondary.href}
                            target={c.secondary.external ? "_blank" : undefined}
                            rel={c.secondary.external ? "noopener noreferrer" : undefined}
                          >
                            {c.secondary.label}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* TRUST */}
      <section className="border-y border-border bg-background">
        <div className="container-prose py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground">
            {[
              "Licensed in Nevada",
              "Independent agency",
              "Bilingual service (EN/ES)",
              "Bonds + dealership program coordination",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lead_magnets.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow="Free guides" title="Educational resources" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lead_magnets.map((lm: any) => (
              <Link
                key={lm.id}
                to="/offers/$slug"
                params={{ slug: lm.slug }}
                className="group rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Free guide</span>
                <h3 className="mt-3 font-display text-xl leading-tight">{lm.title_en}</h3>
                {lm.subtitle_en && <p className="mt-2 text-sm text-muted-foreground">{lm.subtitle_en}</p>}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Download <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection />
    </>
  );
}
