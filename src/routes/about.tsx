import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { pageHead, orgJsonLd } from "@/lib/seo";
import { ShieldCheck, GraduationCap, Languages, ScrollText } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => pageHead({
    title: "About XPRT Insurance — Independent NV & CO Agency",
    description: "Independent insurance agency built on clarity, education, and bilingual service. Specializing in personal, commercial, bonds, and Nevada dealerships.",
    path: "/about",
    jsonLd: orgJsonLd(),
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About" }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              An independent agency built on clarity.
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              XPRT Insurance is an independent agency licensed in Nevada and Colorado.
              We specialize in personal lines, commercial coverage, bonds, and Nevada
              dealership programs — but our specialty isn't a product. It's clarity.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our standard" title="Educate first. Sell never." />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-7">
            <p>
              Most insurance buyers don't know what's in their policy. They know the price and the
              carrier name. That's it. We think that's a problem worth solving.
            </p>
            <p>
              Every engagement starts with education. We walk through the declarations page line by
              line. We explain replacement cost, additional insured, UM/UIM, primary and
              noncontributory — every term that matters. Then, only then, do we talk about quotes.
            </p>
            <p>
              The result is clients who understand exactly what they own and why. That's what we
              mean by clarity-first.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="What we stand for" title="Four standards. Every engagement." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Independent", b: "Multiple A-rated carriers. We work for you, not them." },
            { icon: GraduationCap, t: "Educational", b: "Clear language. No jargon. Real explanations." },
            { icon: ScrollText, t: "Bonds specialists", b: "Surety, license & permit, contractor, dealer bonds." },
            { icon: Languages, t: "Bilingual", b: "Same advisory standard in English and Español." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-7">
              <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
