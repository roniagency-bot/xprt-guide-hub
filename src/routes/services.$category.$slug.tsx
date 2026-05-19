import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { BondCallout } from "@/components/site/BondCallout";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import type { GhlFormKey } from "@/lib/ghl-forms";
import { getServicePage } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/services/$category/$slug")({
  loader: async ({ params }) => {
    const data = await getServicePage({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const p = loaderData.page;
    const path = `/services/${params.category}/${params.slug}`;
    const jsonLd: Record<string, unknown>[] = [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: `/services/${params.category}` },
        { name: p.name_en, path },
      ]),
      serviceJsonLd({
        name: p.name_en,
        description: p.meta_description ?? p.hero_sub_en ?? "",
        path,
        areaServed: p.state_restriction ? [p.state_restriction] : undefined,
      }),
    ];
    if (loaderData.faqs.length > 0) {
      jsonLd.push(
        faqPageJsonLd(
          loaderData.faqs.map((f: any) => ({ question: f.question_en, answer: f.short_answer_en })),
        ),
      );
    }
    return pageHead({
      title: p.meta_title ?? `${p.name_en} | XPRT Insurance`,
      description: p.meta_description ?? p.hero_sub_en ?? "",
      path,
      jsonLd,
    });
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">Service not found</h1>
    </div>
  ),
});

function ServicePage() {
  const { page, faqs, lead_magnets } = Route.useLoaderData();
  const params = Route.useParams();

  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[
            { name: "Home", path: "/" },
            { name: "Services", path: `/services/${params.category}` },
            { name: page.name_en },
          ]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-4xl">
            <Eyebrow>{page.name_en}</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              {page.hero_headline_en ?? page.name_en}
            </h1>
            {page.hero_sub_en && (
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                {page.hero_sub_en}
              </p>
            )}
            {page.state_restriction && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm">
                <MapPin className="h-4 w-4 text-gold" /> {page.state_restriction === "NV" ? "Nevada only" : page.state_restriction}
              </div>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book">Book a Review</Link>
              </Button>
              {lead_magnets[0] && (
                <Button asChild size="lg" variant="outline">
                  <Link to="/offers/$slug" params={{ slug: lead_magnets[0].slug }}>
                    Free: {lead_magnets[0].title_en}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {!page.body_en && (
        <Section>
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <Eyebrow>In-depth guide coming soon</Eyebrow>
            <h2 className="mt-4 font-display text-3xl">We're building out this page</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our advisors can already walk you through {page.name_en.toLowerCase()} today —
              the written guide and FAQ articles for this coverage are publishing soon.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book">Book a Review</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Ask a question</Link>
              </Button>
            </div>
          </div>
        </Section>
      )}

      {page.body_en && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading eyebrow="Overview" title="What you should know" />
              <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {page.body_en}
              </p>
            </div>
            <aside className="space-y-5 lg:col-span-4">
              {page.who_its_for_en && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg">Who it's for</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{page.who_its_for_en}</p>
                </div>
              )}
              {page.what_it_covers_en && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg">What it covers</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{page.what_it_covers_en}</p>
                </div>
              )}
              {page.common_mistakes_en && (
                <div className="rounded-xl border border-gold/40 bg-gold/5 p-6">
                  <h3 className="font-display text-lg">Common mistakes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{page.common_mistakes_en}</p>
                </div>
              )}
            </aside>
          </div>
        </Section>
      )}

      {params.category === "dealership" && (
        <Section>
          <BondCallout />
        </Section>
      )}

      {faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Knowledge base"
            title="Common questions"
            intro="Educational answers, organized by where you are in the process."
          />
          <div className="mt-10">
            <FaqAccordion
              items={faqs.map((f: any) => ({
                slug: f.slug,
                question: f.question_en,
                short_answer: f.short_answer_en,
                funnel_stage: f.funnel_stage as "tofu" | "mofu" | "bofu",
              }))}
            />
          </div>
        </Section>
      )}

      <CTASection />
    </>
  );
}
