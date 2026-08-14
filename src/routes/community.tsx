import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback } from "react";
import {
  Music,
  MapPin,
  CalendarDays,
  Clock,
  Gift,
  ArrowRight,
  Heart,
  Sparkles,
  Ticket,
  Phone,
  Shirt,
  Trophy,
  Sun,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import roniPhoto from "@/assets/team/veronica.png";
import beachBoujieFlyer from "@/assets/beach-boujie-flyer.png.asset.json";
import {
  GIVEAWAY_TERMS,
  GIVEAWAY_PRIZES,
  PRIZE_NOTE,
  currentEvent,
  upcomingEvents,
} from "@/lib/community-events";

import { pageHead, canonical, orgJsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";


const PATH = "/community";
const TITLE = "Beach & Boujie Summer Bash — XPRT Insurance Sponsor & Giveaway";
const DESCRIPTION =
  "XPRT Insurance is a proud sponsor of the Beach & Boujie Summer Bash Music Festival — Saturday, August 15, 2026 at NOVEL RiNo in Denver. Enter our community giveaway and reach our bilingual team any time.";

const PHONE_DISPLAY = "(702) 766-3394";
const PHONE_TEL = "+17027663394";
const EMAIL = SITE.email;
const RONI_INSTAGRAM = "https://www.instagram.com/xprtinsurance/";
const AALIYAH_INSTAGRAM = "https://www.instagram.com/pure_artist_music/";


export const Route = createFileRoute("/community")({
  head: () => {
    const ev = currentEvent();
    const eventLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
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
          streetAddress: ev.streetAddress,
          addressLocality: "Denver",
          addressRegion: "CO",
          postalCode: "80205",
          addressCountry: "US",
        },
      },
      performer: ev.artists.map((a) => ({
        "@type": "MusicGroup",
        name: a.name,
        ...(a.link ? { sameAs: a.link.url } : {}),
      })),
      organizer: {
        "@type": "Organization",
        name: "Pure Artist Music",
        sameAs: AALIYAH_INSTAGRAM,
      },
      sponsor: { "@id": `${SITE.url}/#org`, sameAs: RONI_INSTAGRAM },

    };
    if (ev.startDateIso) eventLd.startDate = ev.startDateIso;
    if (ev.endDateIso) eventLd.endDate = ev.endDateIso;
    if (ev.eventUrl) {
      eventLd.offers = {
        "@type": "Offer",
        url: ev.eventUrl,
        price: "20",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-07-25T00:00:00-06:00",
      };
    }
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
          className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="container-prose relative py-14 md:py-24">
          <p className="text-sm font-medium tracking-wide text-primary-foreground/70">
            XPRT Insurance · A Roni Rivers Agency
          </p>
          <Eyebrow className="mt-6 text-gold">
            <Sun className="h-3.5 w-3.5" aria-hidden /> Proud Sponsor · Denver, CO
          </Eyebrow>
          <h1 className="mt-5 text-balance text-3xl leading-[1.08] md:text-5xl">
            XPRT Insurance is a proud sponsor of the Beach &amp; Boujie Summer Bash
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Welcome, and thanks for scanning. We back the artists on stage, the small businesses
            that host them, and the neighbors who show up. Enjoy the music — then enter our
            community giveaway and save us for whenever you need insurance answers.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center">
            <div className="order-2 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur-sm md:order-1">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Now sponsoring</p>
              <p className="mt-2 text-xl leading-snug md:text-2xl">{ev.name}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-primary-foreground/75">
                <li className="flex items-start gap-2">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />{" "}
                  {ev.dateTime}
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> {ev.venue}
                  {ev.venueDetail ? ` · ${ev.venueDetail}` : ""} · {ev.streetAddress}, {ev.city}
                </li>
                {ev.ticketNote && (
                  <li className="flex items-start gap-2">
                    <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />{" "}
                    {ev.ticketNote}
                  </li>
                )}
                {ev.dressCode && (
                  <li className="flex items-start gap-2">
                    <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> Dress code:{" "}
                    {ev.dressCode}
                  </li>
                )}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <EventArtwork
                src={ev.artwork ?? beachBoujieFlyer.url}
                alt={`${ev.name} official event flyer — Saturday, August 15 at NOVEL RiNo, Denver`}
              />
            </div>
          </div>


          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={scrollToGiveaway}
              className="btn-gold-shimmer h-14 w-full min-w-56 bg-gold-gradient text-base text-gold-foreground hover:bg-gold-gradient sm:w-auto"
            >
              <Gift className="mr-2 h-5 w-5" aria-hidden />
              Enter the Giveaway
            </Button>
            {ev.eventUrl && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 w-full border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              >
                <a href={ev.eventUrl} target="_blank" rel="noopener noreferrer">
                  <Ticket className="mr-2 h-5 w-5" aria-hidden /> Get Tickets
                </a>
              </Button>
            )}
          </div>
          <p className="mt-3 text-sm text-primary-foreground/60">
            Takes under a minute · English &amp; Español
          </p>
        </div>
      </section>

      {/* LINEUP */}
      <Section id="lineup">
        <SectionHeading
          eyebrow="The lineup"
          title="Artists on the Beach & Boujie stage"
          intro="Presented by Pure Artist Music. We spotlight Colorado musicians and the small businesses that keep our neighborhoods playing."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ev.artists.map((artist, i) => (
            <Reveal
              as="li"
              key={artist.name}
              delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 75 : 150}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <ArtistImage src={artist.image} alt={artist.name} eager={i < 2} />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Featured artist
                </p>
                <h3 className="mt-1 text-2xl leading-snug">
                  {artist.link ? (
                    <a
                      href={artist.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                    >
                      {artist.name}
                    </a>
                  ) : (
                    artist.name
                  )}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
                {artist.link && (
                  <Button asChild variant="outline" size="sm" className="mt-4 self-start">
                    <a href={artist.link.url} target="_blank" rel="noopener noreferrer">
                      {artist.link.label === "Spotify" ? "Listen on Spotify" : "Watch on YouTube"}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden />
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
        {ev.specialGuestsNote && (
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {ev.specialGuestsNote}
          </p>
        )}
      </Section>


      {/* FEATURED EVENT */}
      <Section tone="cream" id="event">
        <SectionHeading eyebrow="Featured event" title={ev.name} intro={ev.description} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="text-xl">What to expect</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2">
                <Music className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> Live sets from
                Colorado artists on the NOVEL RiNo backyard terrace.
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> Champagne
                wall, local brands, and local bites and sips.
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> One day only,
                11:00 AM to 3:00 PM — then the rooftop after-party.
              </li>
              <li className="flex items-start gap-2">
                <Gift className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> Our community
                giveaway is open to attendees, right from your phone.
              </li>
            </ul>
          </Reveal>

          <Reveal
            delay={75}
            className="rounded-2xl border border-border bg-background p-6 shadow-sm"
          >
            <h3 className="text-xl">Credits & after-party</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {ev.presentedBy && ev.presentedBy.length > 0 && (
                <div>
                  <dt className="text-muted-foreground">Presented by</dt>
                  <dd className="text-foreground">{ev.presentedBy.join(" · ")}</dd>
                </div>
              )}
              {ev.afterParty && (
                <div>
                  <dt className="text-muted-foreground">After party</dt>
                  <dd className="text-foreground">{ev.afterParty}</dd>
                </div>
              )}
              {ev.eventUrl && (
                <div>
                  <dt className="text-muted-foreground">Tickets</dt>
                  <dd>
                    <a
                      href={ev.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
                    >
                      <Ticket className="h-4 w-4 text-gold" aria-hidden /> Get tickets on Eventbrite
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* GIVEAWAY */}
      <Section id="giveaway" tone="ink" className="scroll-mt-24">
        <SectionHeading
          tone="ink"
          eyebrow="Giveaway"
          title="Enter the XPRT Community Giveaway"
          intro="Two prizes, one quick entry. Drop your info once from your phone — we'll announce the winners after the event and reach out directly. One entry per person, no purchase necessary."
        />


        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {GIVEAWAY_PRIZES.map((p, i) => (
            <Reveal
              as="li"
              key={p.place}
              delay={i === 0 ? 0 : 75}
              className="h-full rounded-2xl border border-gold/40 bg-background p-6 shadow-sm"
            >
              <Trophy className="h-5 w-5 text-gold" aria-hidden />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {p.place}
              </p>
              <p className="mt-2 text-base leading-relaxed text-foreground">{p.en}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.es}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-primary-foreground/70">
          {PRIZE_NOTE.en} · {PRIZE_NOTE.es}
        </p>


        <div className="mt-8 rounded-2xl border border-gold/40 bg-background p-6 text-center md:p-8">
          <Sparkles className="mx-auto h-6 w-6 text-gold" aria-hidden />
          <p className="mt-3 text-lg font-medium text-foreground">
            Ready? Open the entry form and you're done in under a minute.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            The form opens right here in a pop-up — nothing to download, no extra tabs.
          </p>
          <GhlFormButton
            form="community_giveaway"
            size="lg"
            className="btn-gold-shimmer mt-6 h-14 w-full bg-gold-gradient text-base text-gold-foreground hover:bg-gold-gradient sm:w-auto sm:min-w-64"
            successMessage="You're entered — we'll reach out after the event. Good luck!"
          >
            <span>
              <Gift className="mr-2 inline h-5 w-5" aria-hidden /> Enter the Giveaway
            </span>
          </GhlFormButton>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-primary-foreground/60">{GIVEAWAY_TERMS.en}</p>
        <p className="mt-2 text-xs leading-relaxed text-primary-foreground/60">{GIVEAWAY_TERMS.es}</p>

      </Section>




      {/* MEET XPRT */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Meet the founder"
          title="Hi, I'm Roni Rivers — your neighbor and your insurance agent"
          intro="XPRT Insurance, A Roni Rivers Agency is an independent, bilingual agency licensed in Colorado and Nevada. We compare options across carriers, explain everything in plain language, and never pressure anyone."
        />

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <div className="grid gap-0 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <img
              src={roniPhoto}
              alt="Roni Rivers, founder of XPRT Insurance, A Roni Rivers Agency in Denver and Las Vegas"
              loading="lazy"
              className="h-72 w-full object-cover object-top md:h-full"
            />
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Veronica “Roni” Rivera-Nuñez · Founder &amp; Licensed Agent
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground">
                I live right here in this neighborhood — the Bash is happening at my own community,
                so some of you have already met me at the mailboxes, the pool, or the elevator. If
                my face looks familiar, that's why. Come say hi to my team, and if you see me
                around after the event, stop me.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I built XPRT Insurance because too many families and small business owners get
                handed a policy they don't understand. I'm a licensed advisor in Colorado and
                Nevada, I specialize in surety bonds, dealership and commercial coverage, and my
                team handles home, auto, renters, life and Medicare. We work in English and
                Español, and we treat every neighbor's policy like it's our own.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Vivo en esta misma comunidad. Soy Roni Rivers, fundadora de XPRT Insurance, con
                licencia en Colorado y Nevada. Atendemos en español y con mucho gusto le
                explicamos su cobertura sin presión.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-13 text-base">
                  <Link to="/about">More about our team</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 text-base">
                  <a href={`tel:${PHONE_TEL}`}>
                    <Phone className="mr-2 h-5 w-5" aria-hidden /> {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <h3 className="mt-12 text-xl">What we can help you with</h3>

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
      <Section tone="cream" id="upcoming">
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
      <div>
        <Sun className="mx-auto h-7 w-7 text-gold" aria-hidden />
        <p className="mt-3 text-sm text-primary-foreground/70">
          Event artwork slot — add an XPRT-branded graphic or artist photo here
        </p>
      </div>
    </div>
  );
}

function ArtistImage({ src, alt, eager }: { src?: string; alt: string; eager?: boolean }) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        <img
          src={src}
          alt={`${alt} performing at the Beach & Boujie Summer Bash`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
      </div>
    );
  }
  return (
    <div className="grid aspect-[4/5] w-full place-items-center border-b border-dashed border-gold/50 bg-secondary">
      <Music className="h-8 w-8 text-gold" aria-hidden />
    </div>
  );
}
