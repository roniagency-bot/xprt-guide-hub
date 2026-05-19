import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/personal/landlord-insurance")({
  head: () =>
    pageHead({
      title: "Landlord Insurance — Nevada & Colorado | XPRT Insurance",
      description:
        "Landlord insurance (DP-1, DP-3) for Nevada and Colorado rental property owners. Dwelling, liability, and loss-of-rents coverage explained.",
      path: "/personal/landlord-insurance",
    }),
  component: LandlordStub,
});

function LandlordStub() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Personal", path: "/services/personal" }, { name: "Landlord Insurance" }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Personal · Landlord</Eyebrow>
            <div className="mt-5 flex items-center gap-3 text-gold">
              <Building2 className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em]">Coming soon — full guide in progress</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] md:text-6xl">
              The right policy for your rental property.
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
              Landlord (DP-1 / DP-3) policies look similar on paper but pay out very differently.
              We help you choose dwelling, liability, and loss-of-rents coverage that actually
              fits how the property is rented.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GhlFormButton
                form="personal_quote"
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                Get a Landlord Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </GhlFormButton>
              <Button asChild size="lg" variant="outline">
                <Link to="/offers/$slug" params={{ slug: "renters-landlord-gap-checklist" }}>
                  Get the Landlord Gap Checklist
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
