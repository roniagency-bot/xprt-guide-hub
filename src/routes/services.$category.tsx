import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { getCategoryHub } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/services/$category")({
  loader: async ({ params }) => {
    const data = await getCategoryHub({ data: { slug: params.category } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const c = loaderData.category;
    return pageHead({
      title: c.meta_title ?? `${c.name_en} | XPRT Insurance`,
      description: c.meta_description ?? c.description_en ?? "",
      path: `/services/${params.category}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: c.name_en, path: `/services/${params.category}` },
      ]),
    });
  },
  component: CategoryHub,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <Link to="/" className="mt-4 inline-block text-gold underline">Back home</Link>
    </div>
  ),
});

function CategoryHub() {
  const { category, services, lead_magnets } = Route.useLoaderData();
  const isNvOnly = category.state_restriction === "NV";

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: category.name_en }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>{category.line.toUpperCase()} · Coverage</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">{category.name_en}</h1>
            {category.tagline_en && (
              <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">{category.tagline_en}</p>
            )}
            {category.description_en && (
              <p className="mt-4 text-pretty text-base text-muted-foreground">{category.description_en}</p>
            )}
            {isNvOnly && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-gold" /> Available for licensed Nevada dealerships only
              </div>
            )}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Coverages" title={`${category.name_en} services`} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 && (
            <p className="text-muted-foreground">More services coming soon. Book a review to discuss your needs.</p>
          )}
          {services.map((s: any) => (
            <Link
              key={s.id}
              to="/services/$category/$slug"
              params={{ category: category.slug, slug: s.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
            >
              <h3 className="font-display text-2xl leading-tight">{s.name_en}</h3>
              {s.hero_sub_en && <p className="mt-3 text-sm text-muted-foreground">{s.hero_sub_en}</p>}
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {lead_magnets.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow="Free guides" title="Educational resources" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lead_magnets.map((lm: any) => (
              <Link
                key={lm.id}
                to="/offers/$slug"
                params={{ slug: lm.slug }}
                className="group rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-gold">Free guide</span>
                <h3 className="mt-3 font-display text-xl leading-tight">{lm.title_en}</h3>
                {lm.subtitle_en && <p className="mt-2 text-sm text-muted-foreground">{lm.subtitle_en}</p>}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Download <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection />
    </>
  );
}
