import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/Section";
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
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="tel:+17020000000">
                  <Phone className="mr-1.5 h-4 w-4" /> Call to book
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Send us a message</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-elegant">
              <Calendar className="mx-auto h-10 w-10 text-gold" />
              <h2 className="mt-5 font-display text-2xl">Scheduler will appear here</h2>
              <p className="mt-3 text-muted-foreground">
                Embed your Calendly or Cal.com link in this card. Replace this placeholder with the
                provided embed snippet when ready.
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                In the meantime, calls go straight to our team.
              </p>
              <Link to="/faq" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold">
                Read while you wait <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
