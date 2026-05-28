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
  Zap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
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
import heroBonds from "@/assets/hero-bonds.jpg";

const PATH = "/bonds";

// High-density Q&A copy block for AEO/GEO. Kept inline so the JSON-LD FAQPage
// and the rendered HTML stay byte-identical — that's what answer engines key on.
const AEO_QA: Array<{ q: string; a: string }> = [
  {
    q: "What is a surety bond and how does it work?",
    a: "A surety bond is a legally binding three-party contract that guarantees a business or individual will fulfill their legal obligations and adhere to state regulations. The three parties involved are the Principal (the business buying the bond), the Obligee (the government agency requiring the bond), and the Surety (the insurance company backing the financial guarantee). Unlike insurance, a surety bond protects the consumer and the state from financial loss caused by your business practices — not your business itself.",
  },
  {
    q: "What type of surety bond do I need as a Nevada motor vehicle dealer?",
    a: "To secure or renew your automotive business license in Nevada, the DMV requires a continuous Motor Vehicle Dealer Bond. The typical required limit is $100,000 for standard used or new car dealerships, and $10,000 for motorcycle or utility trailer dealers. This bond guarantees that your dealership complies with consumer protection laws, transfers vehicle titles transparently, and pays state sales taxes accurately.",
  },
  {
    q: "What is the difference between a license and permit bond and a contract bond?",
    a: "A license and permit bond is a mandatory filing required by state, county, or municipal jurisdictions as a prerequisite to legally operating a business or trade (e.g., HVAC contractor bonds, DMV dealer bonds). A contract bond — comprising bid, performance, and payment bonds — is project-specific, guaranteeing that a contractor will execute a construction contract exactly according to the project specifications and pay all subcontractors and material suppliers in full.",
  },
  {
    q: "How much does a surety bond cost in Nevada and Colorado?",
    a: "The cost of a surety bond, known as the bond premium, is typically calculated as a small percentage of the total bond limit — ranging between 1% and 3% for applicants with strong commercial credit. For a standard $50,000 dealer bond, this equates to an annual cost of $500 to $1,500. For specialized or higher-risk classifications, or applicants with non-prime credit profiles, the premium rate may adjust based on independent underwriting parameters.",
  },
  {
    q: "Can I purchase a surety bond instantly online?",
    a: "Yes. At XPRT Insurance, we have streamlined our infrastructure to support instant online surety bond underwriting and digital certificate delivery. For standard commercial, license, permit, and dealer bonds, applicants can input their entity details, pass digital verification, pay their premium, and print their official bond filing paperwork in under five minutes.",
  },
];

export const Route = createFileRoute("/bonds")({
  loader: async () => {
    const [quickGuide, ebook] = await Promise.all([
      getLeadMagnet({ data: { slug: "bond-quick-guide" } }),
      getLeadMagnet({ data: { slug: "complete-guide-to-surety-bonds" } }),
    ]);
    return { quickGuide, ebook };
  },
  head: () => {
    const title = "Surety Bonds — Instant Online Issuance in Nevada & Colorado | XPRT Insurance";
    const description =
      "Buy your Nevada or Colorado surety bond online in under five minutes. License, permit, contractor, dealer, notary, and commercial bonds — instant quote, digital delivery, licensed agents.";
    return pageHead({
      title,
      description,
      path: PATH,
      image: canonical("/og-default.jpg"),
      locale: "en",
      alternates: { en: PATH, es: "/es/bonds" },
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Bonds", path: PATH },
        ]),
        serviceJsonLd({
          name: "Surety Bonds — Nevada & Colorado",
          description,
          path: PATH,
          areaServed: ["Nevada", "Colorado"],
        }),
        // Merge knowledge-base previews with the new high-density Q&A so
        // every visible question is in FAQPage JSON-LD.
        faqPageJsonLd([
          ...AEO_QA.map(({ q, a }) => ({ question: q, answer: a })),
          ...BONDS_FAQ_PREVIEWS.map((f) => ({
            question: f.question_en,
            answer: f.short_answer_en,
          })),
        ]),
      ],
    });
  },
  component: BondsHub,
});

const TRUST_ITEMS = [
  "Instant Online Issuance",
  "Licensed in NV & CO",
  "Digital Certificate Delivery",
  "Bilingual Support",
];

const BOND_PARTIES = [
  { icon: Users, title: "Principal", body: "The person or business required to obtain the bond — that's you." },
  { icon: ShieldCheck, title: "Obligee", body: "The agency, court, or party that requires the bond and is protected by it." },
  { icon: Building2, title: "Surety", body: "The company that issues the bond and stands behind the guarantee." },
];

// Auto Dealer Bonds are featured in their own spotlight section below
// (most-purchased bond + bundle play with dealership insurance).
const BOND_TYPES = [
  { icon: FileBadge, title: "License & Permit Bonds", body: "Required by state, county, and city agencies before a license or permit is issued." },
  { icon: Hammer, title: "Contractor License Bonds", body: "Required by contractor licensing boards to protect customers and uphold trade rules." },
  { icon: ScrollText, title: "Title / Lost Title Bonds", body: "Used when ownership documentation is missing and a vehicle title needs to be cleared." },
  { icon: ClipboardCheck, title: "Contract Bonds", body: "Bid, performance, and payment bonds used on construction and service contracts." },
  { icon: PenTool, title: "Notary Bonds", body: "Required to be commissioned as a notary public in many states." },
  { icon: ShieldCheck, title: "Fidelity Bonds", body: "Protect a business or its clients from losses caused by employee dishonesty." },
  { icon: FileText, title: "Document Preparation / LDA Bonds", body: "Required for document preparers and legal document assistants in regulated states." },
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
      {/* ============ TRANSACTIONAL TOP HALF ============ */}

      {/* HERO — Instant Online Issuance */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroBonds}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />
        <div className="container-prose relative pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Bonds" }]} />
        </div>
        <div className="container-prose relative pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl fade-in-up text-primary-foreground">
            <Eyebrow className="text-gold">
              <Zap className="mr-1.5 inline h-3.5 w-3.5" /> Instant Online Surety Bond Issuance
            </Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
              Get your Nevada or Colorado surety bond in under 5 minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              License, permit, contractor, dealer, notary, and commercial bonds — quoted,
              underwritten, paid, and delivered digitally on a single screen.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-gold-shimmer bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                  Quote &amp; Buy Online Now
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <GhlFormButton
                form="commercial_quote"
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Talk to a Licensed Agent
              </GhlFormButton>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              {TRUST_ITEMS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK BOND TYPE GRID — direct routes into the issuance platform */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Coverages"
          title="Common bond types — start a quote in one click"
          intro="Most standard bonds below can be issued instantly online. Larger or specialty bonds may require a short underwriting review."
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

      {/* INSTANT BUY CALLOUT */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-10 text-center shadow-lift md:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Online Issuance Platform
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl leading-tight md:text-5xl">
            Need a bond now?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Enter your entity details, pass digital verification, pay your premium, and print
            your official bond filing paperwork — all in under five minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground shadow-gold hover:bg-gold/90"
            >
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Quote &amp; Buy Online
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/book">Book a Quick Bond Review</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Larger or specialized bonds may require independent underwriting.
          </p>
        </div>
      </Section>

      {/* ============ EDUCATIONAL BOTTOM HALF — DEEP AUTHORITY ============ */}

      {/* AEO/GEO HIGH-DENSITY Q&A KNOWLEDGE BASE */}
      <Section tone="cream" id="knowledge-base">
        <article className="mx-auto max-w-3xl">
          <header>
            <Eyebrow>Knowledge base</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Frequently Asked Questions About Nevada &amp; Colorado Surety Bonds
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Direct, authoritative answers to the questions our underwriters receive most
              often from applicants in Nevada and Colorado.
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {AEO_QA.map(({ q, a }) => (
              <section key={q}>
                <h3 className="font-display text-xl leading-tight text-foreground md:text-2xl">
                  {q}
                </h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-foreground/85">
                  {a}
                </p>
              </section>
            ))}
          </div>

          {/* THE THREE PARTIES — semantic supplement */}
          <section className="mt-14">
            <h3 className="font-display text-xl leading-tight md:text-2xl">
              The three parties to every surety bond
            </h3>
            <dl className="mt-6 grid gap-5 md:grid-cols-3">
              {BOND_PARTIES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 shadow-elegant"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <dt className="mt-3 font-display text-base">{title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </Section>

      {/* FAQ FUNNEL — pointers into deep knowledge-base articles */}
      <Section>
        <SectionHeading
          eyebrow="Go deeper"
          title="Browse the full bonds knowledge center"
          intro="Each topic links to a long-form article with state-specific context, claim mechanics, and underwriting detail."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(["tofu", "mofu", "bofu"] as const).map((stage) => {
            const stageFaqs = faqs.filter((f) => f.funnel_stage === stage);
            const meta = {
              tofu: { label: "Understanding the Basics", desc: "What bonds are and why you need one." },
              mofu: { label: "Coverage & Cost Details", desc: "Quoting, underwriting, and what affects approval." },
              bofu: { label: "Ready for a Coverage Review?", desc: "Quote, purchase, and issue your bond." },
            }[stage];
            return (
              <div key={stage} className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-gold/40 bg-gold/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                    {meta.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stageFaqs.length} {stageFaqs.length === 1 ? "topic" : "topics"}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{meta.desc}</p>
                <ul className="mt-5 space-y-3">
                  {stageFaqs.map((f) => (
                    <li key={f.slug}>
                      <Link
                        to="/faq/bonds/$slug"
                        params={{ slug: f.slug }}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-gold/50"
                      >
                        <span className="font-display text-base leading-snug text-foreground">
                          {f.question}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* LEAD MAGNETS — quick guide + ebook */}
      <Section id="bond-quick-guide" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Free download · Resource 1</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Surety Bonds: Your Quick Guide
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              A 2-page primer covering common bond types, key terms, quoting basics, state
              requirements, and common mistakes to avoid.
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
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Complete Guide to Surety Bonds
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              A deeper guide covering underwriting, contract bonds, commercial bonds,
              compliance requirements, and state-specific rules.
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

      {/* YMYL TRUST ANCHORS — licensing + direct contact */}
      <Section tone="cream" id="licensing">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <Eyebrow>Licensing &amp; trust</Eyebrow>
          <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
            Licensed surety bond producers in Nevada &amp; Colorado
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            XPRT Insurance is an actively licensed property &amp; casualty insurance agency
            authorized to place surety bonds in Nevada and Colorado. All bonds are placed
            through admitted, A.M. Best–rated surety carriers.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Nevada
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Licensed Producer · Nevada Division of Insurance.
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Colorado
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Licensed Producer · Colorado Division of Insurance.
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="tel:+17027101941">
                <Phone className="mr-1.5 h-4 w-4" /> (702) 710-1941
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="mailto:bonds@xprtinsurance.com">
                <Mail className="mr-1.5 h-4 w-4" /> bonds@xprtinsurance.com
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/book">Book a Bond Review</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Educational disclaimer.</strong> This page is
            educational only. Bond requirements, underwriting, approval, pricing, and
            eligibility vary by state, obligee, surety company, and application details.
            Completing a quote does not guarantee approval or issuance. Always confirm
            specific requirements with the obligee and a licensed advisor.
          </p>
        </div>
      </Section>

      <CTASection
        title="Need help structuring the right bond?"
        subtitle="Quote and purchase common bonds online, or talk to a licensed advisor for larger or specialized bonds in Nevada and Colorado."
        primaryLabel="Request a Quote"
        primaryForm="commercial_quote"
        secondaryLabel="Download the Bond Quick Sheet"
        secondaryHref="/bonds#bond-quick-guide"
      />
    </>
  );
}
