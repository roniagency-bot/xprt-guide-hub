import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Home as HomeIcon,
  FileText,
  BookOpen,
  PlayCircle,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HomeownersLeadForm } from "@/components/site/HomeownersLeadForm";
import { HomeownersQuiz } from "@/components/site/HomeownersQuiz";
import { getServicePage, getLeadMagnet } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, canonical } from "@/lib/seo";
import heroHome from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/personal/homeowners-insurance")({
  loader: async () => {
    const [page, cheatSheet, ebook] = await Promise.all([
      getServicePage({ data: { slug: "homeowners-insurance" } }),
      getLeadMagnet({ data: { slug: "homeowners-cheat-sheet" } }),
      getLeadMagnet({ data: { slug: "homeowners-ebook" } }),
    ]);
    return { page, cheatSheet, ebook };
  },
  head: ({ loaderData }) => {
    const path = "/personal/homeowners-insurance";
    const title = "Homeowners Insurance — Nevada & Colorado | XPRT Insurance";
    const description =
      "Clear, practical homeowners insurance guidance for Nevada and Colorado homeowners. Understand your coverage, identify gaps, and know what to review before renewal or a claim.";
    const jsonLd: Record<string, unknown>[] = [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Personal", path: "/services/personal" },
        { name: "Homeowners Insurance", path },
      ]),
      serviceJsonLd({
        name: "Homeowners Insurance",
        description,
        path,
        areaServed: ["NV", "CO"],
      }),
    ];
    if (loaderData?.page?.faqs?.length) {
      jsonLd.push(
        faqPageJsonLd(
          loaderData.page.faqs.map((f: any) => ({
            question: f.question_en,
            answer: f.short_answer_en,
          })),
        ),
      );
    }
    return pageHead({
      title,
      description,
      path,
      image: canonical("/og-default.jpg"),
      jsonLd,
    });
  },
  component: HomeownersHub,
});

const TRUST_ITEMS = [
  "Licensed in Nevada & Colorado",
  "Independent agency",
  "Bilingual service",
  "Educational first, sales pitch never",
];

// Quiz logic moved to <HomeownersQuiz /> in src/components/site/HomeownersQuiz.tsx

function HomeownersHub() {
  const { page, cheatSheet, ebook } = Route.useLoaderData();
  const faqs = (page?.faqs ?? []).map((f: any) => ({
    slug: f.slug,
    question: f.question_en,
    short_answer: f.short_answer_en,
    funnel_stage: f.funnel_stage,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Personal", path: "/services/personal" },
              { name: "Homeowners Insurance" },
            ]}
          />
        </div>
        <div className="container-prose grid gap-12 pb-20 pt-8 md:pb-28 md:pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6 fade-in-up">
            <Eyebrow>Personal · Homeowners</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Know what your homeowners policy covers — before it matters.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Clear, practical homeowners insurance guidance for Nevada and Colorado homeowners.
              Understand your coverage, identify gaps, and know what to review before renewal or a
              claim.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90">
                <a href="#cheat-sheet">
                  Get the Homeowners Cheat Sheet
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-border">
              <img
                src={heroHome}
                alt="Modern Nevada home at golden hour — homeowners insurance review"
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 text-primary-foreground md:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Most-requested guide
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  The 1-page homeowners policy cheat sheet
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  Dwelling vs. market value, the 6 sections of every policy, and the endorsements
                  most agents forget to mention.
                </p>
              </div>
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

      {/* CHEAT SHEET LEAD MAGNET */}
      <Section id="cheat-sheet" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Free download · Resource 1</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Homeowners Insurance Cheat Sheet
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Download the quick 2-page guide that shows what most homeowners policies include,
              what is not automatically covered, and the gaps that cause the biggest surprises
              during a claim.
            </p>
            <ul className="mt-8 space-y-3">
              {(cheatSheet?.bullets_en ?? [
                "Dwelling vs market value explained",
                "The 6 sections of every homeowners policy",
                "Endorsements most agents skip",
                "Liability limits + when an umbrella makes sense",
                "Renewal review checklist",
              ]).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Get the Cheat Sheet</h3>
                  <p className="text-xs text-muted-foreground">2-page PDF · delivered instantly.</p>
                </div>
              </div>
              <div className="mt-6">
                <HomeownersLeadForm
                  leadMagnetId={cheatSheet?.id}
                  leadMagnetSlug="homeowners-cheat-sheet"
                  resourceName="Homeowners Insurance Cheat Sheet"
                  thankYouSlug="homeowners-cheat-sheet"
                  ctaLabel="Get the Cheat Sheet"
                  leadSource="homeowners-cheat-sheet"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EBOOK LEAD MAGNET */}
      <Section id="ebook">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Get the Ebook</h3>
                  <p className="text-xs text-muted-foreground">Full coverage guide · PDF.</p>
                </div>
              </div>
              <div className="mt-6">
                <HomeownersLeadForm
                  leadMagnetId={ebook?.id}
                  leadMagnetSlug="homeowners-ebook"
                  resourceName="Complete Homeowners Coverage Guide"
                  thankYouSlug="homeowners-ebook"
                  ctaLabel="Get the Ebook"
                  leadSource="homeowners-ebook"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Free download · Resource 2</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Complete Homeowners Coverage Guide
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Want the deeper version? Download the full guide to better understand coverage
              limits, exclusions, endorsements, rebuild cost, liability, and renewal review
              questions.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {(ebook?.bullets_en ?? [
                "Coverage limits explained line-by-line",
                "Exclusions most homeowners miss",
                "Endorsements that close real gaps",
                "Rebuild cost vs market value math",
                "Liability stacking & umbrella playbook",
                "Renewal review question list",
              ]).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* QUIZ */}
      <Section tone="cream">
        <SectionHeading
          align="center"
          eyebrow="Interactive"
          title="5-question coverage check"
          intro="A 90-second self-assessment. No email required. See where your homeowners policy may have gaps before your next renewal."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <Quiz />
        </div>
      </Section>

      {/* VIDEO */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Watch"
          title="Homeowners insurance, explained in 4 minutes"
          intro="A short walk-through of the six sections of every homeowners policy and the most common gaps we see in Nevada and Colorado."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-ink shadow-lift">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url(${heroHome})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-primary-foreground">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-gold-foreground shadow-gold">
                <PlayCircle className="h-8 w-8" />
              </span>
              <p className="mt-6 font-display text-2xl leading-tight md:text-3xl">
                Video walkthrough — coming soon
              </p>
              <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
                In the meantime, grab the cheat sheet or book a 20-minute live walk-through with an advisor.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a href="#cheat-sheet">Get the cheat sheet</a>
                </Button>
                <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/book">Book a live walkthrough</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ FUNNEL */}
      {faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Knowledge base"
            title="Homeowners questions, organized as a funnel"
            intro="Start with the basics, go deeper, and finish with the action steps. Every answer connects to the next stage."
          />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/faq">
                Browse the full knowledge base
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}

      {/* FINAL CTA */}
      <CTASection
        title="Get a homeowners coverage review — free, 20 minutes."
        subtitle="An advisor walks you through your current policy line by line. No quote required, no pressure. Just clarity on what you own and what you might be missing."
        primaryLabel="Book a Free Coverage Review"
        secondaryLabel="Get the Cheat Sheet"
        secondaryHref="/personal/homeowners-insurance#cheat-sheet"
      />
    </>
  );
}
