import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getFaqHub } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";
import { HOMEOWNERS_FAQ_PREVIEWS } from "@/lib/homeowners-faqs";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  loader: () => getFaqHub(),
  head: () => pageHead({
    title: "Insurance Knowledge Base — FAQs | XPRT Insurance",
    description: "Educational answers about home, auto, commercial, bonds, and dealership insurance — organized by funnel stage so you can build coverage knowledge step by step.",
    path: "/faq",
    jsonLd: breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Knowledge Base", path: "/faq" },
    ]),
  }),
  component: FaqHub,
});

const STAGE_ORDER = ["tofu", "mofu", "bofu"] as const;
const STAGE_LABEL = { tofu: "Start here", mofu: "Go deeper", bofu: "Ready to act" };

function FaqHub() {
  const { categories, items } = Route.useLoaderData();

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Knowledge Base" }]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>Knowledge base</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
            Insurance, explained <span className="italic text-muted-foreground">simply.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Educational answers organized by funnel stage. Start with the basics, then go deeper.
          </p>
        </div>
      </section>

      <Section>
        {categories.length === 0 && (
          <p className="text-muted-foreground">More articles coming soon.</p>
        )}
        <div className="space-y-16">
          <div id="homeowners-insurance-faqs">
            <SectionHeading eyebrow="Homeowners" title="Homeowners insurance questions" />
            <div className="mt-8 space-y-8">
              {STAGE_ORDER.map((stage) => {
                const stageItems = HOMEOWNERS_FAQ_PREVIEWS.filter((i) => i.funnel_stage === stage);
                if (stageItems.length === 0) return null;
                return (
                  <div key={stage}>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">{STAGE_LABEL[stage]}</p>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {stageItems.map((f) => (
                        <li key={f.slug}>
                          <Link to="/faq/homeowners/$slug" params={{ slug: f.slug }} className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50">
                            <span className="font-display text-lg leading-tight text-foreground">{f.question_en}</span>
                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {categories.map((cat: any) => {
            if (cat.slug === "homeowners-insurance-faqs") return null;
            const catItems = items.filter((i: any) => i.category_id === cat.id);
            if (catItems.length === 0) return null;
            return (
              <div key={cat.id}>
                <SectionHeading eyebrow={cat.name_en} title={cat.description_en ?? cat.name_en} />
                <div className="mt-8 space-y-8">
                  {STAGE_ORDER.map((stage) => {
                    const stageItems = catItems.filter((i: any) => i.funnel_stage === stage);
                    if (stageItems.length === 0) return null;
                    return (
                      <div key={stage}>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
                          {STAGE_LABEL[stage]}
                        </p>
                        <ul className="grid gap-3 md:grid-cols-2">
                          {stageItems.map((f: any) => (
                            <li key={f.id}>
                              <Link
                                to="/faq/$slug"
                                params={{ slug: f.slug }}
                                className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                              >
                                <span className="font-display text-lg leading-tight text-foreground">{f.question_en}</span>
                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
