import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, Section } from "@/components/site/Section";
import { breadcrumbJsonLd, faqPageJsonLd, pageHead } from "@/lib/seo";
import { getHomeownersFaq, getHomeownersFaqs } from "@/lib/homeowners-faqs";

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
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Base", path: "/faq" },
          { name: "Homeowners", path: "/faq#homeowners-insurance-faqs" },
          { name: faq.question, path },
        ]),
        faqPageJsonLd([{ question: faq.question, answer: `${faq.shortAnswer} ${faq.paragraphs.join(" ")}` }]),
      ],
    });
  },
  component: HomeownersFaqPage,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">FAQ not found</h1>
      <Link to="/faq" className="mt-4 inline-block text-gold underline">Back to Knowledge Base</Link>
    </div>
  ),
});

const STAGE_LABEL = { tofu: "Start here", mofu: "Go deeper", bofu: "Ready to act" } as const;

function HomeownersFaqPage() {
  const { slug } = Route.useParams();
  const faq = getHomeownersFaq(slug)!;
  const goDeeper = getHomeownersFaqs(faq.goDeeper).slice(0, 2);
  const readyToAct = getHomeownersFaq(faq.readyToAct);

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Knowledge Base", path: "/faq" },
            { name: "Homeowners", path: "/faq#homeowners-insurance-faqs" },
            { name: faq.question },
          ]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{STAGE_LABEL[faq.stage]}</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.08] md:text-5xl">{faq.question}</h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {faq.shortAnswer}
          </p>
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg">
          {faq.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {faq.bullets && (
            <ul className="space-y-3 rounded-xl border border-border bg-card p-6">
              {faq.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{bullet}</li>)}
            </ul>
          )}
          {faq.stateContext && <p className="rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-relaxed md:text-base">{faq.stateContext}</p>}
          <p className="text-sm text-muted-foreground">
            This information is educational only. Actual coverage depends on your policy terms, carrier, endorsements, underwriting, and applicable Nevada or Colorado requirements.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>Download the Homeowners Cheat Sheet</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/book">Book Your Free Coverage Review</Link>
            </Button>
          </div>
        </article>

        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Go deeper</p>
            <ul className="grid gap-3 md:grid-cols-2">
              {goDeeper.map((item) => <RelatedLink key={item.slug} faq={item} />)}
            </ul>
          </div>
          {readyToAct && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Ready to act</p>
              <ul className="grid gap-3"><RelatedLink faq={readyToAct} /></ul>
            </div>
          )}
        </div>
      </Section>

      <CTASection primaryLabel="Book Your Free Coverage Review" secondaryLabel="Download the Homeowners Cheat Sheet" secondaryHref="/offers/homeowners-cheat-sheet" />
    </>
  );
}

function RelatedLink({ faq }: { faq: NonNullable<ReturnType<typeof getHomeownersFaq>> }) {
  return (
    <li>
      <Link to="/faq/homeowners/$slug" params={{ slug: faq.slug }} className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50">
        <span className="font-display text-base leading-snug">{faq.question}</span>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}