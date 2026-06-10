import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ExternalLink,
  FileText,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { BondsLeadForm } from "@/components/site/BondsLeadForm";
import { getLeadMagnet } from "@/lib/content.functions";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  canonical,
} from "@/lib/seo";
import heroBonds from "@/assets/hero-bonds.jpg";

const PATH = "/bonds/auto-dealer-bond";

const AEO_QA: Array<{ q: string; a: string }> = [
  {
    q: "What is a Nevada Motor Vehicle Dealer Bond?",
    a: "A Nevada Motor Vehicle Dealer Bond is a continuous surety bond required by the Nevada DMV before a dealer license is issued or renewed. It is a three-party financial guarantee: you (the principal) promise the Nevada DMV (the obligee) — backed by a surety company — that you will operate the dealership in compliance with NRS 482 and consumer-protection law, including honest title transfers, accurate odometer disclosures, and timely payment of sales tax.",
  },
  {
    q: "How much is the bond amount for Nevada and Colorado auto dealers?",
    a: "Nevada requires a $100,000 bond for used or new motor vehicle dealers, and a $10,000 bond for motorcycle and utility-trailer dealers. Colorado requires a $50,000 bond for licensed motor vehicle dealers through the Auto Industry Division. These are the required limits of liability — not the premium. The premium is a small percentage of that limit.",
  },
  {
    q: "How much does a $100,000 dealer bond cost in Nevada?",
    a: "For prime-credit applicants, the annual premium for a $100,000 Nevada dealer bond typically falls between $500 and $1,500 — roughly 1% to 3% of the bond limit. Applicants with sub-prime credit or thin business credit files may pay 3% to 10%. Pricing is set by the surety carrier based on personal credit, dealership experience, and prior bond claims.",
  },
  {
    q: "How fast can I get a dealer bond issued?",
    a: "Most standard dealer bonds at XPRT issue digitally in under five minutes through our instant online platform. You input your dealership details, complete digital verification, pay the premium, and receive an official bond filing acceptable to the Nevada DMV and the Colorado Auto Industry Division. Larger limits or rehabilitated-credit applications may require a short underwriting review.",
  },
  {
    q: "What happens if a claim is filed against my dealer bond?",
    a: "If a consumer or state agency files a valid claim against your dealer bond — for example, failure to transfer a title or unpaid sales tax — the surety investigates and, if the claim is valid, pays the claimant up to the bond limit. You, the principal, are then contractually obligated to reimburse the surety for the full amount paid, plus any investigation costs. Claims on a dealer bond stay on your underwriting record and affect future bond pricing.",
  },
  {
    q: "Do I need garage liability insurance in addition to the dealer bond?",
    a: "Yes — they cover entirely different risks. The dealer bond protects the public and the state from consumer-protection violations. Garage liability is your business liability policy: it covers bodily injury and property damage from dealership operations and customer test drives. Most dealers also add a dealer open-lot policy to cover physical damage to inventory. The Nevada DMV requires proof of garage liability with state-mandated minimum limits alongside the bond.",
  },
  {
    q: "Can I bundle my dealer bond, garage liability, and open lot with one agency?",
    a: "Yes. XPRT writes the bond plus the full dealership program — garage liability, dealer open lot, dealer plates, hired & non-owned auto, and employee dishonesty — through admitted carriers in Nevada and Colorado. Bundling consolidates the renewal calendar, the certificate desk, and DMV filings under one licensed advisor, and typically produces a stacked-exposure discount on the property side.",
  },
];

export const Route = createFileRoute("/bonds/auto-dealer-bond")({
  loader: async () => {
    const bundle = await getLeadMagnet({ data: { slug: "dealer-bond-bundle" } });
    return { bundle };
  },
  head: () => {
    const title =
      "Auto Dealer Bond — Nevada $100K & Colorado $50K | XPRT Insurance";
    const description =
      "Same-day Motor Vehicle Dealer Bonds for Nevada ($100K used/new, $10K motorcycle) and Colorado ($50K). Instant online issuance, DMV-ready filing, and bundle with garage liability + dealer open lot.";
    return pageHead({
      title,
      description,
      path: PATH,
      image: canonical("/og-default.jpg"),
      locale: "en",
      alternates: { en: PATH },
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Bonds", path: "/bonds" },
          { name: "Auto Dealer Bond", path: PATH },
        ]),
        serviceJsonLd({
          name: "Motor Vehicle Dealer Surety Bond — Nevada & Colorado",
          description,
          path: PATH,
          areaServed: ["Nevada", "Colorado"],
        }),
        faqPageJsonLd(AEO_QA.map(({ q, a }) => ({ question: q, answer: a }))),
      ],
    });
  },
  component: AutoDealerBondPage,
});

const STATE_TABLE: Array<{
  state: string;
  type: string;
  limit: string;
  premium: string;
  authority: string;
}> = [
  {
    state: "Nevada",
    type: "Used / New Motor Vehicle Dealer",
    limit: "$100,000",
    premium: "$500 – $1,500 / yr",
    authority: "NV DMV · NRS 482",
  },
  {
    state: "Nevada",
    type: "Motorcycle Dealer",
    limit: "$10,000",
    premium: "$100 – $300 / yr",
    authority: "NV DMV · NRS 482",
  },
  {
    state: "Nevada",
    type: "Utility Trailer Dealer",
    limit: "$10,000",
    premium: "$100 – $300 / yr",
    authority: "NV DMV · NRS 482",
  },
  {
    state: "Colorado",
    type: "Motor Vehicle Dealer",
    limit: "$50,000",
    premium: "$500 – $1,500 / yr",
    authority: "CO Auto Industry Division",
  },
  {
    state: "Colorado",
    type: "Powersports / Motorcycle Dealer",
    limit: "$50,000",
    premium: "$500 – $1,500 / yr",
    authority: "CO Auto Industry Division",
  },
];

const APPROVAL_STEPS = [
  {
    title: "Quote in 60 seconds",
    body: "Enter your legal entity name, state, license type, and the bond amount required by the obligee.",
  },
  {
    title: "Digital verification",
    body: "Soft-pull credit check on the principal. No impact on your personal credit score.",
  },
  {
    title: "Pay the premium",
    body: "Card or ACH. The surety binds coverage and issues an official bond certificate immediately.",
  },
  {
    title: "We file with the DMV",
    body: "Digital filing accepted same-day by the Nevada DMV. Original-signature copies mailed for CO if required.",
  },
];

const COMMON_CLAIMS = [
  "Failure to deliver a clean title within statutory timeframes.",
  "Odometer rollback or misrepresentation of vehicle condition.",
  "Unpaid state sales tax collected at point of sale.",
  "Failure to honor a written warranty or as-is disclosure.",
  "Wholesale-only license holder selling to retail consumers.",
];

function AutoDealerBondPage() {
  const { bundle } = Route.useLoaderData();
  return (
    <>
      {/* HERO */}
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
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Bonds", path: "/bonds" },
              { name: "Auto Dealer Bond" },
            ]}
          />
        </div>
        <div className="container-prose relative pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl text-primary-foreground">
            <Eyebrow className="text-gold">
              <Car className="mr-1.5 inline h-3.5 w-3.5" /> Motor Vehicle Dealer Bond
            </Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
              Auto Dealer Bonds — Nevada &amp; Colorado DMV-ready in minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Same-day issuance of the $100,000 Nevada dealer bond, the $10,000
              motorcycle &amp; trailer bond, and the $50,000 Colorado motor vehicle
              dealer bond. The bond <em>plus</em> the full dealership program — under
              one licensed advisor.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-gold-shimmer bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                  Quote My Dealer Bond
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
              {[
                "Issued in under 5 minutes",
                "NV DMV & CO AID accepted",
                "Bundles with garage liability",
                "Bilingual support",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT IT IS (speakable answer box) */}
      <Section>
        <article className="mx-auto max-w-3xl">
          <Eyebrow>The short answer</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
            What is a Motor Vehicle Dealer Bond?
          </h2>
          <p className="speakable mt-5 text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">
            A Motor Vehicle Dealer Bond is a continuous surety bond required by the
            Nevada DMV and the Colorado Auto Industry Division before a dealer
            license is issued or renewed. It is a three-party financial guarantee:
            you (the principal) promise the state (the obligee) — backed by an
            admitted surety company — that you will follow consumer-protection law,
            transfer titles honestly, and remit sales tax accurately. It is{" "}
            <em>not</em> insurance for your business: it protects the public and the
            state if you do not.
          </p>
        </article>
      </Section>

      {/* STATE-BY-STATE TABLE */}
      <Section tone="cream" id="state-requirements">
        <SectionHeading
          eyebrow="State requirements"
          title="Bond amounts, premium ranges, and authority"
          intro="Required limits set by each state's licensing agency. Premium ranges are illustrative of XPRT placements for prime-credit applicants."
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink text-primary-foreground">
              <tr>
                <th className="px-5 py-4 font-display text-sm">State</th>
                <th className="px-5 py-4 font-display text-sm">Dealer type</th>
                <th className="px-5 py-4 font-display text-sm">Bond limit</th>
                <th className="px-5 py-4 font-display text-sm">Typical premium</th>
                <th className="px-5 py-4 font-display text-sm">Authority</th>
              </tr>
            </thead>
            <tbody>
              {STATE_TABLE.map((row, i) => (
                <tr
                  key={`${row.state}-${row.type}`}
                  className={i % 2 ? "bg-background" : "bg-card"}
                >
                  <td className="px-5 py-4 font-medium text-foreground">{row.state}</td>
                  <td className="px-5 py-4 text-foreground">{row.type}</td>
                  <td className="px-5 py-4 font-display text-base text-foreground">{row.limit}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.premium}</td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{row.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Premiums are not quotes. Final pricing varies by credit, experience, lot
          security, and carrier appetite.
        </p>
      </Section>

      {/* HOW APPROVAL WORKS */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From quote to DMV filing in under five minutes"
          intro="Standard dealer bonds run through our instant online platform. Larger limits or rebuilt-credit applications get a short underwriting review."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {APPROVAL_STEPS.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-card p-6 shadow-elegant"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/10 font-display text-base text-gold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
              Start My Dealer Bond Quote
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Section>

      {/* CLAIMS — what triggers them */}
      <Section tone="cream" id="claims">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Underwriting reality</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
            What actually triggers a claim on a dealer bond
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">
            A dealer bond claim is paid <em>by the surety to the harmed party</em>{" "}
            — then collected back from you under your indemnity agreement. The
            most common triggers we see at the carrier desk:
          </p>
          <ul className="mt-7 space-y-3">
            {COMMON_CLAIMS.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm leading-relaxed text-foreground">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
            Claim history follows the principal across carriers. Two paid claims in
            a 24-month window is enough to move you out of standard-market dealer
            bond pricing into a surplus-lines or collateralized program.
          </p>
        </div>
      </Section>

      {/* BUNDLE PLAY — featured lead magnet */}
      <Section id="bundle">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Bundle play · Free worksheet</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Stack the bond with garage liability &amp; open lot
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Our 4-page bundle worksheet shows how the three policies fit
              together, what each one costs in NV and CO, and how bundling them
              under one renewal calendar protects your DMV license.
            </p>
            <ul className="mt-8 space-y-3">
              {(bundle?.bullets_en ?? []).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <p className="mt-3 font-display text-sm">Bond</p>
                <p className="mt-1 text-xs text-muted-foreground">DMV-required guarantee</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Car className="h-5 w-5 text-gold" />
                <p className="mt-3 font-display text-sm">Garage Liability</p>
                <p className="mt-1 text-xs text-muted-foreground">Test drives &amp; operations</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Clock className="h-5 w-5 text-gold" />
                <p className="mt-3 font-display text-sm">Open Lot</p>
                <p className="mt-1 text-xs text-muted-foreground">Inventory damage</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Get the Bundle Worksheet</h3>
                  <p className="text-xs text-muted-foreground">4-page PDF · delivered instantly.</p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={bundle?.id}
                  leadMagnetSlug="dealer-bond-bundle"
                  resourceName="Dealer Bond + Garage Liability Bundle"
                  thankYouSlug="dealer-bond-bundle"
                  ctaLabel="Get the Bundle Worksheet"
                  leadSource="auto_dealer_bond_bundle"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AEO Q&A */}
      <Section tone="cream" id="knowledge-base">
        <article className="mx-auto max-w-3xl">
          <Eyebrow>Knowledge base</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
            Auto Dealer Bond — frequently asked questions
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            The questions our dealer-bond desk gets every week from Nevada and
            Colorado applicants.
          </p>
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
        </article>
      </Section>

      {/* CROSS-LINKS */}
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <Link
            to="/bonds"
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
          >
            <Sparkles className="h-5 w-5 text-gold" />
            <h3 className="mt-4 font-display text-lg leading-tight">All surety bonds</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              License, permit, contractor, notary, fidelity, and contract bonds.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-gold">
              Browse all bonds <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            to="/services/$category"
            params={{ category: "dealership" }}
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
          >
            <Car className="h-5 w-5 text-gold" />
            <h3 className="mt-4 font-display text-lg leading-tight">Dealership insurance</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Garage liability, dealer open lot, employee dishonesty, and dealer E&amp;O.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-gold">
              See dealership coverage <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            to="/faq/dealership"
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
          >
            <FileText className="h-5 w-5 text-gold" />
            <h3 className="mt-4 font-display text-lg leading-tight">Dealership knowledge base</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Long-form articles on DMV licensing, dealer plates, and compliance.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-gold">
              Read the knowledge base <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Section>

      {/* YMYL TRUST */}
      <Section tone="cream" id="licensing">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <Eyebrow>Licensing &amp; trust</Eyebrow>
          <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
            Licensed dealer-bond producers in Nevada &amp; Colorado
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            XPRT Insurance is an actively licensed property &amp; casualty agency
            placing dealer bonds through admitted, A.M. Best–rated surety
            carriers.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Nevada
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Licensed Producer · Nevada Division of Insurance · NV DMV-recognized filer.
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Colorado
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Licensed Producer · Colorado Division of Insurance · CO Auto Industry Division.
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="tel:+17027663394">
                <Phone className="mr-1.5 h-4 w-4" /> (702) 766-3394
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="mailto:roni@xprtinsurance.com">
                <Mail className="mr-1.5 h-4 w-4" /> roni@xprtinsurance.com
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/book">Book a Bond Review</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Educational disclaimer.</strong>{" "}
            Bond requirements, underwriting, approval, pricing, and eligibility
            vary by state, obligee, surety company, and application details.
            Completing a quote does not guarantee approval or issuance.
          </p>
        </div>
      </Section>

      <CTASection
        title="Ready to issue your dealer bond?"
        subtitle="Quote and purchase your NV $100K, NV $10K, or CO $50K motor vehicle dealer bond online — or talk to a licensed advisor about bundling with garage liability and open lot."
        primaryLabel="Request a Quote"
        primaryForm="commercial_quote"
        secondaryLabel="Browse All Surety Bonds"
        secondaryHref="/bonds"
      />
    </>
  );
}
