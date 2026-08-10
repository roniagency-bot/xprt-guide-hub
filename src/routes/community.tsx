import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback } from "react";
import {
  Music,
  MapPin,
  CalendarDays,
  Gift,
  ArrowRight,
  Heart,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import {
  COMMUNITY_FORM_ID,
  COMMUNITY_FORM_HEIGHT,
  GIVEAWAY_TERMS,
  currentEvent,
  upcomingEvents,
} from "@/lib/community-events";
import { pageHead, canonical, orgJsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";

const PATH = "/community";
const TITLE = "Community Events & Giveaways | XPRT Insurance";
const DESCRIPTION =
  "XPRT Insurance proudly supports Colorado local music, artists and small businesses. See our current sponsored event at Novel RiNo in Denver and enter the community giveaway.";

export const Route = createFileRoute("/community")({
  head: () => {
    const ev = currentEvent();
    const eventLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: ev.name,
      description: ev.description,
      url: canonical(PATH),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: ev.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Denver",
          addressRegion: "CO",
          addressCountry: "US",
        },
      },
      sponsor: { "@id": `${SITE.url}/#org` },
    };
    if (ev.startDateIso) eventLd.startDate = ev.startDateIso;
    return pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: PATH,
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Community Events", path: PATH },
        ]),
        eventLd,
      ],
    });
  },
  component: CommunityPage,
});

const SERVICE_LINKS = [
  {
    label: "Personal Insurance",
    blurb: "Home, auto, renters, landlord.",
    to: "/services/$category" as const,
    params: { category: "personal" },
  },
  {
    label: "Business Insurance",
    blurb: "General liability, property, workers' comp.",
    to: "/services/$category" as const,
    params: { category: "commercial" },
  },
  { label: "Surety Bonds", blurb: "Dealer, license & permit, notary, title.", to: "/bonds" as const },
  { label: "Life Insurance", blurb: "Protect the people who count on you.", to: "/contact" as const },
  { label: "Health / Medicare", blurb: "Coverage guidance, no pressure.", to: "/contact" as const },
];

function CommunityPage() {
  const ev = currentEvent();
  const upcoming = upcomingEvents();

  const scrollToGiveaway = useCallback(() => {
    const el = document.getElementById("giveaway");
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="container-prose relative py-14 md:py-24">
          <p className="text-sm font-medium tracking-wide text-primary-foreground/70">
            XPRT Insurance · A Roni Rivers Agency
          </p>
          <Eyebrow className="mt-6 text-gold">
            <Music className="h-3.5 w-3.5" aria-hidden /> Community Sponsor · Denver, CO
          </Eyebrow>
          <h1 className="mt-5 text-balance text-3xl leading-[1.08] md:text-5xl">
            XPRT Insurance Proudly Supports Colorado Local Music
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Welcome, and thanks for scanning. We're here for the artists on stage, the small
            businesses that host them, and the neighbors who show up. Enjoy the show — and enter our
            community giveaway while you're here.
          </p>

          {/* Event artwork slot */}
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center">
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Now sponsoring</p>
              <p className="mt-2 text-xl leading-snug md:text-2xl">{ev.name}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-primary-foreground/75">
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gold" aria-hidden /> {ev.dateTime}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" aria-hidden /> {ev.venue} · {ev.city}
                </li>
              </ul>
            </div>
            <EventArtwork src={ev.artwork} alt={`${ev.name} event artwork`} />
          </div>

          <div className="mt-9">
            <Button
              size="lg"
              onClick={scrollToGiveaway}
              className="btn-gold-shimmer h-14 w-full min-w-56 bg-gold-gradient text-base text-gold-foreground hover:bg-gold-gradient sm:w-auto"
            >
              <Gift className="mr-2 h-5 w-5" aria-hidden />
              Enter the Giveaway
            </Button>
            <p className="mt-3 text-sm text-primary-foreground/60">
              Takes under a minute · English &amp; Español
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT */}
      <Section tone="cream" id="event">
        <SectionHeading
          eyebrow="Featured event"
          title={ev.name}
          intro={ev.description}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="text-xl">Event details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Date &amp; time</dt>
                <dd className="text-foreground">{ev.dateTime}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Venue</dt>
                <dd className="text-foreground">{ev.venue}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="text-foreground">{ev.city}</dd>
              </div>
            </dl>
            {ev.eventUrl && (
              <a
                href={ev.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
              >
                <Ticket className="h-4 w-4 text-gold" aria-hidden /> Event info
              </a>
            )}
          </Reveal>

          {ev.artists.map((artist, i) => (
            <Reveal
              key={artist.name}
              delay={i === 0 ? 75 : 150}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <ArtistImage src={artist.image} alt={artist.name} />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Featured artist
                  </p>
                  <h3 className="mt-1 text-xl leading-snug">{artist.name}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Button
            size="lg"
            onClick={scrollToGiveaway}
            className="h-14 w-full text-base sm:w-auto"
          >
            <Gift className="mr-2 h-5 w-5" aria-hidden /> Enter the Giveaway
          </Button>
        </div>
      </Section>

      {/* GIVEAWAY */}
      <Section id="giveaway" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Giveaway"
          title="Enter the Community Giveaway 🎶"
          intro="Attendees can enter right here from their phone. Drop your info once, and we'll announce the winner after the event and reach out directly. One entry per person — no purchase necessary."
        />
        <div className="mt-8 rounded-2xl border border-border bg-cream-gradient p-3 md:p-6">
          {COMMUNITY_FORM_ID ? (
            <iframe
              title="Community Events Giveaway Entry"
              src={`https://link.xprtinsurance.com/widget/form/${COMMUNITY_FORM_ID}?utm_source=community&utm_medium=qr&utm_content=novel-rino`}
              loading="lazy"
              className="block w-full rounded-xl bg-background"
              style={{ height: COMMUNITY_FORM_HEIGHT, border: 0 }}
            />
          ) : (
            <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-gold/60 bg-background p-8 text-center">
              <div>
                <Sparkles className="mx-auto h-6 w-6 text-gold" aria-hidden />
                <p className="mt-3 text-base font-medium text-foreground">
                  Giveaway form embed area
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Add your GoHighLevel “Community Events” form ID to
                  <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">
                    COMMUNITY_FORM_ID
                  </code>
                  and the live form appears here.
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{GIVEAWAY_TERMS.en}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{GIVEAWAY_TERMS.es}</p>
      </Section>

      {/* MEET XPRT */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Meet XPRT Insurance"
          title="A local, bilingual independent agency"
          intro="We're XPRT Insurance, A Roni Rivers Agency — an independent agency licensed in Colorado and Nevada. We compare options across carriers, explain things in plain language, and we're here in English and Español. No pressure, ever."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINKS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 75 : 150}>
              <Link
                to={s.to}
                params={"params" in s ? (s.params as never) : undefined}
                className="flex min-h-24 items-start justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-gold"
              >
                <span>
                  <span className="block text-base font-medium text-foreground">{s.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.blurb}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Hablamos español —{" "}
          <Link to="/es" className="font-medium text-foreground underline underline-offset-4">
            ver el sitio en español
          </Link>
          .
        </p>
      </Section>

      {/* COMMUNITY */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <Heart className="mx-auto h-6 w-6 text-gold" aria-hidden />
          <p className="mt-6 text-balance text-2xl leading-snug md:text-4xl">
            “Insurance is what we do. Community is who we serve.”
          </p>
          <p className="mt-6 text-pretty text-base leading-relaxed text-primary-foreground/75">
            We sponsor local musicians, entrepreneurs, small businesses and neighborhood events
            across Colorado and Nevada. When the people around us grow, we all do better — so we
            show up, sponsor the night, and keep the mic on.
          </p>
        </div>
      </Section>

      {/* FUTURE EVENTS */}
      <Section id="upcoming">
        <SectionHeading
          eyebrow="Upcoming"
          title="More community events"
          intro={
            upcoming.length > 0
              ? "Here's where you'll find us next."
              : "Our next sponsored events will be announced here. Follow along or ask us at the show."
          }
        />
        {upcoming.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {upcoming.map((e, i) => (
              <Reveal as="li" key={e.id} delay={i === 0 ? 0 : 75}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-lg leading-snug">{e.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {e.dateTime} · {e.venue}, {e.city}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}

function EventArtwork({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="eager"
        className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
      />
    );
  }
  return (
    <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border border-dashed border-gold/50 bg-primary-foreground/5 p-6 text-center">
      <p className="text-sm text-primary-foreground/70">
        Event flyer / artist artwork goes here
      </p>
    </div>
  );
}

function ArtistImage({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
    );
  }
  return (
    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border border-dashed border-gold/50 bg-secondary">
      <Music className="h-5 w-5 text-gold" aria-hidden />
    </div>
  );
}
