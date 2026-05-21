import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, orgJsonLd, canonical } from "@/lib/seo";

type Stage = "tofu" | "mofu" | "bofu";
type RentersFaq = { question: string; shortAnswer: string; details: string; stage: Stage };

const STAGE_LABEL: Record<Stage, string> = {
  tofu: "Understanding the Basics",
  mofu: "Coverage & Cost Details",
  bofu: "Ready for a Coverage Review?",
};

const RENTERS_FAQS: RentersFaq[] = [
  // TOFU
  {
    stage: "tofu",
    question: "What does renters insurance actually cover?",
    shortAnswer:
      "Most renters policies cover three things: your personal belongings, your personal liability if someone is hurt or their property is damaged because of you, and loss-of-use expenses if your rental becomes temporarily unlivable after a covered loss.",
    details:
      "Renters insurance is not just about your stuff. It also protects you financially if a guest is injured in your unit, if you accidentally cause damage to a neighbor's property, or if a covered event (like a fire or burst pipe) forces you to live elsewhere while repairs are made. Coverage limits, deductibles, and exclusions vary by carrier and policy form.",
  },
  {
    stage: "tofu",
    question: "Doesn't my landlord's insurance protect me?",
    shortAnswer:
      "No. Your landlord's policy covers the building structure and the landlord's liability — not your belongings, not your liability, and not your relocation costs.",
    details:
      "If a fire damages the building, your landlord's insurance rebuilds the unit. It does not replace your furniture, electronics, clothing, or pay for a hotel while you wait. It also does not defend you if a visitor sues you over an injury inside the rental.",
  },
  {
    stage: "tofu",
    question: "Is renters insurance required in Nevada or Colorado?",
    shortAnswer:
      "State law does not require it, but most landlords and property management companies in Las Vegas, Reno, Denver, and the Front Range now require it in the lease — typically with $100,000 in personal liability.",
    details:
      "Even when it is not required, renters insurance is one of the lowest-cost protections you can buy relative to the risk it covers. A typical policy costs less per month than a streaming subscription.",
  },
  // MOFU
  {
    stage: "mofu",
    question: "How much personal property coverage do I really need?",
    shortAnswer:
      "Walk through every room and estimate replacement cost — not what you paid. Most tenants underestimate by 30–50% because they forget clothing, kitchenware, and electronics.",
    details:
      "Add up furniture, electronics, kitchen items, clothing, bedding, sports gear, tools, and anything in storage. Replacement-cost coverage pays what it costs to buy new today; actual-cash-value pays depreciated value. Replacement cost is almost always worth the small premium difference.",
  },
  {
    stage: "mofu",
    question: "What is loss-of-use coverage and when does it pay?",
    shortAnswer:
      "Loss-of-use (also called additional living expense) pays for hotels, meals, and extra costs when a covered loss makes your rental temporarily unlivable.",
    details:
      "If a kitchen fire forces you into a hotel for two weeks, loss-of-use reimburses the hotel cost above what you would normally spend on rent and food. Limits are usually a percentage of your personal property coverage — confirm yours before you need it.",
  },
  {
    stage: "mofu",
    question: "Are high-value items like jewelry, bikes, or laptops fully covered?",
    shortAnswer:
      "Standard policies cap categories like jewelry, firearms, cameras, and electronics — often $1,500 to $2,500 total. A scheduled-items endorsement raises those limits item-by-item.",
    details:
      "If you own an engagement ring, a road bike, photography gear, or a high-end laptop, ask for a scheduled personal property endorsement. It usually costs a few dollars per $1,000 of value and removes the deductible on those specific items.",
  },
  {
    stage: "mofu",
    question: "How much does renters insurance cost in Nevada and Colorado?",
    shortAnswer:
      "Most policies fall between $12 and $25 per month for $25,000–$50,000 of personal property and $100,000 of liability. Bundling with auto usually saves another 10–15%.",
    details:
      "Price depends on coverage limits, deductible, ZIP code, claims history, and whether you bundle with auto. We always quote with replacement cost and $100,000+ liability as the baseline — going lower rarely saves enough to justify the gap.",
  },
  // BOFU
  {
    stage: "bofu",
    question: "How do I get a renters quote from XPRT Insurance?",
    shortAnswer:
      "Click \"Get a Renters Quote,\" share a few quick details about your rental and belongings, and we'll come back with options from carriers licensed in Nevada and Colorado.",
    details:
      "Most renters quotes take less than 10 minutes. If you also have auto insurance, mention it — bundling usually drops both premiums. We will walk you through replacement cost vs actual cash value, liability limits, and any endorsements that fit how you actually live.",
  },
  {
    stage: "bofu",
    question: "Can I bundle renters with my auto policy?",
    shortAnswer:
      "Yes — and most clients save more on the auto side than they spend on the renters policy.",
    details:
      "Bundling typically unlocks a multi-policy discount on auto (often 10–20%) that exceeds the cost of the renters policy itself. We will quote both side-by-side so you can see the real net cost.",
  },
  {
    stage: "bofu",
    question: "What should I have ready for a quick coverage review?",
    shortAnswer:
      "Your lease (for the landlord's required liability amount), a rough inventory of belongings, and any current renters or auto declarations page if you have one.",
    details:
      "If you don't have an inventory yet, that is fine — we will help you size coverage during the call. Reviews typically take 15–20 minutes and there is no obligation to switch carriers.",
  },
];

export const Route = createFileRoute("/personal/renters-insurance")({
  head: () => {
    const path = "/personal/renters-insurance";
    const title = "Renters Insurance — Nevada & Colorado | XPRT Insurance";
    const description =
      "Affordable renters insurance for Nevada and Colorado tenants. Personal property, liability, and loss-of-use coverage explained clearly with no-pressure quotes.";
    return pageHead({
      title,
      description,
      path,
      image: canonical("/og-default.jpg"),
      locale: "en",
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Personal", path: "/services/personal" },
          { name: "Renters Insurance", path },
        ]),
        serviceJsonLd({
          name: "Renters Insurance — Nevada & Colorado",
          description,
          path,
          areaServed: ["Nevada", "Colorado"],
        }),
        faqPageJsonLd(
          RENTERS_FAQS.map((f) => ({ question: f.question, answer: f.shortAnswer })),
        ),
      ],
    });
  },
  component: RentersPage,
});

const TRUST_ITEMS = [
  "Licensed in Nevada & Colorado",
  "Independent agency",
  "Bilingual service",
  "Replacement-cost first",
];

function RentersPage() {
  const tofu = RENTERS_FAQS.filter((f) => f.stage === "tofu");
  const mofu = RENTERS_FAQS.filter((f) => f.stage === "mofu");
  const bofu = RENTERS_FAQS.filter((f) => f.stage === "bofu");

  return (
    <>
      {/* HERO */}
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Personal", path: "/services/personal" },
              { name: "Renters Insurance" },
            ]}
          />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Personal · Renters</Eyebrow>
            <div className="mt-5 flex items-center gap-3 text-gold">
              <KeyRound className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em]">Tenant coverage, done right</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] md:text-6xl">
              Renters insurance protects more than your stuff.
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
              Personal property, personal liability, and loss-of-use — three protections most
              tenants underestimate. Get a policy structured for how you actually live in Nevada
              or Colorado.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GhlFormButton
                form="personal_quote"
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                Get a Renters Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </GhlFormButton>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
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

      {/* WHAT IT COVERS */}
      <Section>
        <SectionHeading
          eyebrow="What you get"
          title="The three protections inside every renters policy"
          intro="Understand each layer before you choose limits — most tenants underestimate at least one."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Personal property",
              body: "Furniture, electronics, clothing, kitchenware, and anything you would have to buy again if it were destroyed or stolen. Always quote at replacement cost.",
            },
            {
              title: "Personal liability",
              body: "If a guest is injured in your unit, your dog bites someone, or you accidentally damage a neighbor's property, liability pays defense and damages up to your limit.",
            },
            {
              title: "Loss of use",
              body: "If a covered fire, smoke, or water loss makes your rental temporarily unlivable, this pays hotel, meals, and extra costs beyond what you normally spend.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ FUNNEL — TOFU / MOFU / BOFU */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Knowledge base"
          title="Renters insurance questions, organized clearly"
          intro="Start with the basics, compare coverage and cost details, then take the next step when you are ready."
        />

        {[
          { stage: "tofu" as Stage, items: tofu },
          { stage: "mofu" as Stage, items: mofu },
          { stage: "bofu" as Stage, items: bofu },
        ].map(({ stage, items }) => (
          <div key={stage} className="mt-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/70">
              {STAGE_LABEL[stage]}
            </div>
            <Accordion type="single" collapsible className="w-full divide-y divide-border rounded-xl border border-border bg-card">
              {items.map((f) => (
                <AccordionItem key={f.question} value={f.question} className="border-0 px-6">
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
                    <span className="text-balance pr-4">{f.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    <p className="font-medium text-foreground">{f.shortAnswer}</p>
                    <p className="mt-3">{f.details}</p>
                    {stage === "bofu" && (
                      <div className="mt-5">
                        <GhlFormButton
                          form="personal_quote"
                          size="sm"
                          className="bg-gold text-gold-foreground hover:bg-gold/90"
                        >
                          Get a Renters Quote
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </GhlFormButton>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/faq">
              Browse the full knowledge base
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        title="Ready for a renters quote?"
        subtitle="Share a few details and we'll come back with options from carriers licensed in Nevada and Colorado — usually in under 24 hours."
        primaryLabel="Get a Renters Quote"
        primaryForm="personal_quote"
        secondaryLabel="Book a Free Coverage Review"
      />
    </>
  );
}
