# Artist Photos on the Event Landing Page

All six photos match an artist on the lineup — nothing missing:

| File | Artist |
| --- | --- |
| E.M.E._picture.jpg | E.M.E |
| jewel_pic.jpg | Jewel House |
| Lokana_picture.jpg | Lokana |
| Kayla_Smith_pic.jpg | Kayla Smith |
| Aaliyah_picture.png | Aaliyah Shambe |
| Ekym_picture.jpg | Ekym |

## How they'll look

- Photos become the top of each artist card, big and full-width — a tall 4:5 portrait frame instead of the small placeholder circle, so faces read clearly on a phone.
- Names and bios sit under the photo; the Spotify/YouTube buttons stay where they are.
- Cards stay 1 column on phone, 2 on tablet, 3 on desktop. On phone that means a scroll of large artist portraits, which is the "see the artists" effect you want from a QR scan.
- Subtle dark-to-transparent gradient at the bottom of each photo so the gold name text stays readable over any image.
- Since this is scanned on phones at the event, images load lazily below the fold and the first two load eagerly — fast on venue wifi.

## Placement on the page

The lineup section stays where it is (right after the event details), so the flow is: sponsor hero → flyer → event details → **artists with photos** → giveaway form → about you. Once you see it, we can move the lineup higher if you want the artists to be the very first thing after the hero.

## Next steps after this (not in this change)

- Social links per artist / your Instagram follow line.
- Final prize photos when you send them.

## Technical notes

- Upload the six photos as CDN assets (`lovable-assets create` from the uploads mount) and write `.asset.json` pointers into `src/assets/artists/`.
- `src/lib/community-events.ts`: set each artist's `image` to the imported pointer URL.
- `src/routes/community.tsx`: enlarge the `ArtistImage` frame to an `aspect-[4/5]` cover image with gradient overlay; keep existing tokens, no new colors.
- Placeholder branch stays intact in case a future artist has no photo.
