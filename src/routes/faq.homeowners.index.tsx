import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { HOMEOWNERS_FAQS } from "@/lib/homeowners-faqs";

const STAGE_ORDER = ["tofu", "mofu", "bofu"] as const;
const STAGE_LABEL = {
  tofu: "Understanding the Basics",
  mofu: "Coverage & Cost Details",
  bofu: "Ready for a Coverage Review?",
} as const;

export const Route = createFileRoute("/faq/homeowners/")({
  head: () =>
    pageHead({
      title: "Homeowners Insurance FAQs for Nevada & Colorado | XPRT",
      description:
        "Plain-English answers about homeowners insurance: replacement cost vs. ACV, wind and hail, water damage, liability limits, deductibles, and what a Nevada or Colorado policy review actually covers.",
      path: "/faq/homeowners",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Center", path: "/faq" },
          { name: "Homeowners Insurance", path: "/faq/homeowners" },
        ]),
        faqPageJsonLd(
          HOMEOWNERS_FAQS.map((f) => ({ question: f.question, answer: f.shortAnswer })),
        ),
      ],
    }),
  component: HomeownersFaqIndex,
});

function HomeownersFaqIndex() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Knowledge Center", path: "/faq" },
              { name: "Homeowners Insurance" },
            ]}
          />
        </div>
        <div className="container-prose pb-12 pt-10 md:pb-16 md:pt-14">
          <Eyebrow>Homeowners Insurance</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">
            Homeowners insurance answers for Nevada & Colorado homeowners.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Independent, plain-English answers on coverage forms, replacement cost, deductibles,
            water and wind damage, liability, and the endorsements most policies need but rarely
            include by default. Start with the basics, dig into coverage and cost details, and
            book a free policy review when you're ready.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Educational only. XPRT writes homeowners policies in Nevada and Colorado; specific
            coverage, eligibility, and pricing depend on your carrier, property, and state.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
                Download the Homeowners Cheat Sheet
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/personal/homeowners-insurance">Visit Homeowners Insurance</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {STAGE_ORDER.map((stage) => {
            const items = HOMEOWNERS_FAQS.filter((f) => f.stage === stage);
            if (items.length === 0) return null;
            return (
              <div key={stage}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
                  {STAGE_LABEL[stage]}
                </p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {items.map((f) => (
                    <li key={f.slug}>
                      <Link
                        to="/faq/homeowners/$slug"
                        params={{ slug: f.slug }}
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
        primaryLabel="Book Your Free Coverage Review"
        secondaryLabel="Download the Homeowners Cheat Sheet"
        secondaryHref="/offers/homeowners-cheat-sheet"
      />
    </>
  );
}
