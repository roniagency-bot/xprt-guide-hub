import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Download, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLeadMagnet, getServicePage } from "@/server/content.functions";
import { pageHead } from "@/lib/seo";

import { BONDS_FAQ_PREVIEWS } from "@/lib/bonds-faqs";

export const Route = createFileRoute("/thank-you/$slug")({
  loader: async ({ params }) => {
    const lm = await getLeadMagnet({ data: { slug: params.slug } });
    if (!lm) throw notFound();
    let faqs: Array<{ slug: string; question_en: string; short_answer_en: string; faqType?: "homeowners" | "bonds" }> = [];
    if (params.slug.startsWith("homeowners-")) {
      const sp = await getServicePage({ data: { slug: "homeowners-insurance" } });
      faqs = (sp?.faqs ?? []).slice(0, 4).map((f: any) => ({
        slug: f.slug,
        question_en: f.question_en,
        short_answer_en: f.short_answer_en,
        faqType: "homeowners" as const,
      }));
    } else if (
      params.slug === "bond-quick-guide" ||
      params.slug === "complete-guide-to-surety-bonds" ||
      params.slug === "dealer-bond-bundle"
    ) {
      faqs = BONDS_FAQ_PREVIEWS.slice(0, 4).map((f) => ({
        slug: f.slug,
        question_en: f.question_en,
        short_answer_en: f.short_answer_en,
        faqType: "bonds" as const,
      }));
    }
    return { lm, faqs };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const base = pageHead({
      title: `Thank you — ${loaderData.lm.title_en} | XPRT Insurance`,
      description: "Your guide is ready. Thanks for trusting XPRT Insurance.",
      path: `/thank-you/${loaderData.lm.slug}`,
    });
    return {
      ...base,
      meta: [...(base.meta ?? []), { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: ThankYou,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <Link to="/" className="text-gold underline">Back home</Link>
    </div>
  ),
});

function ThankYou() {
  const { lm, faqs } = Route.useLoaderData();
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-balance font-display text-4xl md:text-5xl">
            Your guide is ready
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground md:text-lg">
            {lm.thank_you_message_en ??
              "Check your inbox in a few minutes. In the meantime, you can download it directly below."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={lm.asset_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="mr-1.5 h-4 w-4" /> Download {lm.title_en}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/book">
                Book a Free Coverage Review
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Want more?{" "}
            <Link
              to="/faq"
              className="text-foreground underline hover:text-gold"
            >
              Browse the knowledge base
            </Link>
            .
          </p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="container-prose py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 text-gold">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.2em]">
                  Related reading
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                While you're here — related questions
              </h2>
              <ul className="mt-8 grid gap-3">
                {faqs.map((f: { slug: string; question_en: string; short_answer_en: string; faqType?: "homeowners" | "bonds" }) => {
                  const inner = (
                    <>
                      <div>
                        <p className="font-display text-lg text-foreground">{f.question_en}</p>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{f.short_answer_en}</p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </>
                  );
                  const cls = "group flex items-start justify-between gap-6 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50";
                  return (
                    <li key={f.slug}>
                      {f.faqType === "bonds" ? (
                        <Link to="/faq/bonds/$slug" params={{ slug: f.slug }} className={cls}>{inner}</Link>
                      ) : f.faqType === "homeowners" ? (
                        <Link to="/faq/homeowners/$slug" params={{ slug: f.slug }} className={cls}>{inner}</Link>
                      ) : (
                        <Link to="/faq/$slug" params={{ slug: f.slug }} className={cls}>{inner}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
