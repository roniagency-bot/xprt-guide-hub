## Bilingual EN/ES Toggle for Knowledge Center

### Approach

URL-prefixed Spanish mirror at `/es/...` for SEO, sharing, and per-language `head()`. Pre-translated content stored alongside English in the existing FAQ data files. A single `<LanguageToggle>` swaps between the matching EN/ES URL.

### Architecture

1. **i18n primitives** — `src/lib/i18n.ts`
   - `Lang = "en" | "es"` type
   - `useLang()` hook reads current pathname; pages can also pass `lang` explicitly
   - `UI` dictionary for static labels (breadcrumbs, eyebrows, "Short answer", buttons, CTAs, category-card titles, hub headings, "Coming soon", legal disclaimer, etc.)
   - `pickLang(en, es, lang)` helper with safe fallback to English when a translation is missing

2. **FAQ data — add Spanish fields** in the three existing files (`homeowners-faqs.ts`, `bonds-faqs.ts`, `dealership-faqs.ts`)
   - Optional fields per item: `question_es`, `shortAnswer_es`, `metaDescription_es`, `paragraphs_es[]`, `bullets_es[]`, `whatToPrepare_es[]`, `stateContext_es`
   - Helper `getFaqI18n(faq, lang)` returns the language-resolved object

3. **Refactor render logic into shared components** so EN/ES routes don't duplicate JSX
   - `src/components/faq/FaqDetail.tsx` — body of `faq.{cat}.$slug.tsx` (takes `faq`, `lang`, `category`)
   - `src/components/faq/FaqCategoryIndex.tsx` — list grid (takes `faqs`, `lang`, `category`)
   - `src/components/faq/KnowledgeHub.tsx` — the 9-card hub
   - Existing EN route files become thin shells calling these components with `lang="en"`

4. **Spanish route files** (mirror structure under `/es/`)
   ```
   src/routes/es.faq.index.tsx
   src/routes/es.faq.homeowners.index.tsx
   src/routes/es.faq.homeowners.$slug.tsx
   src/routes/es.faq.bonds.index.tsx
   src/routes/es.faq.bonds.$slug.tsx
   src/routes/es.faq.dealership.index.tsx
   src/routes/es.faq.dealership.$slug.tsx
   ```
   Each calls the same shared component with `lang="es"`, sets Spanish `head()` (title, description, og:locale=`es_US`, JSON-LD with Spanish question/answer), and uses the `_es` data fields.

5. **Language toggle component** — `src/components/site/LanguageToggle.tsx`
   - "EN | ES" pill placed on the Knowledge Center hub, category indices, and FAQ detail pages
   - Computes the sibling URL (e.g. `/faq/dealership/foo` ⇄ `/es/faq/dealership/foo`)
   - Each detail page sets `<link rel="alternate" hreflang="es"|"en">` for SEO

### Translation scope (this pass)

- All UI labels (hub, category indices, detail page chrome, CTAs, breadcrumbs, "Coming soon", legal disclaimers)
- All 7 Dealership FAQs (full content)
- All Homeowners FAQs (full content)
- All Bonds FAQs (full content)
- The 9 Knowledge Center category card titles + descriptions
- Spanish JSON-LD on each `/es/...` page

### Out of scope

- Translating other site pages (homeowners landing, bonds landing, services pages, header/footer) — only Knowledge Center per request
- Auto language detection from browser; toggle is explicit
- Persisting last-chosen language across sessions (URL is the source of truth)

### Guardrails

- English routes remain byte-identical in URL and behavior; refactor only swaps the inner JSX for the shared component
- All existing route files keep their `Route = createFileRoute(...)` exports; only the component bodies change
- Fallback: if a Spanish field is missing, render English so nothing ever appears blank
- All cross-links inside Spanish pages stay within `/es/...`; CTA links to non-translated pages (e.g. `/book`, `/services/dealership`) remain English (these aren't being translated this pass) and a Spanish helper note explains that the booking flow is in English

### Files

Created (~10):
- `src/lib/i18n.ts`
- `src/components/site/LanguageToggle.tsx`
- `src/components/faq/FaqDetail.tsx`
- `src/components/faq/FaqCategoryIndex.tsx`
- `src/components/faq/KnowledgeHub.tsx`
- 7 × `src/routes/es.faq.*.tsx`

Edited (~7):
- `src/lib/{homeowners,bonds,dealership}-faqs.ts` (add `_es` fields + helper)
- `src/routes/faq.index.tsx` + 6 existing FAQ route files (swap bodies for shared components, add toggle)
