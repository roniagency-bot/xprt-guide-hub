## Build plan — GHL forms via CTA buttons (no inline embeds)

### 1. Form registry — `src/lib/ghl-forms.ts`
Single source of truth. Adding/changing a form = one edit here.

```ts
export const GHL_FORMS = {
  contact:           { id: "FNzG1pOCoN5RD2w5ziGZ", title: "Contact Us" },
  personal_quote:    { id: "4QLIBia5cQgQuWS2DLW9", title: "Personal Lines Quote" },
  bonds:             { id: "BAwL9ggoEzbScpGbKTG6", title: "Bond Application" },
  commercial_full:   { id: "oK6olCAA4APFvF8PfYW4", title: "Commercial Intake" },
  workers_comp:      { id: "EgSOk7OI4iHtddPWb4JI", title: "Workers' Comp Quote" },
  commercial_auto:   { id: "l7jflX6hwYoGENEcMwDp", title: "Commercial Auto Quote" },
  general_liability: { id: "ORhIVKUzCHklssPs46Cm", title: "General Liability Quote" },
} as const;
export type GhlFormKey = keyof typeof GHL_FORMS;
```

### 2. Reusable component — `src/components/site/GhlFormButton.tsx`
Wraps shadcn `Button` + opens the form in a `Dialog` (≥md) or `Drawer` (<md).

- Props: `form: GhlFormKey`, `children` (label), `variant`, `size`, `className`.
- Iframe `src`: `https://link.xprtinsurance.com/widget/form/{id}` with UTMs appended: `?utm_source=website&utm_medium=cta&utm_content={form}&page={pathname}` (plus `notrack=true` for `contact` since that's how GHL serves it).
- Auto-height: window `message` listener for GHL's `form_height_*` payloads adjusts `iframe.style.height` so there's no scroll-within-scroll.
- Iframe is `loading="lazy"` and only mounted once the modal opens — zero page-weight cost when closed.
- Loading skeleton shows until iframe `onLoad` fires.
- On GHL's `form_submission_success` postMessage: close modal, fire success `toast`, push a `lead_submit` event to dataLayer if present (analytics-friendly, optional).
- Accessibility: `DialogTitle`/`DialogDescription` from registry, focus trap from shadcn, `<iframe title={...}>`.

### 3. Where the CTAs go

| Page | Change | Form |
|---|---|---|
| `src/components/site/SiteHeader.tsx` | Add small "Get a Quote" button in nav (desktop + mobile menu) | `personal_quote` |
| `src/components/site/CTASection.tsx` | Replace `primaryHref` Link with `GhlFormButton`; accept optional `form` prop so callers can override per-page | default `personal_quote` |
| `src/routes/contact.tsx` | Remove inline form; replace with hero + "Send a Message" button + business info (hours, phone, email) | `contact` |
| `src/routes/personal.homeowners-insurance.tsx` + `src/routes/es.personal.homeowners-insurance.tsx` | Replace `<HomeownersLeadForm/>` with `GhlFormButton` ("Get My Homeowners Quote" / "Solicitar Cotización") | `personal_quote` |
| `src/routes/business-insurance.bonds.tsx` + `src/routes/es.business-insurance.bonds.tsx` | Replace `<BondsLeadForm/>` and the `BondCallout` button with `GhlFormButton` | `bonds` |
| `src/components/site/ServiceCard.tsx` (where applicable) | Optional secondary "Get a Quote" CTA | per-card-key |

The Spanish CTA copy lives next to the English copy in the same files (already i18n'd via the `LangContext`).

### 4. What stays as on-site forms (NOT replaced)
- `LeadCaptureForm` — powers the bilingual tripwire email + tracked download. Different flow.
- `HomeownersQuiz` — multi-step interactive quiz, can't be replicated by a GHL form. Already forwards to GHL.

### 5. What I'll remove from page bodies (components remain in repo)
- Inline `HomeownersLeadForm` on the homeowners service page (EN + ES).
- Inline `BondsLeadForm` on the bonds page (EN + ES).
- Inline contact form on `contact.tsx`.

The component files stay so nothing else that may reference them breaks; they're just not rendered.

### 6. Verification
- Open each page, click each CTA, confirm the right GHL form renders in the dialog (and as a drawer on mobile width).
- Submit a test lead in 2–3 of them; confirm it lands in GHL with `utm_content` set to the form key and `page` set to the source URL.
- Tab through the dialog to confirm focus trap + Escape closes.
- Lighthouse: confirm no iframe loaded on initial page paint (lazy mount works).

### Out of scope
- Adding a homeowners-quiz GHL equivalent.
- Deleting `HomeownersLeadForm` / `BondsLeadForm` source files.
- Changing the tripwire email or quiz flows.
- Auth/PII/RLS work — these are public GHL forms, no DB writes from our side.