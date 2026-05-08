import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { BONDS_FAQS, PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";

const STAGE_ORDER = ["tofu", "mofu", "bofu"] as const;
const STAGE_LABEL = {
  tofu: "Understanding the Basics",
  mofu: "Coverage & Cost Details",
  bofu: "Ready for a Coverage Review?",
} as const;

export const Route = createFileRoute("/faq/bonds/")({
  head: () =>
    pageHead({
      title: "Surety Bonds FAQs | XPRT Insurance",
      description:
        "Educational answers about surety bonds — what they are, why they're required, what affects approval and pricing, and how to quote and purchase common bonds online.",
      path: "/faq/bonds",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Knowledge Center", path: "/faq" },
        { name: "Bonds", path: "/faq/bonds" },
      ]),
    }),
  component: BondsFaqIndex,
});

function BondsFaqIndex() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Knowledge Center", path: "/faq" },
              { name: "Bonds" },
            ]}
          />
        </div>
        <div className="container-prose pb-12 pt-10 md:pb-16 md:pt-14">
          <Eyebrow>Surety Bonds</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">
            Surety bonds, explained clearly.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Understand the basics, learn how approval and pricing work, and quote and purchase
            common bonds online.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Quote &amp; Purchase Online
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/business-insurance/bonds">Learn About Bonds</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {STAGE_ORDER.map((stage) => {
            const items = BONDS_FAQS.filter((f) => f.stage === stage);
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
                        to="/faq/bonds/$slug"
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
        title="Ready to quote your bond?"
        subtitle="Quote and purchase common bonds online, or book a short bond review for help with larger or specialized bonds in Nevada and Colorado."
        primaryLabel="Book a Quick Bond Review"
        secondaryLabel="Learn About Bonds"
        secondaryHref="/business-insurance/bonds"
      />
    </>
  );
}
