# Artist Photos + Instagram Links on the Event Landing Page

Both things you asked for are possible, and the page is already built to accept them.

## 1. Artist photos

Each artist card already has a photo slot (currently a gold placeholder). Send me the images and I drop them in — the cards fill with real faces, same rounded frame, no layout change.

- Format: JPG or PNG, square-ish crop works best (roughly 800x800), one file per artist.
- Name them by artist (`eme.jpg`, `jewel-house.jpg`, etc.) so nothing gets mismatched.
- If some artists arrive and others don't, the missing ones keep the current placeholder — the grid stays even.

## 2. Social / video links

Yes, and we can have more than one link per artist. Right now each card supports a single Spotify/YouTube button. I'll widen that so a card can show a small row of links:

- Instagram (profile or a specific post/reel)
- Spotify (already in place for E.M.E, Jewel House, Lokana, Kayla Smith)
- YouTube for Aaliyah

Wording on the buttons stays short: "Instagram", "Listen on Spotify", "Watch on YouTube".

I'll only add Instagram handles you confirm — I won't guess at accounts and risk linking the wrong person.

## 3. Your Instagram as the hub

Since a lot of the promo posting lives on your account, I'll add one line under the lineup: "Follow @your-handle for artist videos and event clips" linking to your Instagram. Send me the handle you want used (XPRT's or your personal).

## What I need from you

1. The artist photos (any order, whatever you have).
2. Instagram handles/links per artist — as many as you have confirmed.
3. Your Instagram handle for the follow line.

Since the event is tomorrow, I can ship the link changes as soon as you send handles, and add photos in a second pass the moment the images land.

## Technical notes

- `src/lib/community-events.ts`: change the artist `link` field to `links?: { url: string; label: "Spotify" | "YouTube" | "Instagram" }[]` and add each artist's `image` import; add an `INSTAGRAM_HANDLE` constant for the follow line.
- `src/routes/community.tsx`: render a wrapped row of link buttons instead of one; keep the artist name linking to the first link; map all link URLs into the performer JSON-LD `sameAs` array.
- Photos go in `src/assets/artists/` and are imported as ES6 image imports.
- No design token, color, or layout changes; other routes untouched.
