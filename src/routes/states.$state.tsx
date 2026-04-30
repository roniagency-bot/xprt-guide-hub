import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { getStateData } from "@/server/content.functions";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

const STATES = {
  nevada: { code: "NV" as const, name: "Nevada", tagline: "Personal, commercial, bonds, and dealerships." },
  colorado: { code: "CO" as const, name: "Colorado", tagline: "Personal and commercial insurance done right." },
};

export const Route = createFileRoute("/states/$state")({
  loader: async ({ params }) => {
    const cfg = STATES[params.state as keyof typeof STATES];
    if (!cfg) throw notFound();
    const data = await getStateData({ data: { state: cfg.code } });
    return { cfg, ...data };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return pageHead({
      title: `${loaderData.cfg.name} Insurance | XPRT Insurance`,
      description: `Insurance coverage for ${loaderData.cfg.name} residents and businesses. ${loaderData.cfg.tagline}`,
      path: `/states/${params.state}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: loaderData.cfg.name, path: `/states/${params.state}` },
      ]),
    });
  },
  component: StateHub,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">State not found</h1>
      <Link to="/" className="mt-4 inline-block text-gold underline">Back home</Link>
    </div>
  ),
});

function StateHub() {
  const { cfg, rules } = Route.useLoaderData();
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: cfg.name }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <Eyebrow>{cfg.name} · Coverage</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
            Insurance built for {cfg.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{cfg.tagline}</p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="State rules & notes" title={`What ${cfg.name} requires`} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {rules.length === 0 && <p className="text-muted-foreground">More state notes coming soon.</p>}
          {rules.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-7 shadow-elegant">
              <h3 className="font-display text-xl">{r.topic}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body_en}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
