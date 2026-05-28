import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({
    title: "Contact XPRT Insurance | Nevada & Colorado",
    description: "Reach the XPRT Insurance team. Bilingual service in Nevada and Colorado.",
    path: "/contact",
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact" }]} />
        </div>
        <div className="container-prose pb-16 pt-10 md:pb-20 md:pt-14">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">Let's talk coverage.</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Personal, commercial, bonds, dealership — reach out and we'll route you to the right advisor.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GhlFormButton form="contact" size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Send a Message
            </GhlFormButton>
            <GhlFormButton form="personal_quote" size="lg" variant="outline">
              Get a Quote
            </GhlFormButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          {[
            { icon: Phone, t: "Las Vegas Office", v: "(725) 344-2211", action: "Call now", href: "tel:+17253442211" },
            { icon: Mail, t: "Email", v: SITE.email, action: "Send email", href: `mailto:${SITE.email}` },
            { icon: MapPin, t: "Service Area", v: "Nevada & Colorado", action: "Browse Nevada", href: "/states/nevada" },
            { icon: Clock, t: "Hours", v: "Mon–Fri · 9am–6pm PT", action: "Book a review", href: "/book" },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-7 shadow-elegant">
              <c.icon className="h-5 w-5 text-gold" />
              <h3 className="mt-4 font-display text-xl">{c.t}</h3>
              <p className="mt-2 text-muted-foreground">{c.v}</p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href={c.href}>{c.action}</a>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
