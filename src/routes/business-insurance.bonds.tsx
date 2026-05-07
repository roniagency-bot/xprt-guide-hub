import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  BookOpen,
  ScrollText,
  Building2,
  Car,
  Hammer,
  FileBadge,
  ClipboardCheck,
  Users,
  PenTool,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { BondsLeadForm } from "@/components/site/BondsLeadForm";
import { getLeadMagnet } from "@/server/content.functions";
import { BONDS_FAQ_PREVIEWS, PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";

const PATH = "/business-insurance/bonds";

export const Route = createFileRoute("/business-insurance/bonds")({
  loader: async () => {
    const [quickGuide, ebook] = await Promise.all([
      getLeadMagnet({ data: { slug: "bond-quick-guide" } }),
      getLeadMagnet({ data: { slug: "complete-guide-to-surety-bonds" } }),
    ]);
    return { quickGuide, ebook };
  },
  head: () => {
    const title = "Surety Bonds in Nevada & Colorado | XPRT Insurance";
    const description =
      "Get educational guidance and direct online options for license, permit, contractor, dealer, title, notary, and commercial surety bonds in Nevada and Colorado.";
    return pageHead({
      title,
      description,
      path: PATH,
      image: canonical("/og-default.jpg"),
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Business Insurance", path: "/services/bonds" },
          { name: "Bonds", path: PATH },
        ]),
        serviceJsonLd({
          name: "Surety Bonds — Nevada & Colorado",
          description,
          path: PATH,
          areaServed: ["Nevada", "Colorado"],
        }),
        faqPageJsonLd(
          BONDS_FAQ_PREVIEWS.map((f) => ({
            question: f.question_en,
            answer: f.short_answer_en,
          })),
        ),
      ],
    });
  },
  component: BondsHub,
});

const TRUST_ITEMS = [
  "Bonds Specialist",
  "Nevada & Colorado",
  "Fast Online Options",
  "Bilingual Support",
];

const BOND_PARTIES = [
  {
    icon: Users,
    title: "Principal",
    body: "The person or business required to obtain the bond — that's you.",
  },
  {
    icon: ShieldCheck,
    title: "Obligee",
    body: "The agency, court, or party that requires the bond and is protected by it.",
  },
  {
    icon: Building2,
    title: "Surety",
    body: "The company that issues the bond and stands behind the guarantee.",
  },
];

const BOND_TYPES = [
  {
    icon: FileBadge,
    title: "License & Permit Bonds",
    body: "Required by many state, county, and city agencies before a license or permit is issued.",
  },
  {
    icon: Hammer,
    title: "Contractor License Bonds",
    body: "Required by contractor licensing boards to protect customers and uphold trade rules.",
  },
  {
    icon: Car,
    title: "Auto Dealer Bonds",
    body: "Required for licensed dealers as part of state DMV or revenue department compliance.",
  },
  {
    icon: ScrollText,
    title: "Title / Lost Title Bonds",
    body: "Used when ownership documentation is missing and a vehicle title needs to be cleared.",
  },
  {
    icon: ClipboardCheck,
    title: "Contract Bonds",
    body: "Bid, performance, and payment bonds used on construction and service contracts.",
  },
  {
    icon: PenTool,
    title: "Notary Bonds",
    body: "Required to be commissioned as a notary public in many states.",
  },
  {
    icon: ShieldCheck,
    title: "Fidelity Bonds",
    body: "Protect a business or its clients from losses caused by employee dishonesty.",
  },
  {
    icon: FileText,
    title: "Document Preparation / LDA Bonds",
    body: "Required for document preparers and legal document assistants in regulated states.",
  },
];

function BondsHub() {
  const { quickGuide, ebook } = Route.useLoaderData();
  const faqs = BONDS_FAQ_PREVIEWS.map((f) => ({
    slug: f.slug,
    question: f.question_en,
    short_answer: f.short_answer_en,
    funnel_stage: f.funnel_stage,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Business", path: "/services/bonds" },
              { name: "Bonds" },
            ]}
          />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl fade-in-up">
            <Eyebrow>Bonds · Nevada & Colorado</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Get the bond you need — with less confusion.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Simple guidance and direct online options for license, permit, contractor, dealer,
              notary, and compliance bond needs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                  Quote & Purchase Online
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#bond-quick-guide">Download the Bond Quick Sheet</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {TRUST_ITEMS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-background">
        <div className="container-prose py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground">
            {TRUST_ITEMS.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>{t}</span>
                {i < TRUST_ITEMS.length - 1 && (
                  <span className="hidden text-border md:inline">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IS A SURETY BOND */}
      <Section>
        <SectionHeading
          eyebrow="The basics"
          title="What is a surety bond?"
          intro="A surety bond is a three-party guarantee. It is not traditional insurance. Instead, it guarantees compliance, performance, or a legal obligation — and the bond protects the obligee or the public, not the principal."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BOND_PARTIES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-7 shadow-elegant"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-relaxed text-foreground/85 md:text-base">
          If the surety pays a valid claim to the obligee, the principal is generally
          responsible for reimbursing the surety. That's why bonds are technically a form of
          credit and underwriting matters.
        </p>
      </Section>

      {/* BOND TYPES */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Coverages"
          title="Common bond types we work with"
          intro="A short overview of the bonds most Nevada and Colorado clients ask about. Start a quote anytime — many can be issued online."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BOND_TYPES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
              <h3 className="mt-4 font-display text-xl leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <a
                href={PROPELLER_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-gold"
              >
                Start Bond Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* DIRECT ONLINE QUOTE */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-10 text-center shadow-lift md:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Online quote
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl leading-tight md:text-5xl">
            Need a bond now?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            For many bond types, you can start the quote online, complete the application, and
            purchase directly if approved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground shadow-gold hover:bg-gold/90"
            >
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Quote & Purchase Online
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/book">Book a Quick Bond Review</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Some larger or specialized bonds may require underwriting review.
          </p>
        </div>
      </Section>

      {/* CHEAT SHEET LEAD MAGNET */}
      <Section id="bond-quick-guide" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Free download · Resource 1</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Surety Bonds: Your Quick Guide
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Download the quick educational guide explaining common bond types, key terms,
              quoting basics, state requirements, and common mistakes to avoid.
            </p>
            <ul className="mt-8 space-y-3">
              {(quickGuide?.bullets_en ?? []).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Get the Quick Guide</h3>
                  <p className="text-xs text-muted-foreground">2-page PDF · delivered instantly.</p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={quickGuide?.id}
                  leadMagnetSlug="bond-quick-guide"
                  resourceName="Surety Bonds Quick Guide"
                  thankYouSlug="bond-quick-guide"
                  ctaLabel="Get the Quick Guide"
                  leadSource="bonds_cheat_sheet"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EBOOK LEAD MAGNET */}
      <Section id="complete-bond-guide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Get the Ebook</h3>
                  <p className="text-xs text-muted-foreground">Full bond guide · PDF.</p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={ebook?.id}
                  leadMagnetSlug="complete-guide-to-surety-bonds"
                  resourceName="Complete Guide to Surety Bonds"
                  thankYouSlug="complete-guide-to-surety-bonds"
                  ctaLabel="Get the Complete Guide"
                  leadSource="bonds_ebook"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Free download · Resource 2</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Complete Guide to Surety Bonds
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              A deeper educational guide covering underwriting, contract bonds, commercial
              bonds, compliance requirements, state-specific rules, quoting, and common
              mistakes.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {(ebook?.bullets_en ?? []).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ FUNNEL */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Knowledge base"
          title="Bonds questions, organized as a funnel"
          intro="Start with the basics, go deeper, and finish with the action steps. Every answer connects to the next stage."
        />
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/faq">
              Browse the full knowledge base
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* DISCLAIMER */}
      <Section>
        <p className="mx-auto max-w-3xl rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Educational disclaimer.</strong> This information
          is educational only. Bond requirements, underwriting, approval, pricing, and
          eligibility vary by state, obligee, surety company, and application details.
          Completing a quote does not guarantee approval or issuance. Always confirm specific
          requirements with the obligee and a licensed advisor.
        </p>
      </Section>

      <CTASection
        title="Need help structuring the right bond?"
        subtitle="Quote and purchase common bonds online, or book a quick bond review for help with larger or specialized bonds in Nevada and Colorado."
        primaryLabel="Book a Quick Bond Review"
        secondaryLabel="Download the Bond Quick Sheet"
        secondaryHref="/business-insurance/bonds#bond-quick-guide"
      />
    </>
  );
}
