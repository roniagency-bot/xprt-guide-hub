# Community page mobile flow refinement

## Goal
Fix the mobile-first flow on `/community` so the hero does not feel repetitive against the “Featured event” section, while keeping the useful supporting details (presented by, after-party, what to expect) available further down the page.

## Recommended change
Move the **Featured event** section below the **Lineup** section, and remove the duplicated date/time/venue/address/ticket/dress-code fields from it. Keep only the “What to expect” bullets and the “Presented by” / “After party” credits that are not already in the hero.

## Why this is the right move
- The hero already shows the flyer, event name, date, time, venue, ticket note, and dress code.
- The “Featured event” section currently repeats that same data, which feels like a re-read on mobile.
- The details that are not in the hero — after-party, presented-by credits, and the “what to expect” bullets — are still valuable for attendees deciding to stay or move on to the giveaway.
- The desired user path is: **Hero → see the artists → enter the giveaway → read deeper details / meet the founder**. Moving the section supports that path without deleting useful content.

## Implementation
1. In `src/routes/community.tsx`, reorder the page sections so the order is:
   - Hero
   - Lineup
   - Featured event (slimmed)
   - Giveaway
   - Meet the Founder
   - Quote block
   - Service links
   - Upcoming events
2. Inside the moved **Featured event** section, drop the “Event details” card that repeats date/time/venue/address/tickets/dress-code. Keep:
   - “What to expect” card (champagne wall, live sets, one-day only, giveaway reminder)
   - “Presented by” and after-party credits (could be added to the “What to expect” card or kept as a small second card)
3. Remove the duplicate “Enter the Giveaway” button that currently sits at the bottom of the Featured event section, since the giveaway now follows immediately after.
4. Keep the desktop experience identical to the new mobile flow unless a two-column hero re-test is requested later.
5. No changes to schema, config, or route files needed.

## Sections to keep unchanged
- Hero
- Lineup
- Giveaway
- Meet the Founder
- Quote / service links / upcoming events

## Expected result
Mobile visitors land, confirm the event, see the artists, enter the giveaway, then optionally read the extra event context. The page stops feeling like it repeats itself in the first two screens.
