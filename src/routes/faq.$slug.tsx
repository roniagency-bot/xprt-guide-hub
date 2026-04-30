import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { getFaq } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

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
      title: f.meta_title ?? `${f.question_en} | XPRT Insurance`,
      description: f.meta_description ?? f.short_answer_en,
      path,
      type: "article",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Knowledge Base", path: "/faq" },
          { name: f.question_en, path },
        ]),
        faqPageJsonLd([{ question: f.question_en, answer: f.long_answer_en ?? f.short_answer_en }]),
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
  const { faq, related } = Route.useLoaderData();
  const lm = (faq as unknown as { lead_magnets?: { slug: string; title_en: string } | null }).lead_magnets;

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Knowledge Base", path: "/faq" },
            { name: faq.question_en },
          ]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>{faq.funnel_stage === "tofu" ? "Start here" : faq.funnel_stage === "mofu" ? "Go deeper" : "Ready to act"}</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.1] md:text-5xl">{faq.question_en}</h1>
          <p
            className={`mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl${faq.is_speakable ? " speakable" : ""}`}
          >
            {faq.short_answer_en}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="prose prose-lg max-w-none lg:col-span-8">
            {faq.long_answer_en && (
              <div className="space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
                {faq.long_answer_en.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book">Book a Coverage Review</Link>
              </Button>
              {lm && (
                <Button asChild variant="outline">
                  <Link to="/offers/$slug" params={{ slug: lm.slug }}>
                    Free: {lm.title_en}
                  </Link>
                </Button>
              )}
            </div>
          </article>

          {related.length > 0 && (
            <aside className="lg:col-span-4">
              <h2 className="font-display text-xl">Related questions</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/faq/$slug"
                      params={{ slug: r.slug }}
                      className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold/50"
                    >
                      <span className="text-sm font-medium">{r.question_en}</span>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
