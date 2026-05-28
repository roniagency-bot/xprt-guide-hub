## Goal
Finalize the English homeowners insurance page by adding the 3 highest-impact pieces: a coverage calculator, a "what's NOT covered" callout, and 4 new Knowledge Center articles. Video is already done — skip it.

## 1. Dwelling Coverage Calculator (new component + new section)

**New file**: `src/components/site/DwellingCalculator.tsx`

Client-side widget, no backend. Inputs:
- Home square footage (number)
- ZIP or state picker (NV / CO only — drives rebuild $/sqft)
- Home age bucket (<10, 10-30, 30+ yrs) — modifier
- Construction quality (Standard / Custom / Luxury) — multiplier
- Optional: # of stories, basement Y/N

Output card:
- **Estimated dwelling (Coverage A)** — sqft × local $/sqft × quality multiplier
- **Recommended other structures (B)** — 10% of A
- **Recommended personal property (C)** — 50–70% of A (slider)
- **Recommended loss of use (D)** — 20% of A
- **Recommended liability** — $300K default, $500K suggested
- **Umbrella suggestion** — $1M if assets/income flag checked

Below results: disclaimer (estimates only, real number requires a replacement cost estimator from the carrier — Verisk 360Value / e2Value), CTA buttons "Book a free coverage review" + "Download the cheat sheet".

**Rebuild cost table** (lives in `src/lib/rebuild-costs.ts`): static $/sqft by metro — Las Vegas, Reno, Henderson, Denver, Colorado Springs, Boulder, mountain CO (higher), rural NV (lower). Source from RSMeans / Craftsman ballpark; mark as "2025 estimate."

**Insert** on `src/routes/personal.homeowners-insurance.tsx` between the QUIZ section and the VIDEO section, with anchor `id="calculator"`. Add to in-page nav if one exists.

## 2. "What This Policy Does NOT Cover" callout

**Inline** on `src/routes/personal.homeowners-insurance.tsx`, placed right after the coverage explainer / before the quiz (so users see exclusions before self-assessing).

Visual: bordered callout box (warning tone, not destructive), heading "What a standard homeowners policy does NOT cover," followed by a 2-column grid of 6 items with 1-sentence each + the endorsement/separate policy that fixes it:

1. **Flood** → separate NFIP or private flood policy
2. **Earthquake** → earthquake endorsement (critical in NV/CO foothills)
3. **Sewer / drain backup** → water backup endorsement ($5K–$25K)
4. **Mold** → usually capped at $5K, can be increased
5. **Wear, tear, neglect** → maintenance is the owner's job
6. **Vacant home (30+ days)** → vacancy endorsement or DP policy

CTA at the bottom: "Not sure which of these you need? → Book a free coverage review."

No new component needed — build inline with existing `Section` + Tailwind utilities and a `lucide-react` `ShieldAlert` icon to match the rest of the page.

## 3. Four new Knowledge Center articles

Add 4 entries to `src/lib/homeowners-faqs.ts` (each gets its own `/faq/homeowners/{slug}` page via the existing `faq.homeowners.$slug.tsx` route — no new route files needed). Stage = `mofu` for #1 and #2, `tofu` for #3, `mofu` for #4.

| Slug | Question | Target keyword |
|---|---|---|
| `water-damage-vs-flood-insurance` | What's the difference between water damage and flood insurance? | "water damage vs flood insurance" |
| `roof-age-and-homeowners-insurance` | How does my roof's age affect my homeowners insurance? | "roof age insurance Nevada / Colorado" |
| `wildfire-coverage-colorado-homes` | Does homeowners insurance cover wildfire damage in Colorado? | "wildfire insurance Colorado" |
| `scheduled-personal-property-jewelry` | Do I need scheduled personal property for jewelry, watches, or art? | "schedule jewelry homeowners policy" |

Each article follows the existing FAQ shape: `question`, `shortAnswer`, `paragraphs[]` (3–5 paragraphs, 400–700 words total), `bullets[]`, `stateContext` (NV + CO specifics), `metaDescription`, `goDeeper` (links to 1–2 existing FAQs), `readyToAct` (links to the policy review CTA slug). Auto-picked up by `HOMEOWNERS_FAQS` array, the `/faq/homeowners` index, sitemap, and JSON-LD.

Also add the same 4 slugs to `src/lib/i18n/homeowners-faqs-es.ts` as `null` placeholders so the typing stays clean — actual ES translations happen in the next translation batch (per our agreed flow).

## What does NOT change
- No design/layout/typography changes outside the new calculator + callout
- No changes to the existing quiz, cheat sheet, ebook, or video
- No new routes — articles ride the existing `faq.homeowners.$slug.tsx` route
- No ES translations in this pass (slugs added to ES dict as placeholders only)
- No changes to lead forms, GHL, or backend

## Order of work
1. Add the "NOT covered" callout (smallest, ships value immediately)
2. Add the 4 new FAQ entries (pure data, low risk)
3. Build the DwellingCalculator component + rebuild-costs table + wire into the page

After this ships, the homeowners EN page is locked and we translate it in one focused pass (calculator UI strings, callout copy, 4 new article bodies) plus flip `/personal/homeowners-insurance` on in the ES toggle allowlist (it's already there).
