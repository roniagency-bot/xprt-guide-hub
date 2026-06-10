import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";
import { BondCallout } from "@/components/site/BondCallout";
import { getLeadMagnet } from "@/lib/content.functions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/offers/$slug")({
  loader: async ({ params }) => {
    const data = await getLeadMagnet({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return pageHead({
      title: loaderData.meta_title ?? `${loaderData.title_en} | XPRT Insurance`,
      description: loaderData.meta_description ?? loaderData.subtitle_en ?? "",
      path: `/offers/${params.slug}`,
    });
  },
  component: OfferPage,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <h1 className="font-display text-4xl">Offer not found</h1>
      <Link to="/" className="mt-4 inline-block text-gold underline">Back home</Link>
    </div>
  ),
});

function OfferPage() {
  const lm = Route.useLoaderData();
  const haystack = `${lm.title_en ?? ""} ${lm.subtitle_en ?? ""} ${lm.description_en ?? ""} ${(lm.bullets_en ?? []).join(" ")} ${lm.slug ?? ""}`.toLowerCase();
  const mentionsBond = /\b(dealer|dealership|surety|bond|bonds|bonded|bonding)\b/.test(haystack);

  return (
    <section className="bg-cream-gradient">
      <div className="container-prose pt-10 md:pt-14">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Free Guides", path: "/" }, { name: lm.title_en }]} />
      </div>
      <div className="container-prose grid gap-12 pb-24 pt-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow>Free educational guide</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">{lm.title_en}</h1>
          {lm.subtitle_en && (
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">{lm.subtitle_en}</p>
          )}
          {lm.description_en && (
            <p className="mt-4 text-base text-muted-foreground">{lm.description_en}</p>
          )}
          {lm.bullets_en?.length > 0 && (
            <ul className="mt-8 space-y-3">
              {lm.bullets_en.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {mentionsBond && (
            <div className="mt-10">
              <BondCallout />
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lift md:p-8">
            <h2 className="font-display text-2xl leading-tight">Get the free guide</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Delivered instantly. No spam, ever.
            </p>
            <div className="mt-6">
              <LeadCaptureForm
                leadMagnetId={lm.id}
                leadMagnetSlug={lm.slug}
                categoryTag={lm.slug}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
