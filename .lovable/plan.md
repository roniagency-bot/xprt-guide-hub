# Community Page: Live Giveaway Form + Full Lineup

Two updates to the Beach & Boujie sponsor page, both contained in `src/lib/community-events.ts` (data) with a small grid tweak on `/community`.

## 1. Giveaway form goes live

Set the GoHighLevel form ID to `MEVImf5BDjstFUCkt5P6`. The placeholder box is replaced automatically by the real embedded form, with the existing UTM tags (`utm_source=community`, `utm_medium=qr`, `utm_content=beach-boujie`) preserved so you can see which entries came from the QR code.

## 2. Real lineup with bios

Replace the three placeholder artist blurbs with the full lineup and the bios you sent:

- **E.M.E** — Afrobeats artist bringing an amazing live performance with a dancer.
- **Jewel House** — Denver's rising pop boy band.
- **Lokana** — Pop/R&B artist, named Denver's Best Singer at the 2025 Denver Spotlight Awards.
- **Kayla Smith** — Soul singer, performing with her full band.
- **[Your name / the co-founder]** — Pop/R&B artist and co-founder of Pure Artist Music, awarded Denver's Best Record Label 2025 by the Denver Spotlight Awards.
- **Ekym** — Old-school hip hop artist and founder of Rock the Block.
- Closing line noting **special guest appearances**.

I don't have the name of the co-founder who wrote "and then I am a pop rnb artist" — I'll put a clearly marked placeholder there rather than guess. Reply with the name (and stage name if different) and I'll drop it in.

Lineup grid goes from 3 cards to a responsive 1 / 2 / 3-column grid so seven entries lay out cleanly on phones and desktop. The "special guests" note sits under the grid as a line of copy, not a card. Photo slots stay open on every card for when Pure Artist Music sends images.

## 3. Schema stays accurate

The MusicEvent JSON-LD `performer` list is generated from the artist data, so all six named acts get picked up by Google and AI answer engines automatically once the data is updated. The Pure Artist Music label award is mentioned in the bio text (good AEO signal for "Denver best record label").

## Technical notes

- `src/lib/community-events.ts`: set `COMMUNITY_FORM_ID = "MEVImf5BDjstFUCkt5P6"`; rewrite the `artists` array (7 entries incl. the placeholder-name one); add an optional `specialGuestsNote` field to the event type.
- `src/routes/community.tsx`: lineup grid classes `sm:grid-cols-2 lg:grid-cols-3`; render `specialGuestsNote` below the grid; no other structural or design change.
- No changes to colors, tokens, links, or other routes.
