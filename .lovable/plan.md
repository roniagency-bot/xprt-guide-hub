## Goal

Two deliverables in one pass:

1. Lock down email deliverability for the sending domain (DKIM, SPF, DMARC) and ship a verification checklist you can run after every publish.
2. Extend the Spanish `/es` structure — but only to sections that are genuinely complete, so we don't ship empty translated pages or dead toggles.

---

## Part 1 — Email authentication (DKIM / SPF / DMARC)

**Current state:** the sending domain `notify.www.xprtinsurance.com` is verified through Lovable Emails. Because that subdomain is delegated to Lovable's nameservers (`ns5/ns6.lovable.cloud`), the SPF (`TXT v=spf1 ...`), DKIM (Mailgun selector CNAME), and MX records are auto‑provisioned and rotated by Lovable. There is no manual record to add at the registrar for the sending subdomain itself.

**What we'll do:**
- Add a **DMARC** record at the registrar level for `www.xprtinsurance.com` (the registrar still controls DNS for the parent domain). Recommended record:
  - Host: `_dmarc.www.xprtinsurance.com`
  - Type: `TXT`
  - Value: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@xprtinsurance.com; ruf=mailto:dmarc-reports@xprtinsurance.com; fo=1; adkim=r; aspf=r; pct=100`
  - Start at `p=quarantine`; move to `p=reject` after 2 weeks of clean reports.
- Generate a downloadable **deliverability checklist** (Markdown) covering DKIM, SPF, DMARC, suppression hygiene, and post‑publish smoke tests. Saved to `/mnt/documents/email-deliverability-checklist.md`.
- No code changes required for SPF/DKIM — they are already live through Lovable's managed zone.

**Note for the user:** the `_dmarc` record above must be added at your registrar where `xprtinsurance.com` itself is hosted (not inside Lovable's `notify` zone). Lovable can't add it for you because it lives outside the delegated subdomain.

---

## Part 2 — Spanish `/es` structure (only completed sections)

### Already shipped in Spanish (keep, no changes)
- `/es/faq` — Knowledge Center index
- `/es/faq/homeowners` + `/es/faq/homeowners/$slug`
- `/es/faq/bonds` + `/es/faq/bonds/$slug`
- `/es/faq/dealership` + `/es/faq/dealership/$slug` *(was built in earlier turn; leaving in place so the existing toggle and sitemap entries don't 404)*

### Audit of service pages
| Page | Lines | Status | Spanish action |
| --- | --- | --- | --- |
| `personal.homeowners-insurance.tsx` | 402 | **Complete** | Create `/es/personal/homeowners-insurance` |
| `business-insurance.bonds.tsx` | 501 | **Complete** | Create `/es/business-insurance/bonds` |
| `personal.auto-insurance.tsx` | 59 | Stub / placeholder | **Skip** (no ES route) |
| `personal.landlord-insurance.tsx` | 59 | Stub / placeholder | **Skip** |
| `personal.renters-insurance.tsx` | 58 | Stub / placeholder | **Skip** |

### Files to add
- `src/routes/es.personal.homeowners-insurance.tsx`
- `src/routes/es.business-insurance.bonds.tsx`

Each new ES page will:
- Mirror the EN layout/components but render Spanish copy (headings, CTAs, FAQ blocks, disclosure text).
- Use `pageHead({ locale: "es", alternates: { en, es } })` so `<title>`, meta description, OG, canonical, and hreflang are all Spanish — no English metadata leaks through.
- Emit Spanish `BreadcrumbList` and (where applicable) `Service` / `FAQPage` JSON‑LD with Spanish `name` / `description` and `/es/...` URLs.
- Reuse the existing English forms, PDFs, and download tokens — the lead form already detects `lang` from `source_path`, so submissions from `/es/...` already trigger the Spanish tripwire email.

### EN ↔ ES toggle behavior
The shared `LanguageToggle` already maps a current path to its localized counterpart via the route's `alternates` map. We'll:
- Add `alternates: { en: "/personal/homeowners-insurance", es: "/es/personal/homeowners-insurance" }` to both EN and ES homeowners service pages.
- Same pair for the bonds service pages.
- For pages that have no Spanish equivalent (auto, renters, landlord, about, book, contact, etc.), the toggle will fall back to `/es` (Knowledge Center) instead of producing a 404 — preventing any dead links.

### Sitemap
The dynamic sitemap already enumerates routes from `routeTree.gen.ts`, so the two new `/es/...` URLs will be picked up automatically with their hreflang alternates on the next build.

### Guardrails enforced
- English routes are not touched (only their `alternates` map is extended).
- No Spanish version is created for any incomplete page → no empty translated content.
- Dealership ES FAQ stays as‑is to preserve the working toggle from earlier work.
- Existing English pages, lead forms, gated PDFs, and tracked download links continue to work unchanged (verified end‑to‑end last turn).

---

## Technical notes

- ES service pages will pull through the same component primitives (`<Hero>`, `<FAQAccordion>`, `<LeadCaptureForm>`) so style, analytics, and form wiring stay consistent — only copy props and `pageHead` change.
- `LanguageToggle` change is a one‑line fallback: `to = currentRoute.alternates?.[targetLang] ?? (targetLang === "es" ? "/es" : "/")`.
- DMARC text record is the only DNS change you need to make at your registrar; everything else is already authenticated through Lovable's managed zone.

---

## Out of scope (intentionally deferred)

- Spanish versions of `personal.auto-insurance`, `personal.landlord-insurance`, `personal.renters-insurance` — pending real EN content.
- Spanish versions of `about`, `contact`, `book`, `states/$state`, `offers/$slug`, `thank-you/$slug`.
- Switching DMARC from `p=quarantine` to `p=reject` (do that after 2 weeks of clean reports).
