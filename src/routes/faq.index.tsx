import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, ShieldCheck, Car, Building2, HardHat, Truck, Key, Briefcase } from "lucide-react";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";
import { HOMEOWNERS_FAQS } from "@/lib/homeowners-faqs";
import { BONDS_FAQS } from "@/lib/bonds-faqs";
import { DEALERSHIP_FAQS } from "@/lib/dealership-faqs";

export const Route = createFileRoute("/faq/")({
  head: () =>
    pageHead({
      title: "Knowledge Center — Insurance Guidance | XPRT Insurance",
      description:
        "Insurance guidance, organized clearly. Understand the basics, compare coverage and cost details, and take the next step when you're ready.",
      path: "/faq",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Knowledge Center", path: "/faq" },
      ]),
    }),
  component: FaqHub,
});

type CategoryCard = {
  title: string;
  description: string;
  Icon: typeof Home;
  status: "ready" | "coming-soon";
  href?: string;
  questionCount?: number;
};

const CATEGORIES: CategoryCard[] = [
  {
    title: "Homeowners Insurance",
    description:
      "Coverage, exclusions, replacement cost, endorsements, liability, and renewal reviews for Nevada and Colorado homeowners.",
    Icon: Home,
    status: "ready",
    href: "/faq/homeowners",
    questionCount: HOMEOWNERS_FAQS.length,
  },
  {
    title: "Bonds",
    description:
      "What surety bonds are, why they're required, what affects approval and pricing, and how to quote and purchase online.",
    Icon: ShieldCheck,
    status: "ready",
    href: "/faq/bonds",
    questionCount: BONDS_FAQS.length,
  },
  {
    title: "Dealership Insurance",
    description:
      "Nevada-focused: garage liability, open lot, garagekeepers, workers' comp, umbrella, and the $100,000 dealer bond.",
    Icon: Car,
    status: "ready",
    href: "/faq/dealership",
    questionCount: DEALERSHIP_FAQS.length,
  },
  { title: "Auto Insurance", description: "Personal auto coverage basics, cost, and how to review your policy.", Icon: Car, status: "coming-soon" },
  { title: "Renters Insurance", description: "What renters insurance covers and how to size your limits.", Icon: Key, status: "coming-soon" },
  { title: "Landlord Insurance", description: "Rental property coverage essentials for owners and small portfolios.", Icon: Building2, status: "coming-soon" },
  { title: "General Liability", description: "Business liability basics for small and growing companies.", Icon: Briefcase, status: "coming-soon" },
  { title: "Workers' Compensation", description: "When workers' comp is required and how it's priced.", Icon: HardHat, status: "coming-soon" },
  { title: "Commercial Auto", description: "Coverage for vehicles used in business operations.", Icon: Truck, status: "coming-soon" },
];

function FaqHub() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Knowledge Center" }]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>Knowledge Center</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
            Insurance guidance, organized clearly.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Start with the basics, compare important details, and take the next step when you're
            ready.
          </p>
        </div>
      </section>

      <Section>
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gold">Browse by category</p>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <li key={cat.title}>
              <CategoryCardLink cat={cat} />
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Free Guides &amp; Resources</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">
                Download a guide or book a free coverage review.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                Walk through coverage on your own with a guide, or get a structured review with a
                licensed advisor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/book">Book a Free Review</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
                  Homeowners Cheat Sheet
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function CategoryCardLink({ cat }: { cat: CategoryCard }) {
  const { Icon } = cat;
  const isReady = cat.status === "ready";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        {isReady ? (
          <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        ) : (
          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl leading-tight text-foreground">{cat.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
      {isReady && cat.questionCount !== undefined && (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">
          {cat.questionCount} question{cat.questionCount === 1 ? "" : "s"}
        </p>
      )}
      {!isReady && (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Book a Review →
        </p>
      )}
    </>
  );

  const className =
    "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/50";

  if (isReady) {
    if (cat.href === "/faq/homeowners") {
      return <Link to="/faq/homeowners" className={className}>{content}</Link>;
    }
    if (cat.href === "/faq/bonds") {
      return <Link to="/faq/bonds" className={className}>{content}</Link>;
    }
    if (cat.href === "/faq/dealership") {
      return <Link to="/faq/dealership" className={className}>{content}</Link>;
    }
  }
  return (
    <Link to="/book" className={className}>
      {content}
    </Link>
  );
}
