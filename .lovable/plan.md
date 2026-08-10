# Community Page Update — Beach & Boujie Summer Bash

Fill the `/community` page with the real event, in XPRT brand colors (ink + gold, no purple flyer aesthetic), with two giveaway prizes and a clear "we're with you even though Roni can't attend in person" presence.

## Event facts (pulled from the flyer + Pure Artist Music Linktree)

- **Event:** Beach & Boujie Summer Bash Music Festival
- **Presented by:** Pure Artist Music, with Eloura Hospitality Group, at NOVEL RiNo by Crescent Communities
- **When:** Saturday, August 15, 2026 · 11:00 AM – 3:00 PM (1 day only)
- **Where:** NOVEL RiNo — Backyard Terrace, 1350 40th St, Denver, CO
- **Tickets:** $20 presale via Eventbrite; free for NOVEL RiNo residents
- **Vibe:** Retro beach meets elevated Denver culture — champagne wall, live music, local brands, local bites & sips
- **Dress code:** "Beach & Boujie"
- **After party:** Sorry Gorgeous Cocktail Bar
- **Featured artists:** E.M.E · Jewel House · Kayla Smith
- **XPRT role:** proud community sponsor

Artist bios: the Linktree only lists names (no bios published), so each artist gets a short, honest sponsor-voice blurb ("Denver-based artist on the Beach & Boujie stage") with room for a real bio and photo once you send them. No invented facts.

## Page structure (mobile-first, brand colors only)

1. **Hero** — ink background, gold accents. "XPRT Insurance is a proud sponsor of Beach & Boujie Summer Bash." Date/time/venue chips, dress code, and two buttons: **Enter the Giveaway** (scrolls down) and **Get Tickets** (Eventbrite).
2. **Event details** — date, time, venue + address, tickets/free-for-residents note, after-party, lineup, presented-by credits.
3. **Lineup** — three artist cards (E.M.E, Jewel House, Kayla Smith) ready for photos.
4. **Giveaway** — two prizes: (1) vinyl from one of the featured artists, (2) ticket to the next Pure Artist Music event. Wording marked "prizes subject to change" so you can swap later by editing one file. GoHighLevel form embed slot stays as-is until you paste the form ID.
5. **"We're with you — even when we can't be there"** — new section. Roni is traveling and won't be on site, so this section makes XPRT present digitally: text/call/email links, book-a-call link, quote request buttons (personal, business, bonds), bilingual note, and a short personal message from Roni to attendees. This is the section your QR/Linktree traffic lands on and converts from.
6. **Meet XPRT** — existing bilingual agency intro + service links (unchanged).
7. **Upcoming events** — unchanged.

## Design notes

- No purple/pink from the flyer. Ink `#`-dark base, gold gradient accents, cream sections — same tokens as the rest of the site.
- A "beach & boujie" nod done in-brand: warm gold sun-glow gradients, subtle sand-tone texture, palm/music iconography in gold instead of the flyer's neon.
- Optional in-brand event graphic generated in XPRT colors (gold on ink) instead of using the purple flyer. Say the word and I'll generate it; otherwise the artwork slot stays open for an image you upload.

## QR code / link

The page lives at `xprtinsurance.com/community` — that's the URL to give Pure Artist Music for your Linktree spot. I'll also add a short, memorable alias `xprtinsurance.com/beach` that redirects to it, so it prints small and clean on a QR code. QR image itself: I can generate a branded gold-on-ink QR PNG you can download and hand off.

## What I still need from you

1. **GoHighLevel form ID** for the Community Events giveaway form (the `.../widget/form/XXXX` part).
2. Artist photos + real bios, if Pure Artist Music shares them.
3. Confirm the two prizes once the vinyl is locked in.
4. Your short message to attendees (or I'll draft one for your approval).

## Technical section

- Update `src/lib/community-events.ts`: replace the placeholder event with the Beach & Boujie data, add fields for `ticketUrl`, `endDateIso`, `address`, `dressCode`, `afterParty`, `presentedBy`, and a `prizes: string[]` array; keep the existing bilingual `GIVEAWAY_TERMS` and add prize wording.
- Rewrite the body of `src/routes/community.tsx` to render the new sections; keep the existing `Section`, `SectionHeading`, `Reveal`, and gold/ink token usage — no new design system.
- Add a "Reach us instantly" section using existing tel/mailto/booking patterns from `SiteFooter`/`CTASection`.
- Extend the Event JSON-LD with `startDate`, `endDate`, `offers` (Eventbrite URL, $20 USD), `performer` entries for the three artists, `organizer` (Pure Artist Music), and `sponsor` (XPRT) — good for AI/answer-engine pickup before Aug 15.
- Add `src/routes/beach.tsx` as a `beforeLoad` redirect to `/community`, and keep `/community` in `sitemap.xml`.
- Spanish: add an `es` copy layer for the giveaway/terms/contact strings on this page (the page already shows bilingual terms) rather than a separate route, since it is a single QR landing page.
