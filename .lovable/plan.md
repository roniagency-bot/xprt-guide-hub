# Add scroll-triggered animations to the homepage

Goal: make the homepage feel alive as the visitor scrolls. Sections (hero, service cards, "Why XPRT", process steps, offers, FAQ entry, CTA) fade in and slide up gently when they enter the viewport. Buttons and cards keep your existing hover styles. All motion respects `prefers-reduced-motion` so accessibility isn't broken.

## Approach

Use a single lightweight, dependency-free reveal primitive built on the browser's `IntersectionObserver` + your existing Tailwind animation utilities. No new npm package needed — keeps the bundle small and avoids SSR pitfalls with motion libraries on TanStack Start.

```text
<Reveal>            → wraps any section/element
  ├─ initial: opacity-0, translate-y-3
  └─ on intersect:  opacity-100, translate-y-0  (300ms ease-out)
```

Add a `delay` prop (0/75/150/225ms) so grids of cards can stagger nicely.

## What gets built

1. **New component** `src/components/site/Reveal.tsx`
   - Client-only reveal wrapper using `IntersectionObserver` (threshold ~0.15, `rootMargin: "0px 0px -80px 0px"`, `once: true`).
   - Renders children with starting `opacity-0 translate-y-3`, transitions to visible state via Tailwind classes.
   - Reads `prefers-reduced-motion`; when reduced, renders fully visible immediately (no transform/opacity transition).
   - Props: `delay?: 0 | 75 | 150 | 225`, `as?: keyof JSX.IntrinsicElements` (default `div`), `className?`.

2. **Homepage wiring** `src/routes/index.tsx`
   - **Hero**: keep the existing `fade-in-up` (it fires on load, which is correct for above-the-fold).
   - **TrustBar**: wrap in `<Reveal>`.
   - **Services grid**: wrap each `ServiceCard` in `<Reveal delay={i*75}>` for a staggered cascade.
   - **Why XPRT**: wrap heading column in `<Reveal>`; wrap each of the 4 reason cards with staggered delays.
   - **Process steps (01/02/03)**: wrap each `<li>` with staggered delays.
   - **Free Guides grid**: wrap each offer card with staggered delays (cap at 225ms so later cards don't lag).
   - **FAQ entry**: wrap the heading column and each FAQ link card.
   - **CTASection**: wrap in `<Reveal>`.

3. **Optional micro-polish (same edit, low risk)**
   - Add a subtle `transition-transform duration-300` + `hover:-translate-y-0.5` to service cards if not already present (verify in `ServiceCard.tsx` first; skip if already styled).

## Technical notes

- No new dependencies. Pure React + IntersectionObserver + Tailwind.
- SSR-safe: the observer only runs inside `useEffect`, so server-rendered HTML ships with children visible-by-default-class-fallback (via a `data-revealed` attribute + CSS) OR we accept a one-frame opacity transition on hydration. We'll go with the latter — simpler, imperceptible.
- Only the homepage is touched this round. Service pages / FAQ / CTAs site-wide can reuse `<Reveal>` later in a separate pass.
- No changes to design tokens, routes, SEO, or business logic.

## Files changed

- **create** `src/components/site/Reveal.tsx`
- **edit** `src/routes/index.tsx` (wrap sections/cards with `<Reveal>`)
