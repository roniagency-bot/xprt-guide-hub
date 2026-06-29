## Temporary July 4th Office Closure Banner

### Goal
Add a short-lived, site-wide announcement banner that tells visitors the office will be closed Friday, July 3, 2026 for the Independence Day holiday. It will be bilingual, dismissible, and automatically stop showing after a configured end date so no manual redeploy is required to remove it.

### Why a top banner?
- **Visibility**: Every page visitor sees it immediately, which is the right urgency for operational hours.
- **Accessibility**: A static, dismissible ribbon is better than a scrolling marquee (marquees are hard to read, can violate WCAG motion guidelines, and are ignored by search engines).
- **Non-intrusive**: Placed above the sticky header so it doesn't overlap content, and can be dismissed.

### Proposed component behavior
1. **Display window**: Show from a start date (e.g., June 30, 2026) through an end date (e.g., July 6, 2026 at 11:59 PM). Hide before or after those dates automatically.
2. **Dismissible**: User can click an X to close; dismissal is remembered in `localStorage` for the current browser so repeat visits don't re-show it.
3. **Bilingual**: English text on `/` and `/en/*` paths; Spanish text on `/es/*` paths.
4. **Mobile safe**: Text stays readable, close button stays tappable, no horizontal scroll.
5. **No SEO/meta changes**: A simple announcement banner should not alter page titles, descriptions, or canonical tags.

### Files to change
- `src/components/site/HolidayBanner.tsx` — new reusable component with the date logic, dismissal state, and EN/ES copy.
- `src/routes/__root.tsx` — insert `<HolidayBanner />` above `<SiteHeader />` so it appears site-wide.
- `src/lib/i18n.ts` — add holiday banner strings (or keep them co-located in the component; we can decide during implementation).

### Copy
- English: "Our office will be closed Friday, July 3 for the Independence Day holiday. Emergency claims support remains available."
- Spanish: "Nuestra oficina estará cerrada el viernes 3 de julio por el feriado del Día de la Independencia. El soporte de reclamos de emergencia sigue disponible."

### Technical notes
- Use `new Date()` comparison with stable UTC boundaries (e.g., `Date.UTC(2026, 6, 6, 23, 59, 59)`) to avoid timezone edge cases.
- Use `useState` + `useEffect` for `localStorage` read/write so SSR doesn't try to access `window`.
- Style with existing tokens: gold background/gold-foreground or primary background/primary-foreground, plus a close icon from `lucide-react`.

### Rollback / expiration
- After the configured end date, the component simply renders nothing.
- When the holiday is past, we can either leave the component in the codebase (it will be inert) or remove it entirely in a follow-up cleanup. Recommended: leave it inert for a few days, then remove to keep the bundle clean.