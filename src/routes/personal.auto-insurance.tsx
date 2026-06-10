import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Car,
  FileText,
  Calendar,
  BookOpen,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";

const PATH = "/personal/auto-insurance";

/**
 * Auto Insurance hub. Mirrors the homeowners-insurance structure:
 * hero answer block, trust strip, coverage breakdown, "what's not covered",
 * state-specific guidance, FAQ block with FAQPage + Article schema,
 * internal links to sibling personal lines, final CTA. Bilingual twin at
 * /es/personal/auto-insurance.
 */

const AUTO_FAQS = [
  {
    question: "What auto insurance coverage is required in Nevada?",
    answer:
      "Nevada requires every driver to carry minimum liability limits of $25,000 per person / $50,000 per accident for bodily injury and $20,000 for property damage (25/50/20). These are state minimums — not enough coverage for most real accidents. Most drivers in Las Vegas, Henderson, or Reno benefit from 100/300/100 or higher, plus uninsured/underinsured motorist (UM/UIM) coverage at matching limits.",
  },
  {
    question: "What auto insurance coverage is required in Colorado?",
    answer:
      "Colorado requires minimum liability of $25,000 per person / $50,000 per accident bodily injury and $15,000 property damage (25/50/15). UM/UIM coverage must be offered at equal limits — you can reject it in writing, but for most Denver, Aurora, and Colorado Springs drivers, keeping it is the single highest-value line on the policy after liability.",
  },
  {
    question: "What does full coverage auto insurance actually include?",
    answer:
      "'Full coverage' is not a policy type — it is shorthand for liability + comprehensive + collision. Liability pays others when you are at fault. Comprehensive covers theft, hail, fire, vandalism, and animal strikes. Collision covers damage to your own vehicle from an accident. Most lenders require comp and collision while you have a loan or lease.",
  },
  {
    question: "What is uninsured motorist (UM/UIM) coverage and do I need it?",
    answer:
      "UM/UIM pays your bodily injury and (in some cases) property damage if the at-fault driver has no insurance or not enough. Roughly 1 in 8 drivers in the U.S. is uninsured, and that rises in dense metro areas like Las Vegas. We recommend UM/UIM at the same limits as your liability — it is one of the cheapest and most important parts of a real auto policy.",
  },
  {
    question: "Will my auto insurance cover rideshare or delivery driving?",
    answer:
      "Standard personal auto policies exclude commercial use. Driving for Uber, Lyft, DoorDash, or Instacart triggers exclusions during pickup and active trips. You need a rideshare or delivery endorsement, or a commercial auto policy. Without it, an at-fault accident while logged into the app can leave you personally responsible.",
  },
  {
    question: "How much does auto insurance cost in Nevada and Colorado?",
    answer:
      "Premiums depend on ZIP code, vehicle, driving record, credit-based insurance score, coverage limits, and deductibles. Las Vegas and Denver metro typically run higher than rural ZIPs because of accident frequency, theft rates, and uninsured driver percentages. The honest answer: the cheapest premium with bare minimum limits usually costs the most after an accident.",
  },
  {
    question: "What is a deductible and how should I choose one?",
    answer:
      "A deductible is what you pay out of pocket on a comprehensive or collision claim before your insurer pays the rest. Common options are $500, $1,000, and $2,500. A higher deductible lowers your premium but raises your exposure on a claim. Choose the highest deductible you can comfortably pay tomorrow without disrupting your finances.",
  },
  {
    question: "Does my auto insurance cover a rental car after an accident?",
    answer:
      "Only if you carry rental reimbursement coverage. It usually costs a few dollars a month and pays a daily rental limit (commonly $30–$50/day) for a set number of days while your car is repaired after a covered loss. Without it, you pay the rental out of pocket.",
  },
  {
    question: "When does an umbrella policy make sense for auto coverage?",
    answer:
      "An umbrella adds $1M+ of liability on top of your auto and homeowners limits for a relatively low premium. If you own a home, have meaningful savings, drive teen drivers, or have a higher exposure (frequent highway miles, towing, professional reputation), an umbrella is usually the highest-leverage policy you can buy.",
  },
  {
    question: "How often should I review my auto insurance policy?",
    answer:
      "At every renewal (every 6 or 12 months) and after any life event: new vehicle, new driver, address change, marriage, teen driver, paid-off car, or rideshare/delivery work. A 20-minute coverage review with a licensed advisor catches gaps before they become claim denials.",
  },
];

const COVERAGE_PARTS = [
  {
    title: "Bodily Injury Liability",
    body:
      "Pays for injuries you cause to others. Nevada and Colorado set low state minimums; most drivers should carry 100/300 or higher.",
  },
  {
    title: "Property Damage Liability",
    body:
      "Pays for damage you cause to other vehicles, fences, buildings, and infrastructure. State minimums rarely cover a modern vehicle's full value.",
  },
  {
    title: "Uninsured / Underinsured Motorist (UM/UIM)",
    body:
      "Pays your medical bills and lost wages when the at-fault driver has no insurance or not enough. Match it to your liability limits.",
  },
  {
    title: "Comprehensive (Other-than-Collision)",
    body:
      "Theft, hail, fire, vandalism, glass, falling objects, animal strikes. Required by lenders while you have a loan or lease.",
  },
  {
    title: "Collision",
    body:
      "Damage to your own vehicle from a crash, regardless of fault. Subject to your chosen deductible.",
  },
  {
    title: "Medical Payments / PIP",
    body:
      "Pays medical expenses for you and your passengers regardless of fault. Useful even when you carry health insurance.",
  },
];

const NOT_COVERED = [
  {
    title: "Rideshare & delivery",
    body:
      "Personal auto excludes Uber, Lyft, DoorDash, and Instacart during active periods. Requires a rideshare/delivery endorsement or commercial policy.",
  },
  {
    title: "Business use",
    body:
      "Using your personal vehicle for paid work (sales calls, hauling tools, client visits) can trigger exclusions. Commercial auto is the right fit.",
  },
  {
    title: "Excluded drivers",
    body:
      "Anyone signed off the policy as 'excluded' has zero coverage when driving the car — even with permission. Common surprise after a household change.",
  },
  {
    title: "Wear, tear & mechanical breakdown",
    body:
      "Auto insurance pays for sudden, accidental losses — not aging brakes, transmissions, or engines. Mechanical breakdown coverage is a separate add-on.",
  },
  {
    title: "Custom parts & equipment",
    body:
      "Aftermarket wheels, stereo, lift kits, and wraps are capped low or excluded. Requires a custom-equipment endorsement with declared value.",
  },
  {
    title: "Out-of-country driving",
    body:
      "Most U.S. policies do not extend into Mexico and have limited coverage in Canada. Buy a Mexico tourist auto policy for any cross-border trip.",
  },
];

const TRUST_ITEMS = [
  "Licensed in Nevada & Colorado",
  "Independent agency",
  "Bilingual service",
  "Educational first, sales pitch never",
];

export const Route = createFileRoute("/personal/auto-insurance")({
  head: () => {
    const title = "Auto Insurance in Nevada & Colorado | XPRT Insurance";
    const description =
      "Understand auto insurance limits, UM/UIM, comprehensive, collision, and rideshare gaps. Educational, advisor-led coverage reviews for Nevada and Colorado drivers.";
    const jsonLd: Record<string, unknown>[] = [
      orgJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Personal", path: "/services/personal" },
        { name: "Auto Insurance", path: PATH },
      ]),
      serviceJsonLd({
        name: "Auto Insurance — Nevada & Colorado",
        description,
        path: PATH,
        areaServed: ["Nevada", "Colorado"],
      }),
      faqPageJsonLd(AUTO_FAQS, {
        path: PATH,
        locale: "en",
        speakableSelectors: ["#answer-block", "[data-speakable]"],
      }),
    ];
    return pageHead({
      title,
      description,
      path: PATH,
      image: canonical("/og-default.jpg"),
      locale: "en",
      alternates: { en: PATH, es: "/es/personal/auto-insurance" },
      jsonLd,
    });
  },
  component: AutoHub,
});

function AutoHub() {
  return (
    <>
      {/* HERO + ANSWER BLOCK */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Personal", path: "/services/personal" },
              { name: "Auto Insurance" },
            ]}
          />
        </div>
        <div className="container-prose grid gap-12 pb-20 pt-8 md:pb-28 md:pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7 fade-in-up">
            <Eyebrow>Personal · Auto</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Auto Insurance in Nevada & Colorado — know what your policy actually pays before an accident.
            </h1>
            <p
              id="answer-block"
              data-speakable
              className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Auto insurance pays for injuries and damage from a covered accident, but state-minimum
              limits in Nevada (25/50/20) and Colorado (25/50/15) almost never cover the cost of a
              real crash. The right policy combines liability, uninsured-motorist (UM/UIM),
              comprehensive, and collision at limits that match what you actually own and earn —
              not the cheapest premium on a comparison site.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GhlFormButton
                form="personal_quote"
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                Get an Auto Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </GhlFormButton>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <aside className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lift md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <Gauge className="h-5 w-5" />
                </span>
                <h2 className="font-display text-lg leading-tight">Quick answer block</h2>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-foreground">Nevada minimum limits</dt>
                  <dd className="mt-1 text-muted-foreground">25/50/20 — bodily injury and property damage liability.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Colorado minimum limits</dt>
                  <dd className="mt-1 text-muted-foreground">25/50/15 — UM/UIM must be offered at equal limits.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">"Full coverage" means</dt>
                  <dd className="mt-1 text-muted-foreground">Liability + comprehensive + collision (not a policy type).</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Most common gap</dt>
                  <dd className="mt-1 text-muted-foreground">Low UM/UIM limits when the at-fault driver is uninsured.</dd>
                </div>
              </dl>
            </aside>
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
                {i < TRUST_ITEMS.length - 1 && <span className="hidden text-border md:inline">•</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COVERAGE BREAKDOWN */}
      <Section id="coverage" tone="cream">
        <SectionHeading
          eyebrow="What's on a real auto policy"
          title="The six parts of every personal auto policy"
          intro="Every meaningful conversation about auto insurance comes back to these six lines. Limits are what matter — names are just the wrapper."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {COVERAGE_PARTS.map((c) => (
            <li key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="font-display text-xl leading-tight">{c.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* WHAT'S NOT COVERED */}
      <Section id="not-covered">
        <div className="mx-auto max-w-5xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <Eyebrow>Read this before you bind</Eyebrow>
              <h2 className="mt-3 text-balance font-display text-3xl leading-tight md:text-4xl">
                What a standard auto policy does NOT cover
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground">
                These are the gaps that turn into the most expensive surprises after an accident.
                Each one can usually be solved — but only with the right endorsement or a separate
                commercial policy <em>before</em> the loss happens.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {NOT_COVERED.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-background p-5">
                <p className="font-display text-lg leading-tight text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Not sure which of these apply to you?
            </p>
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/book">
                Book a Free Coverage Review
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* STATE-SPECIFIC GUIDANCE */}
      <Section id="state-guides" tone="cream">
        <SectionHeading
          eyebrow="Local guidance"
          title="Auto insurance by state"
          intro="Coverage needs shift by region. Las Vegas and Reno carry some of the highest uninsured-driver rates in the country; Denver and the Front Range face hail seasons that drive total losses. The right limits look different in each market."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            to="/states/$state"
            params={{ state: "nevada" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Nevada drivers</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Las Vegas, Henderson, North Las Vegas, Reno, and Sparks. High uninsured-motorist rates
              and tourist-heavy roads make UM/UIM and umbrella limits the highest-leverage upgrades.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Nevada coverage guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            to="/states/$state"
            params={{ state: "colorado" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Colorado drivers</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Denver, Aurora, Colorado Springs, Boulder, and the Front Range. Hail claims, mountain
              commutes, and high-mileage drivers shape what comprehensive and collision should look like.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Colorado coverage guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>

      {/* FAQ — inline JSON-LD already attached via head() */}
      <Section id="faqs">
        <SectionHeading
          eyebrow="Auto insurance FAQ"
          title="Straight answers about auto coverage"
          intro="The questions Nevada and Colorado drivers ask us most often. Optimized for quick reads, voice search, and AI citation."
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {AUTO_FAQS.map((qa) => (
            <details
              key={qa.question}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lift"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-left font-display text-lg leading-snug text-foreground">
                <span data-speakable>{qa.question}</span>
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p data-speakable className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {qa.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* RELATED COVERAGE / INTERNAL LINKS */}
      <Section id="related" tone="cream">
        <SectionHeading
          eyebrow="Build your full personal lines stack"
          title="Other coverage to review alongside auto"
          intro="Auto rarely lives alone. The pages below are how most clients in Nevada and Colorado round out their personal coverage."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              to: "/personal/homeowners-insurance" as const,
              title: "Homeowners Insurance",
              body:
                "Bundle savings, umbrella eligibility, and shared deductible review. The most common pairing with auto.",
              icon: BookOpen,
            },
            {
              to: "/personal/renters-insurance" as const,
              title: "Renters Insurance",
              body:
                "Personal property and liability for tenants. Pairs with auto for multi-policy discounts.",
              icon: FileText,
            },
            {
              to: "/personal/landlord-insurance" as const,
              title: "Landlord Insurance",
              body:
                "Dwelling fire (DP-3), liability, and lost-rent coverage for owners of rental property.",
              icon: Calendar,
            },
            {
              to: "/bonds/auto-dealer-bond" as const,
              title: "Auto Dealer Bond",
              body:
                "Required Nevada motor vehicle dealer bond — same advisor, separate license-and-permit specialty.",
              icon: ShieldCheck,
            },
            {
              to: "/bonds" as const,
              title: "Surety & Commercial Bonds",
              body:
                "Contractor, license & permit, and fidelity bonds. Our specialty for Nevada and Colorado businesses.",
              icon: Car,
            },
            {
              to: "/about" as const,
              title: "Talk to a licensed advisor",
              body:
                "Direct phones and emails for every advisor on the team — bilingual, Las Vegas and Denver offices.",
              icon: ArrowRight,
            },
          ].map(({ to, title, body, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lift"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Educational disclaimer.</strong> This page is for
          educational purposes only and does not constitute insurance advice, a quote, or an offer
          of coverage. Actual coverage depends on your specific policy terms, carrier, endorsements,
          underwriting, and applicable Nevada or Colorado law. Always review your declarations
          page and speak with a licensed advisor before making changes. To request a personalized
          review,{" "}
          <Link to="/book" className="underline underline-offset-2">
            book a free coverage review
          </Link>
          {" "}or browse the{" "}
          <Link to="/faq" className="underline underline-offset-2">
            knowledge base
          </Link>
          .
        </p>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        title="Get an auto coverage review — free, 20 minutes."
        subtitle="A licensed advisor walks you through your current policy line by line. No quote required, no pressure. Just clarity on what you own and what you might be missing."
        primaryLabel="Get an Auto Quote"
        primaryForm="personal_quote"
        secondaryLabel="Book a Free Coverage Review"
        secondaryHref="/book"
      />
    </>
  );
}
