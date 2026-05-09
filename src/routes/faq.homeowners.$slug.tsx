import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, Section } from "@/components/site/Section";
import { breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import {
  getHomeownersFaq,
  getHomeownersFaqs,
  getRelatedTofu,
  type HomeownersFaq,
} from "@/lib/homeowners-faqs";

const DEFAULT_WHAT_TO_REVIEW = [
  "Coverage limits — dwelling, personal property, loss of use, and liability",
  "Deductibles — base deductible plus any separate wind, hail, or roof deductible",
  "Exclusions — what the policy form specifically does not cover",
  "Endorsements — added or removed coverages that change how a claim is handled",
  "Renewal changes — premium, limits, deductibles, or carrier rule updates from year to year",
];

const NV_CO_DISCLAIMER =
  "Coverage can vary by state, carrier, underwriting, endorsements, and policy language. This information is educational and is not legal advice or a guarantee of coverage. Always confirm details with your specific policy and licensed advisor.";

export const Route = createFileRoute("/faq/homeowners/$slug")({
  beforeLoad: ({ params }) => {
    if (!getHomeownersFaq(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const faq = getHomeownersFaq(params.slug);
    if (!faq) return {};
    const path = `/faq/homeowners/${faq.slug}`;
    return pageHead({
      title: `${faq.question} | XPRT Insurance`,
      description: faq.metaDescription,
      path,
      locale: "en",
      alternates: {
        en: `/faq/homeowners/${faq.slug}`,
        es: `/es/faq/homeowners/${faq.slug}`,
      },
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Center", path: "/faq" },
          { name: "Homeowners Insurance", path: "/faq/homeowners" },
          { name: faq.question, path },
        ]),
        faqPageJsonLd([
          {
            question: faq.question,
            answer: `${faq.shortAnswer} ${faq.paragraphs.join(" ")}`,
          },
        ]),
      ],
    });
  },
  component: HomeownersFaqPage,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">FAQ not found</h1>
      <Link to="/faq" className="mt-4 inline-block text-gold underline">
        Back to Knowledge Base
      </Link>
    </div>
  ),
});

const STAGE_LABEL = { tofu: "Understanding the Basics", mofu: "Coverage & Cost Details", bofu: "Ready for a Coverage Review?" } as const;

function HomeownersFaqPage() {
  const { slug } = Route.useParams();
  const faq = getHomeownersFaq(slug)!;
  const goDeeper = getHomeownersFaqs(faq.goDeeper).slice(0, 2);
  const readyToAct = getHomeownersFaq(faq.readyToAct);
  const relatedTofu = getHomeownersFaqs(getRelatedTofu(slug, 2));
  const whatToReview = faq.whatToReview ?? DEFAULT_WHAT_TO_REVIEW;

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Knowledge Center", path: "/faq" },
              { name: "Homeowners Insurance", path: "/faq/homeowners" },
              { name: faq.question },
            ]}
          />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{STAGE_LABEL[faq.stage]}</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.08] md:text-5xl">{faq.question}</h1>
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl space-y-12 text-base leading-relaxed text-foreground/85 md:text-lg">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Short answer</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground md:text-xl">
              {faq.shortAnswer}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">What this means</h2>
            <div className="mt-4 space-y-4">
              {faq.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {faq.bullets && (
              <ul className="mt-5 space-y-3 rounded-xl border border-border bg-card p-6">
                {faq.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">Nevada &amp; Colorado note</h2>
            {faq.stateContext && <p className="mt-4">{faq.stateContext}</p>}
            <p className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-relaxed md:text-base">
              {NV_CO_DISCLAIMER}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">What to review</h2>
            <ul className="mt-4 space-y-3 rounded-xl border border-border bg-card p-6">
              {whatToReview.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl">Next step</h2>
            <p className="mt-4">
              Use the homeowners cheat sheet to walk through your policy on your own, or book a
              short coverage review with an advisor for a guided look at limits, deductibles,
              exclusions, and endorsements.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
                  Download the Homeowners Cheat Sheet
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/book">Book Your Free Coverage Review</Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          {relatedTofu.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Related basics</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {relatedTofu.map((item) => (
                  <RelatedLink key={item.slug} faq={item} />
                ))}
              </ul>
            </div>
          )}
          {goDeeper.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Coverage & Cost Details</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {goDeeper.map((item) => (
                  <RelatedLink key={item.slug} faq={item} />
                ))}
              </ul>
            </div>
          )}
          {readyToAct && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Ready for a Coverage Review?</p>
              <ul className="grid gap-3">
                <RelatedLink faq={readyToAct} />
              </ul>
            </div>
          )}
        </div>
      </Section>

      <CTASection
        primaryLabel="Book Your Free Coverage Review"
        secondaryLabel="Download the Homeowners Cheat Sheet"
        secondaryHref="/offers/homeowners-cheat-sheet"
      />
    </>
  );
}

function RelatedLink({ faq }: { faq: HomeownersFaq }) {
  return (
    <li>
      <Link
        to="/faq/homeowners/$slug"
        params={{ slug: faq.slug }}
        className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
      >
        <span className="font-display text-base leading-snug">{faq.question}</span>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}
