import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/ui/kinetic-team-hybrid";
import { TEAM } from "@/data/team";
import { pageHead, orgJsonLd, teamPersonJsonLd, SITE } from "@/lib/seo";
import {
  ShieldCheck,
  GraduationCap,
  Languages,
  ScrollText,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => {
    const team = TEAM.map((m) =>
      teamPersonJsonLd({
        name: m.name,
        jobTitle: m.role,
        telephone: m.phone || undefined,
        email: m.email || undefined,
        worksLocation: m.location,
      }),
    );
    return pageHead({
      title: "About & Contact — XPRT Insurance | NV & CO",
      description:
        "Meet the XPRT Insurance team — bilingual advisors and producers in Las Vegas and Denver. Direct phones, emails, and offices for personal, commercial, bonds, and dealership coverage.",
      path: "/about",
      jsonLd: [orgJsonLd(), ...team],
    });
  },
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
            <Eyebrow>About & contact</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              An independent agency built on clarity.
            </h1>
            <p className="speakable mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              XPRT Insurance is an independent agency licensed in Nevada (NV DOI #3762886) and
              Colorado (CO DOI #759040). We specialize in personal lines, commercial coverage,
              bonds, and Nevada dealership programs — but our specialty isn't a product. It's
              clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#team">
                <Button variant="outline" size="lg">Meet the team</Button>
              </a>
              <a href="#contact">
                <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  Contact us
                </Button>
              </a>
            </div>
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

      {/* Team — kinetic 21st.dev component on ink surface */}
      <section id="team" className="scroll-mt-24">
        <TeamSection />
      </section>

      {/* Offices */}
      <Section id="offices">
        <SectionHeading
          eyebrow="Offices"
          title="Two states. One standard."
          intro="Stop by, call, or book a virtual review. Bilingual service at both locations."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SITE.addresses.map((a) => (
            <div key={a.addressLocality} className="rounded-xl border border-border bg-card p-7 shadow-elegant">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" />
                <h3 className="font-display text-xl">
                  {a.addressLocality}, {a.addressRegion}
                </h3>
              </div>
              <address className="mt-4 not-italic text-muted-foreground">
                <p>{a.streetAddress}</p>
                <p>
                  {a.addressLocality}, {a.addressRegion} {a.postalCode}
                </p>
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${a.telephone}`}>
                    <Phone className="mr-1.5 h-4 w-4" />
                    {formatPhone(a.telephone)}
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> Mon–Fri · 9am–6pm
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact / Book */}
      <Section id="contact" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Get in touch"
              title="Let's talk coverage."
              intro="Personal, commercial, bonds, dealership — reach out and we'll route you to the right advisor."
            />
            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 hover:text-gold"
              >
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4" />
                {formatPhone(SITE.phone)} · Main line
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
              <h3 className="font-display text-2xl">Send a message</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what you need covered — we'll respond within one business day.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <GhlFormButton
                  form="contact"
                  size="lg"
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  Send a Message
                </GhlFormButton>
                <GhlFormButton form="personal_quote" size="lg" variant="outline">
                  Get a Quote
                </GhlFormButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

/** +17253442211 → (725) 344-2211 */
function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "").replace(/^1/, "");
  if (digits.length !== 10) return e164;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
