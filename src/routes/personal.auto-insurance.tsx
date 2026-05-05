import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/personal/auto-insurance")({
  head: () =>
    pageHead({
      title: "Auto Insurance — Nevada & Colorado | XPRT Insurance",
      description:
        "Educational, advisor-led auto insurance for Nevada and Colorado drivers. Liability, UM/UIM, full coverage, and coverage gap reviews.",
      path: "/personal/auto-insurance",
    }),
  component: AutoStub,
});

function AutoStub() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Personal", path: "/services/personal" }, { name: "Auto Insurance" }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Personal · Auto</Eyebrow>
            <div className="mt-5 flex items-center gap-3 text-gold">
              <Car className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em]">Coming soon — full guide in progress</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] md:text-6xl">
              Auto insurance, structured the right way.
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
              Liability limits, UM/UIM, deductibles, full coverage vs. liability-only — we walk
              you through every line of your policy so you understand exactly what you own before
              an accident, not after.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90">
                <Link to="/offers/$slug" params={{ slug: "auto-coverage-guide" }}>
                  Get the Auto Coverage Guide
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
