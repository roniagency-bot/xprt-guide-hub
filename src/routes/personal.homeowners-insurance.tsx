import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Home as HomeIcon,
  FileText,
  BookOpen,
  // PlayCircle removed
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
import { DwellingCalculator } from "@/components/site/DwellingCalculator";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { getServicePage, getLeadMagnet } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, orgJsonLd, canonical } from "@/lib/seo";
import heroHome from "@/assets/homeowners-hero.jpg";

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
    const title = "Homeowners Insurance in Nevada & Colorado | XPRT Insurance";
    const description =
      "Understand what homeowners insurance covers, what it may exclude, and how to review your policy before renewal or a claim. Licensed in Nevada and Colorado.";
    const jsonLd: Record<string, unknown>[] = [
      orgJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Personal", path: "/services/personal" },
        { name: "Homeowners Insurance", path },
      ]),
      serviceJsonLd({
        name: "Homeowners Insurance — Nevada & Colorado",
        description,
        path,
        areaServed: ["Nevada", "Colorado"],
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
      locale: "en",
      alternates: { en: path, es: "/es/personal/homeowners-insurance" },
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
              Homeowners Insurance in Nevada & Colorado — know what your policy covers before it matters.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Practical, educational homeowners insurance guidance for Nevada and Colorado homeowners —
              from Las Vegas and Reno to Denver and the Front Range. Understand your coverage, identify
              gaps, and know what to review before renewal or a claim.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GhlFormButton
                form="personal_quote"
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                Get a Homeowners Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </GhlFormButton>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Book a Free Coverage Review</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-border">
              <img
                src={heroHome}
                alt="Modern home in Nevada at golden hour with mountain backdrop"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
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

      {/* WHAT'S NOT COVERED */}
      <Section id="not-covered">
        <div className="mx-auto max-w-5xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <Eyebrow>Read this before the quiz</Eyebrow>
              <h2 className="mt-3 text-balance font-display text-3xl leading-tight md:text-4xl">
                What a standard homeowners policy does NOT cover
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground">
                These are the gaps that turn into the most expensive surprises after a claim.
                Each one can usually be solved — but only if you add the right endorsement or
                separate policy <em>before</em> the loss happens.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Flood",
                body:
                  "Excluded on every standard policy. Requires a separate NFIP or private flood policy — even outside FEMA-mapped flood zones.",
              },
              {
                title: "Earthquake",
                body:
                  "Excluded. Requires an earthquake endorsement or standalone policy. Critical for NV and CO foothills.",
              },
              {
                title: "Sewer / drain backup",
                body:
                  "Excluded by default. A water backup endorsement adds $5,000–$25,000 of coverage for a small premium.",
              },
              {
                title: "Mold",
                body:
                  "Usually capped at $5,000 even when the source is covered. Limit can be increased on most policies.",
              },
              {
                title: "Wear, tear & neglect",
                body:
                  "Gradual damage, deferred maintenance, and old roofs are excluded. Insurance covers sudden, accidental losses — not aging.",
              },
              {
                title: "Vacant home (30+ days)",
                body:
                  "Coverage narrows or disappears once a home is vacant. Requires a vacancy endorsement or a dwelling fire (DP) policy.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-background p-5"
              >
                <p className="font-display text-lg leading-tight text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Not sure which of these apply to your home?
            </p>
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/book">
                Book a Free Coverage Review
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* QUIZ */}
      <Section id="quiz" tone="cream">
        <SectionHeading
          align="center"
          eyebrow="Interactive quiz"
          title="Are You Properly Covered?"
          intro="Answer a few quick questions to see what areas of your homeowners policy may need a closer look."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <HomeownersQuiz cheatSheetSlug="homeowners-cheat-sheet" />
        </div>
      </Section>

      {/* DWELLING CALCULATOR */}
      <Section id="calculator">
        <SectionHeading
          align="center"
          eyebrow="Coverage calculator"
          title="How much dwelling coverage do you actually need?"
          intro="A 60-second estimate based on your square footage, location, and construction quality. Use it as a sanity check against the limit on your declarations page."
        />
        <div className="mx-auto mt-12 max-w-6xl">
          <DwellingCalculator />
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
            <video
              src="/videos/home-insurance-building-blocks.mp4"
              controls
              preload="metadata"
              poster={heroHome}
              className="h-full w-full object-cover"
            >
              Your browser does not support video playback.
            </video>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <a href="#cheat-sheet">Get the cheat sheet</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/book">Book a live walkthrough</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ FUNNEL */}
      {faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Knowledge base"
            title="Homeowners questions, organized clearly"
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

      {/* STATE GUIDES + E-E-A-T */}
      <Section id="state-guides">
        <SectionHeading
          eyebrow="Local guidance"
          title="Homeowners insurance by state"
          intro="Coverage needs differ by region. Wildfire exposure on the Front Range, hail in Denver, wind and roof age in Las Vegas, and rebuild-cost inflation across both states all change what a good policy looks like."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            to="/states/$state"
            params={{ state: "nevada" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Nevada homeowners</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Las Vegas, Henderson, North Las Vegas, Reno, and Sparks. Roof age, wind, and rebuild
              cost are the most common review points we see.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Nevada coverage guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            to="/states/$state"
            params={{ state: "colorado" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Colorado homeowners</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Denver, Aurora, Colorado Springs, Boulder, and the Front Range. Hail, wildfire
              exposure, and roof endorsements drive most of our policy reviews.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Colorado coverage guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "Licensed in Nevada & Colorado", icon: ShieldCheck },
            { label: "Independent agency", icon: HomeIcon },
            { label: "Bilingual service (EN/ES)", icon: BookOpen },
            { label: "Educational coverage reviews", icon: Calendar },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Educational disclaimer.</strong> This page is for
          educational purposes only and does not constitute insurance advice, a quote, or an offer
          of coverage. Actual coverage depends on your specific policy terms, carrier, endorsements,
          underwriting, and applicable Nevada or Colorado law. Always review your declarations page
          and speak with a licensed advisor before making changes. To request a personalized review,{" "}
          <Link to="/book" className="underline underline-offset-2">book a free coverage review</Link>{" "}
          or browse our <Link to="/faq" className="underline underline-offset-2">homeowners FAQ</Link>.
        </p>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        title="Get a homeowners coverage review — free, 20 minutes."
        subtitle="An advisor walks you through your current policy line by line. No quote required, no pressure. Just clarity on what you own and what you might be missing."
        primaryLabel="Get a Homeowners Quote"
        primaryForm="personal_quote"
        secondaryLabel="Get the Cheat Sheet"
        secondaryHref="/personal/homeowners-insurance#cheat-sheet"
      />
    </>
  );
}
