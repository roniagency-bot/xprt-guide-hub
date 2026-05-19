import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/personal/renters-insurance")({
  head: () =>
    pageHead({
      title: "Renters Insurance — Nevada & Colorado | XPRT Insurance",
      description:
        "Affordable renters insurance for Nevada and Colorado tenants. Personal property, liability, and loss-of-use coverage explained clearly.",
      path: "/personal/renters-insurance",
    }),
  component: RentersStub,
});

function RentersStub() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Personal", path: "/services/personal" }, { name: "Renters Insurance" }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Personal · Renters</Eyebrow>
            <div className="mt-5 flex items-center gap-3 text-gold">
              <KeyRound className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em]">Coming soon — full guide in progress</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] md:text-6xl">
              Renters insurance protects more than your stuff.
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
              Personal property, personal liability, and loss-of-use — three protections most
              tenants underestimate. Get a policy structured for how you actually live.
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
                <Link to="/offers/$slug" params={{ slug: "renters-landlord-gap-checklist" }}>
                  Get the Renters Coverage Checklist
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <CTASection primaryForm="personal_quote" primaryLabel="Get a Personal Lines Quote" />
    </>
  );
}
