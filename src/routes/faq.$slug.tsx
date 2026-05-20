import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { BondCallout } from "@/components/site/BondCallout";
import { getFaq } from "@/server/content.functions";
import { articleFaqJsonLd, brandedTitle, pageHead, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq/$slug")({
  loader: async ({ params }) => {
    const data = await getFaq({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const f = loaderData.faq;
    const path = `/faq/${params.slug}`;
    return pageHead({
      title: f.meta_title ?? brandedTitle(f.question_en),
      description: f.meta_description ?? f.short_answer_en,
      path,
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Base", path: "/faq" },
          { name: f.question_en, path },
        ]),
        faqPageJsonLd(
          [{ question: f.question_en, answer: f.long_answer_en ?? f.short_answer_en }],
          { path, locale: "en", speakableSelectors: [".speakable", "h1"] },
        ),
        articleFaqJsonLd({
          headline: f.question_en,
          description: f.meta_description ?? f.short_answer_en,
          path,
          locale: "en",
          speakableSelectors: [".speakable", "h1"],
        }),
      ],
    });
  },
  component: FaqDetail,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">Article not found</h1>
      <Link to="/faq" className="mt-4 inline-block text-gold underline">Back to knowledge base</Link>
    </div>
  ),
});

function FaqDetail() {
  const { faq, goDeeper, readyToAct } = Route.useLoaderData() as any;
  const categoryName = (faq as any).faq_categories?.name_en ?? "Knowledge Base";
  const categorySlug = (faq as any).faq_categories?.slug;

  const haystack = `${faq.question_en ?? ""} ${faq.short_answer_en ?? ""} ${faq.long_answer_en ?? ""}`.toLowerCase();
  const mentionsBond = /\b(dealer|dealership|surety|bond|bonds|bonded|bonding)\b/.test(haystack);

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Knowledge Base", path: "/faq" },
            { name: categoryName, path: categorySlug ? `/faq#${categorySlug}` : "/faq" },
            { name: faq.question_en },
          ]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{faq.funnel_stage === "tofu" ? "Understanding the Basics" : faq.funnel_stage === "mofu" ? "Coverage & Cost Details" : "Ready for a Coverage Review?"}</Eyebrow>
          <h1 className="speakable mt-5 text-balance text-4xl leading-[1.1] md:text-5xl">{faq.question_en}</h1>
          <p
            className={`mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl speakable${faq.is_speakable ? "" : ""}`}
          >
            {faq.short_answer_en}
          </p>
        </div>
      </section>

      <Section>
        <article className="prose prose-lg mx-auto max-w-3xl">
          {faq.long_answer_en && (
            <div className="space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
              {faq.long_answer_en.split("\n\n").map((p: string, i: number) => {
                // Render bullet blocks (lines starting with "- ")
                const lines = p.split("\n");
                if (lines.every((l) => l.trim().startsWith("- "))) {
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-6">
                      {lines.map((l, j) => <li key={j}>{l.replace(/^\s*-\s+/, "")}</li>)}
                    </ul>
                  );
                }
                return <p key={i}>{p}</p>;
              })}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/book">Book a Free Coverage Review</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/offers/$slug" params={{ slug: "homeowners-cheat-sheet" }}>
                Download the Homeowners Cheat Sheet
              </Link>
            </Button>
          </div>
        </article>

        {mentionsBond && (
          <div className="mx-auto mt-12 max-w-3xl">
            <BondCallout />
          </div>
        )}

        {(goDeeper.length > 0 || readyToAct.length > 0) && (
          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            {goDeeper.length > 0 && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Coverage & Cost Details</p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {goDeeper.map((r: any) => (
                    <li key={r.id}>
                      <Link
                        to="/faq/$slug"
                        params={{ slug: r.slug }}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                      >
                        <span className="font-display text-base leading-snug">{r.question_en}</span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {readyToAct.length > 0 && (
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">Ready for a Coverage Review?</p>
                <ul className="grid gap-3">
                  {readyToAct.map((r: any) => (
                    <li key={r.id}>
                      <Link
                        to="/faq/$slug"
                        params={{ slug: r.slug }}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                      >
                        <span className="font-display text-base leading-snug">{r.question_en}</span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Section>

      <CTASection />
    </>
  );
}
