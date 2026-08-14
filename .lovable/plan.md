# Community Page Social Links

Add Roni's and Aaliyah's Instagram profiles to the `/community` landing page in three places: a dedicated follow card, the existing Meet the Founder section, and Aaliyah's artist card. Keep artist Spotify links unchanged.

## Links to add

| Owner | URL | Location |
| --- | --- | --- |
| Roni Rivers / XPRT Insurance | https://www.instagram.com/xprtinsurance/ | Meet the Founder section + Follow the Hosts card |
| Aaliyah Shambe / Pure Artist Music | https://www.instagram.com/pure_artist_music/ | Aaliyah's artist card + Follow the Hosts card |

## Where the links appear

1. **New "Follow the hosts" section** — placed between the Lineup and the Giveaway.
   - Two side-by-side cards (mobile stacks): Roni on the left, Aaliyah on the right.
   - Each card shows the existing photo (Roni's team photo and Aaliyah's artist photo), a short line, and an Instagram button that opens in a new tab.
   - Bilingual copy (EN/ES) since the page supports both languages.

2. **Meet the Founder section** — add a small Instagram button under Roni's contact links.

3. **Aaliyah's artist card** — add an Instagram link next to or below the existing Spotify links on the other artists. Since Aaliyah currently has no Spotify link, this will be her only social button.

## Design rules

- Use the existing `Button` / outline variants from the design system (no hardcoded colors).
- Use the `Instagram` icon from `lucide-react` and `ExternalLink` for new-tab affordance.
- Open all social links in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Keep the current section background-color rhythm; add the new section in a contrasting tone to avoid blending with the lineup or giveaway.

## Schema / SEO

- Add `sameAs` to the event organizer JSON-LD pointing to `https://www.instagram.com/pure_artist_music/` for Pure Artist Music.
- Optionally add `sameAs` for the sponsor (`XPRT Insurance`) pointing to the Instagram URL if the existing schema object supports it.
- No new routes or URL changes.

## Files to edit

- `src/routes/community.tsx`: add the new section, update the Meet the Founder block, update Aaliyah's artist card, and update JSON-LD.
- `src/lib/community-events.ts`: add Aaliyah's Instagram link to the artist type and data (or keep the link inline in the route if it is simpler).
- No new assets needed; reuse `veronica.png` and `aaliyah-shambe.png.asset.json`.

## Out of scope

- Changing the artist Spotify links or adding Instagram for the other five artists.
- Changing the page layout order beyond inserting the new section.
