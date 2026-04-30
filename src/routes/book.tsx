import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Phone, Mail } from "lucide-react";
import { Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () => pageHead({
    title: "Book a Free Coverage Review | XPRT Insurance",
    description: "Book a free 20-minute coverage review with a licensed advisor. Educational, no obligation, bilingual.",
    path: "/book",
  }),
  component: Book,
});

function Book() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Book a Review" }]} />
        </div>
        <div className="container-prose grid gap-12 pb-20 pt-10 md:pb-28 md:pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Free 20-minute review</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Book a free coverage review.
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
              We'll walk through your declarations page line by line, identify gaps, and explain every
              section. No obligation. No pressure.
            </p>
            <ul className="mt-8 space-y-3 text-base">
              {[
                "20 minutes, by phone or video",
                "Bring your current declarations page",
                "Bilingual: English or Español",
                "Licensed in Nevada & Colorado",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-muted-foreground">
              Use the scheduler on the right to pick a time — it only takes a few seconds.
            </p>
          </div>

          <div className="lg:col-span-6">
            <p className="mb-4 text-center text-sm font-medium text-foreground md:text-base">
              Choose a time that works for you — takes less than 30 seconds.
            </p>
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-elegant ring-1 ring-gold/20">
              <Calendar className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-5 font-display text-2xl">Scheduler will appear here</h2>
              <p className="mt-3 text-muted-foreground">
                Embed your Calendly or Cal.com link in this card. Replace this placeholder with the
                provided embed snippet when ready.
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-border/60 bg-background/50 px-5 py-4 text-center text-sm text-muted-foreground">
              Prefer not to schedule online? You can also{" "}
              <a href="tel:+17020000000" className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold">
                <Phone className="h-3.5 w-3.5" /> call us
              </a>{" "}
              or{" "}
              <Link to="/contact" className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold">
                <Mail className="h-3.5 w-3.5" /> send a message
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
