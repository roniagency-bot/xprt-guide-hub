## Gold Shimmer & Hover Lift Effects

### Goal
Add a premium gold shimmer animation to primary CTA buttons and enhance the hover lift effect on service cards for a more vivid, polished feel.

---

### 1. Gold Shimmer for Primary CTAs

**New CSS utility** in `src/styles.css`:
- Add `.btn-gold-shimmer` class using a `::before` pseudo-element with a diagonal white/gold gradient that sweeps across the button on hover.
- Animation: 1.2s ease-in-out, translateX from -150% to +150%, opacity fades in/out.
- Uses existing `--gold` and `--gold-foreground` tokens. Respects `prefers-reduced-motion`.

**Apply to these primary CTAs** (all currently use `bg-gold`):
- Homepage hero "Book Your Free Coverage Review" button (`src/routes/index.tsx`)
- CTASection primary button (`src/components/site/CTASection.tsx`)
- SiteHeader "Book a Review" button (`src/components/site/SiteHeader.tsx`)
- GhlFormButton in CTASection (when `primaryForm` is set)

### 2. Enhanced Hover Lift for Service Cards

**In `src/components/site/ServiceCard.tsx`**:
- Increase lift from `hover:-translate-y-0.5` to `hover:-translate-y-1`.
- Add `hover:shadow-gold` on featured cards for a warm gold glow on hover.
- Add `group-hover:shadow-gold` to the icon container on featured cards.
- Keep existing `duration-500` transition for smoothness.

**In `src/routes/index.tsx`**:
- Add `hover:shadow-gold` to the "Why XPRT" reason cards.
- Add `hover:shadow-gold` to the Free Guides grid cards.

### 3. Optional Micro-Enhancement

Add a subtle `scale-[1.02]` on active/press for shimmer buttons to give tactile feedback.

---

### Technical Notes
- Pure CSS/Tailwind — no new dependencies.
- `prefers-reduced-motion: reduce` disables shimmer animation entirely.
- All changes use existing design tokens (`--gold`, `shadow-gold`, etc.).

### Files to Change
- `src/styles.css` — add shimmer keyframes and utility class
- `src/components/site/ServiceCard.tsx` — enhance hover lift + glow
- `src/routes/index.tsx` — add shimmer class to hero CTA
- `src/components/site/CTASection.tsx` — add shimmer class to primary CTA
- `src/components/site/SiteHeader.tsx` — add shimmer class to header CTA