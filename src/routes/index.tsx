import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Car,
  Building2,
  ScrollText,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import heroAgency from "@/assets/hero-agency.jpg";
import { pageHead, orgJsonLd, canonical } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "XPRT Insurance | Nevada & Colorado Agency",
    description:
      "Independent insurance agency licensed in Nevada and Colorado. Educational, advisor-led coverage for personal, commercial, bonds, and Nevada dealerships.",
    path: "/",
    image: canonical("/og-default.jpg"),
    jsonLd: orgJsonLd(),
  }),
  component: HomePage,
});

const SERVICES = [
  {
    icon: Home,
    title: "Personal Insurance",
    description: "Auto, Home, Renters, Landlord, and Umbrella — structured the right way.",
    to: "/services/personal",
  },
  {
    icon: ScrollText,
    title: "Bonds",
    description: "Surety, license & permit, contractor, dealer, and court bonds. Our specialty.",
    to: "/business-insurance/bonds",
    badge: "Our Specialty",
    featured: true,
  },
  {
    icon: Car,
    title: "Dealership Insurance",
    description: "Garage liability, dealer open lot, and dealer bonds — for licensed Nevada dealers.",
    to: "/services/dealership",
    badge: "NV only",
  },
  {
    icon: Building2,
    title: "Commercial Insurance",
    description: "General Liability, Workers' Comp, Commercial Auto, and BOP coverage.",
    to: "/services/commercial",
  },
] as const;

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose grid gap-12 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6 fade-in-up">
            <Eyebrow>Nevada & Colorado · Independent Agency</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Most policies look fine
              <span className="text-muted-foreground">…</span>
              <span className="block italic text-muted-foreground">until you actually need them.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Personal insurance, commercial coverage, bonds, and dealership programs — built
              around how you actually live and work. Educational first. Sales pitch never.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90">
                <Link to="/book">
                  Book Your Free Coverage Review
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/faq">Browse the Knowledge Base</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-border">
              <img
                src={heroAgency}
                alt="XPRT Insurance — protecting Nevada and Colorado homes, autos, businesses, and contractors"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 text-primary-foreground md:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Independent · Nevada & Colorado
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  Personal, Commercial, Bonds & Dealership — one advisory standard.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  Every line we write is reviewed line-by-line so you understand exactly what you own.
                </p>
                <Link
                  to="/book"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80"
                >
                  Book a free coverage review →
                </Link>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-gold/15 blur-2xl md:block" />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* SERVICES */}
      <Section>
        <SectionHeading
          eyebrow="Coverage"
          title="Structured coverage for every line"
          intro="Four practice areas. One advisory standard. Every policy reviewed line-by-line so you understand what you own."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.to} {...s} />
          ))}
        </div>
      </Section>

      {/* WHY CLIENTS CHOOSE */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why XPRT"
              title="Independent. Educational. Built on clarity."
              intro="We work for you, not the carriers. Our process starts with understanding what you're protecting — then we structure coverage that actually matches it."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                icon: ShieldCheck,
                title: "Independent agency",
                body: "Multiple A-rated carriers. Recommendations based on your situation, not a quota.",
              },
              {
                icon: GraduationCap,
                title: "Educational first",
                body: "We explain replacement cost, UM/UIM, additional insured, and every other term — clearly.",
              },
              {
                icon: ScrollText,
                title: "Bonds specialists",
                body: "Surety, license & permit, contractor, dealer bonds. We know the underwriters.",
              },
              {
                icon: Sparkles,
                title: "Bilingual service",
                body: "English and Español, with the same advisory standard in both languages.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-elegant">
                <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="The process"
          title="How a coverage review works"
          intro="A simple, structured walk-through. No quote required to start."
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Discovery", b: "20-minute call to understand your situation, assets, and current policies." },
            { n: "02", t: "Education", b: "We explain coverage line by line — what each section pays for and where most policies fall short." },
            { n: "03", t: "Recommendation", b: "If we can structure it better, we show you options side by side. If not, we tell you that too." },
          ].map((step) => (
            <li key={step.n} className="relative">
              <span className="font-display text-5xl text-gold">{step.n}</span>
              <h3 className="mt-3 font-display text-2xl">{step.t}</h3>
              <p className="mt-2 text-muted-foreground">{step.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FEATURED OFFERS */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Free guides"
          title="Free Guides & Resources"
          intro="One-page guides written by an advisor, not a marketer. Pick the one that matches your situation."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { slug: "homeowners-cheat-sheet", title: "Homeowners Insurance Cheat Sheet", tag: "Personal" },
            { slug: "auto-coverage-guide", title: "Auto Insurance Coverage Guide", tag: "Personal" },
            { slug: "nevada-bond-cheat-sheet", title: "Nevada Bond Requirements Cheat Sheet", tag: "Bonds · NV" },
            { slug: "nevada-dealership-starter-guide", title: "Nevada Dealership Insurance & Bond Guide", tag: "Dealership · NV" },
            { slug: "small-business-starter-guide", title: "Small Business Insurance Starter Guide", tag: "Commercial" },
            { slug: "workers-comp-liability-checklist", title: "Workers' Comp & Liability Checklist", tag: "Commercial" },
          ].map((o) => (
            <Link
              key={o.slug}
              to="/offers/$slug"
              params={{ slug: o.slug }}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{o.tag}</span>
              <h3 className="mt-3 font-display text-2xl leading-tight">{o.title}</h3>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                Get the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ ENTRY */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Knowledge base"
              title="Insurance guidance, organized clearly."
              intro="Start with the basics, then go deeper. Every article connects to the next stage so you can build coverage knowledge step by step."
            />
            <Button asChild className="mt-8" variant="outline">
              <Link to="/faq">
                Open the knowledge base
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 lg:col-span-7">
            {[
              { stage: "Understanding the Basics", q: "What does homeowners insurance actually cover?", slug: "what-does-homeowners-insurance-cover" },
              { stage: "Coverage & Cost Details", q: "Replacement cost vs actual cash value — what's the difference?", slug: "replacement-cost-vs-actual-cash-value" },
              { stage: "Ready for a Coverage Review?", q: "How do I get my policy reviewed by an advisor?", slug: "how-to-review-homeowners-policy-with-an-advisor" },
            ].map((f) => (
              <Link
                key={f.slug}
                to="/faq/homeowners/$slug"
                params={{ slug: f.slug }}
                className="group flex items-start justify-between gap-6 rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
              >
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{f.stage}</span>
                  <p className="mt-1.5 font-display text-xl text-foreground">{f.q}</p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
