import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { CTASection } from "@/components/site/CTASection";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { DEALERSHIP_FAQS } from "@/lib/dealership-faqs";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";

const STAGE_ORDER = ["tofu", "mofu", "bofu"] as const;
const STAGE_LABEL = {
  tofu: "Understanding the Basics",
  mofu: "Coverage & Cost Details",
  bofu: "Ready for a Coverage Review?",
} as const;

export const Route = createFileRoute("/faq/dealership/")({
  head: () =>
    pageHead({
      title: "Nevada Dealership Insurance FAQs | XPRT Insurance",
      description:
        "Educational answers about Nevada dealership insurance — garage liability, open lot, garagekeepers, workers' comp, umbrella, and the Nevada $100,000 dealer bond.",
      path: "/faq/dealership",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Center", path: "/faq" },
          { name: "Dealership Insurance", path: "/faq/dealership" },
        ]),
        faqPageJsonLd(
          DEALERSHIP_FAQS.map((f) => ({ question: f.question, answer: f.shortAnswer })),
        ),
      ],
    }),
  component: DealershipFaqIndex,
});

function DealershipFaqIndex() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Knowledge Center", path: "/faq" },
              { name: "Dealership Insurance" },
            ]}
          />
        </div>
        <div className="container-prose pb-12 pt-10 md:pb-16 md:pt-14">
          <Eyebrow>Nevada Dealership Insurance</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">
            Nevada dealership insurance, explained clearly.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Garage liability, open lot, garagekeepers, workers' comp, umbrella, and the Nevada
            DMV $100,000 dealer bond — organized so you can review them together.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/book">Book a Free Coverage Review</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/services/$category" params={{ category: "dealership" }}>
                Visit Dealership Insurance
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Quote a Dealer Bond Online
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {STAGE_ORDER.map((stage) => {
            const items = DEALERSHIP_FAQS.filter((f) => f.stage === stage);
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
                        to="/faq/dealership/$slug"
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
        title="Ready to review your Nevada dealership coverage?"
        subtitle="Book a free review of garage liability, open lot, garagekeepers, workers' comp, umbrella, and your dealer bond in one structured walk-through."
        primaryLabel="Book a Free Coverage Review"
        secondaryLabel="Visit Dealership Insurance"
        secondaryHref="/services/dealership"
      />
    </>
  );
}
