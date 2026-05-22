## Hero Background Images for Category Hubs

### Goal
Add brand-matching hero photography behind the four category hub pages with a subtle navy gradient overlay (image-forward style).

### Pages affected
1. `/services/personal` — Personal Insurance hub
2. `/business-insurance/bonds` — Bonds hub
3. `/services/dealership` — Dealership hub
4. `/services/commercial` — Commercial hub

(All four are rendered by `src/routes/services.$category.tsx` except Bonds which lives at `src/routes/business-insurance.bonds.tsx`.)

### 1. Generate 4 brand-matched hero images

Generate editorial 16:9 photos in the brand palette (warm cream, navy ink, champagne gold accents). Save to `src/assets/`:
- `hero-personal.jpg` — modern American family home exterior at golden hour, warm cream/navy tones
- `hero-bonds.jpg` — close-up of an official document with a wax seal / signed bond paperwork, warm desk light, soft navy shadows
- `hero-dealership.jpg` — clean modern auto dealership showroom, polished cars on a lit lot, dusk light
- `hero-commercial.jpg` — Nevada small-business main-street storefront / interior with warm light, professional feel

All landscape (1920×1080-ish), photographic, editorial, no text, no logos, color grade leaning warm cream + deep navy shadows with subtle gold highlights.

### 2. Restyle the hub hero section

Replace the flat `bg-cream-gradient` hero with a layered hero:

```text
<section relative isolate overflow-hidden>
  <img absolute inset-0 object-cover />                    ← hero photo
  <div absolute inset-0 bg-gradient navy bottom-up />      ← navy overlay
  <div container relative>                                  ← existing content
    breadcrumbs, eyebrow, h1, intro, CTAs
  </div>
</section>
```

Overlay (image-forward / subtle): `bg-gradient-to-t from-ink/85 via-ink/55 to-ink/20`, plus a soft `from-ink/40 to-transparent` left-to-right wash so text on the left stays readable. Text colors flip to `text-primary-foreground` / `text-primary-foreground/80`; eyebrow + accents stay gold.

### 3. Per-page wiring

- `src/routes/services.$category.tsx` — map `category.slug` → imported image (`personal` / `dealership` / `commercial`). Default to existing `hero-agency.jpg` if no match. Apply to both the general hub hero and the `DealershipHub` hero.
- `src/routes/business-insurance.bonds.tsx` — wire `hero-bonds.jpg` into its existing hero section the same way.

### 4. Accessibility & performance
- Each `<img>` gets a descriptive `alt`, `fetchPriority="high"`, `decoding="async"`, explicit `width`/`height`.
- `prefers-reduced-motion` not relevant (no animation added).
- Image overlay preserves WCAG contrast for headline + body text.

### Files to change / create
- Create: `src/assets/hero-personal.jpg`, `hero-bonds.jpg`, `hero-dealership.jpg`, `hero-commercial.jpg`
- Edit: `src/routes/services.$category.tsx` (both hub layouts)
- Edit: `src/routes/business-insurance.bonds.tsx`

No backend, routing, or business-logic changes.