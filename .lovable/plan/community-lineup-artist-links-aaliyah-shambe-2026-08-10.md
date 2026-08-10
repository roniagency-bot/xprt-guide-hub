# Community Lineup: Artist Links + Aaliyah Shambe

Adds a listening link for each confirmed artist on the `/community` lineup, and fills in the co-founder's real name.

## Links per artist

| Artist | Link |
| --- | --- |
| E.M.E | Spotify artist profile |
| Jewel House | Spotify artist profile |
| Lokana | Spotify track — "Do It My Way" |
| Kayla Smith | Spotify artist profile |
| Aaliyah Shambe | YouTube |
| Ekym | No link — name and bio only |

Aaliyah's YouTube channel URL isn't confirmed yet. I'll verify her official channel before linking; if I can't confirm it's really hers, I'll leave her without a link (same as Ekym) rather than link the wrong channel, and you can send me the URL.

## How links appear

Both treatments, as you asked:
- The artist's name becomes a link (opens in a new tab).
- A small "Listen on Spotify" button (or "Watch on YouTube" for Aaliyah) sits under the bio.

Artists with no link stay exactly as they are now — plain name, no button, no empty space or broken styling.

## Name fix

The "Pure Artist Music co-founder (name to confirm)" card becomes **Aaliyah Shambe** — pop/R&B artist and co-founder of Pure Artist Music, awarded Denver's Best Record Label 2025 by the Denver Spotlight Awards.

## Schema

Each linked artist's `MusicGroup` entry in the event JSON-LD gets a `sameAs` pointing at their Spotify/YouTube URL, which helps Google and AI answer engines connect the performers to real entities.

## Technical notes

- `src/lib/community-events.ts`: add optional `link?: { url: string; label: "Spotify" | "YouTube" }` to the artist type; set Aaliyah's name/bio; add URLs for E.M.E, Jewel House, Lokana (track), Kayla Smith.
- `src/routes/community.tsx`: name renders as an anchor when `link` exists; small outline link-button under the bio; add `sameAs` to the performer schema mapping.
- No design token, color, layout, or other-route changes.
