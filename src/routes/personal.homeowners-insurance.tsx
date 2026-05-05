import { useMemo, useState } from "react";
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
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";
import { HomeownersLeadForm } from "@/components/site/HomeownersLeadForm";
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

const QUIZ_QUESTIONS = [
  {
    q: "Do you know whether your policy is replacement cost or actual cash value?",
    yes: "You're ahead of most homeowners.",
    no: "Most claims pay 30–60% less under ACV. Worth a 5-minute check.",
  },
  {
    q: "Is your dwelling limit based on rebuild cost — not market value?",
    yes: "Good. That's the #1 mis-set field on a homeowners policy.",
    no: "Market value isn't rebuild cost. This is the most common gap we find.",
  },
  {
    q: "Do you have water backup and ordinance-or-law endorsements?",
    yes: "You're protected against the two most common claim denials.",
    no: "Both are inexpensive add-ons that close real gaps.",
  },
  {
    q: "Do you carry $300K+ in personal liability (or an umbrella)?",
    yes: "Solid foundation for asset protection.",
    no: "Liability claims are the ones that wipe out savings. Consider an umbrella.",
  },
  {
    q: "Have you reviewed your policy in the last 12 months?",
    yes: "You're doing what 80% of homeowners don't.",
    no: "Rebuild costs and rates have shifted a lot. Time for a review.",
  },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<("yes" | "no")[]>([]);
  const isDone = step >= QUIZ_QUESTIONS.length;

  const score = useMemo(() => answers.filter((a) => a === "yes").length, [answers]);

  function answer(value: "yes" | "no") {
    setAnswers((prev) => [...prev, value]);
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  if (isDone) {
    const verdict =
      score >= 4
        ? "Strong foundation. A renewal review is still worth it."
        : score >= 2
          ? "A few gaps worth closing before your next renewal."
          : "Significant exposure. A 20-minute review will pay for itself.";
    return (
      <div className="rounded-2xl border border-border bg-card p-7 shadow-elegant md:p-10">
        <Eyebrow>Your result</Eyebrow>
        <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">
          {score} / {QUIZ_QUESTIONS.length} coverage signals look solid.
        </p>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">{verdict}</p>
        <ul className="mt-6 space-y-3">
          {QUIZ_QUESTIONS.map((q, i) => (
            <li key={q.q} className="flex items-start gap-3 text-sm">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 shrink-0 ${answers[i] === "yes" ? "text-gold" : "text-muted-foreground"}`}
              />
              <span className="text-foreground">
                <span className="font-medium">{q.q}</span>
                <span className="block text-muted-foreground">
                  {answers[i] === "yes" ? q.yes : q.no}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/book">
              Book a Free Coverage Review
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={reset}>
            <RefreshCcw className="mr-1.5 h-4 w-4" />
            Retake quiz
          </Button>
        </div>
      </div>
    );
  }

  const current = QUIZ_QUESTIONS[step];
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-elegant md:p-10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span className="text-gold">Coverage check</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>
      <p className="mt-6 font-display text-2xl leading-tight md:text-3xl">{current.q}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button size="lg" onClick={() => answer("yes")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Yes
        </Button>
        <Button size="lg" variant="outline" onClick={() => answer("no")}>
          Not sure / No
        </Button>
      </div>
    </div>
  );
}

function HomeownersHub() {
  const { page, cheatSheet } = Route.useLoaderData();
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
            <Eyebrow>Free download</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              The Homeowners Insurance Cheat Sheet
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              A one-page advisor's guide to the policy you already own (or are about to buy).
              Skim it before your next renewal, claim, or quote.
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
                  <h3 className="font-display text-xl leading-tight">Get the cheat sheet</h3>
                  <p className="text-xs text-muted-foreground">Delivered instantly — no spam.</p>
                </div>
              </div>
              <div className="mt-6">
                <LeadCaptureForm
                  leadMagnetId={cheatSheet?.id}
                  leadMagnetSlug="homeowners-cheat-sheet"
                  categoryTag="homeowners-cheat-sheet"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EBOOK LEAD MAGNET */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-6 w-6" />
              </span>
              <p className="mt-6 font-display text-3xl leading-tight">
                "The Homeowners Coverage Playbook"
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold">Ebook · Coming soon</p>
              <p className="mt-5 text-base text-muted-foreground">
                A 30-page guide written for Nevada and Colorado homeowners — covering rebuild cost,
                wildfire exposure, water claims, liability layering, and how to read a declarations
                page like an underwriter.
              </p>
              <Button asChild className="mt-7 w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <a href="#cheat-sheet">
                  Join the waitlist via the cheat sheet
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Deeper dive</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              When you're ready to go deeper than a cheat sheet.
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Our upcoming ebook walks you through the structure of a homeowners policy the way an
              advisor would — section by section, endorsement by endorsement, with real Nevada and
              Colorado examples.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Rebuild cost vs. market value math",
                "Wildfire & wildfire-prone-zone underwriting",
                "Water damage: what's covered, what isn't",
                "Liability stacking & umbrella playbook",
                "How to read your declarations page",
                "Renewal & claims-time checklists",
              ].map((b) => (
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
