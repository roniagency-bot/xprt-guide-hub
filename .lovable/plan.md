## Plan: Motion-powered FAQ accordion

Goal: Replace the current Radix CSS-keyframe animations on `FaqAccordion` with spring-physics motion and a layered content fade-in. Scope is the shared `FaqAccordion` component — every page that uses it (homeowners, bonds, services category/slug, Spanish equivalents) gets the upgrade automatically.

### What changes

1. **Add `motion` dependency**
   - Install `motion` (~30 KB, the successor to `framer-motion`, framework-agnostic but ships React bindings at `motion/react`).

2. **Refactor `src/components/site/FaqAccordion.tsx`**
   - Keep using Radix `Accordion` as the headless state machine (preserves accessibility: `aria-expanded`, keyboard nav, single-open behavior, `value`/`collapsible` API).
   - Replace the CSS-animated `AccordionContent` with a local `MotionAccordionContent` that reads Radix's `data-state` and renders a `motion.div` via `AnimatePresence` so the expand/collapse becomes:
     - height: `0` → `auto` with a spring (`stiffness: 260, damping: 32, mass: 0.9`)
     - opacity: `0` → `1` (slightly delayed against height so text never crops)
     - inner content gets a second `motion.div` with `y: -6 → 0`, `opacity: 0 → 1`, `delay: 0.08`, easing `[0.22, 1, 0.36, 1]` (your existing `--transition-smooth` curve) for a layered "content settles in" feel
   - Chevron rotation in `src/components/ui/accordion.tsx` is fine; no change to the shared UI primitive (keeps every other accordion usage in the app untouched).

3. **Reduced motion**
   - Wrap the motion animations in `useReducedMotion()` from `motion/react`; when true, snap open/closed with `duration: 0` so users who opt out get instant toggles.

4. **Visual polish (still CSS, no new tokens)**
   - Add a subtle `transition-colors` + `hover:bg-accent/40` on `AccordionItem` rows so hovering a question gives a faint warm wash.
   - When open, the active row gets `bg-accent/60` and a thin `border-l-2 border-gold` accent (applied via `data-[state=open]` selector on the item) for a clearer "this is expanded" cue.

### Files touched

- `package.json` (via `bun add motion`) — new dep.
- `src/components/site/FaqAccordion.tsx` — rewrite content rendering with Motion + AnimatePresence; add hover/open styles.
- No edits to `src/components/ui/accordion.tsx` (shared primitive stays generic).
- No edits to consumer routes — they import `FaqAccordion` unchanged.

### Out of scope

- Other accordions in the app (only `FaqAccordion` is requested).
- Layout, copy, routing, or data changes.
