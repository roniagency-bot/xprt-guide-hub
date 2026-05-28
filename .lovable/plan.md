## Goal

Combine `/about` and `/contact` into a single, high-trust `/about` page that tells the firm's story, introduces the team with real faces and direct contact info, and houses the offices + lead form. `/contact` redirects to `/about#contact`.

## Page structure (new `/about`)

1. **Hero** — short mission statement, founder name, dual-state badge (NV + CO), licenses (NV 3762886 · CO 759040).
2. **Story** — 2–3 short paragraphs (keep existing About copy, lightly edited).
3. **Team** — 21st.dev *Kinetic Team Hybrid* component, adapted to our design tokens. Four cards:
   - Veronica I. Rivera-Nuñez — Founder · CO Bond, Commercial & CO Specialist
   - Sindy F. Acosta-Correa — Las Vegas Personal Insurance Specialist
   - Mayela Masters — Las Vegas Insurance Producer
   - Yasmin Munoz — Las Vegas CSR

   Each card: headshot, name, role, direct phone (`tel:` link), direct email (`mailto:` link), 1-line specialty. Phone/email left as `TODO` placeholders you fill after.
4. **Offices** — both NAP blocks (Las Vegas + Denver) with map embeds, hours, and main office numbers.
5. **Contact / Book** — anchor `#contact`: the existing GHL form + "Book a Review" CTA.
6. **Trust strip** — licenses, carrier logos, speakable summary.

## Component install + integration

- Run `npx shadcn@latest add https://21st.dev/r/daiwiikharihar17147/kinetic-team-hybrid` to drop the component into `src/components/ui/`.
- Review its dependencies (likely `framer-motion`, possibly `gsap`); install any missing ones via `bun add`.
- Rewrite hard-coded colors to semantic tokens (`bg-background`, `text-foreground`, `text-primary`, etc.) per the design system rules — no raw hex.
- Wrap it in a typed `TeamSection` at `src/components/site/TeamSection.tsx` that accepts a `members` array, so the team data lives in one place (`src/data/team.ts`).
- Reserve `src/assets/team/{veronica,sindy,mayela,yasmin}.jpg` as the import paths. Until you upload, render a branded monogram fallback (initials on `bg-primary`) so layout is never broken.

## Routing + SEO

- Move `/contact` content into `/about` sections, then make `src/routes/contact.tsx` a 301-style redirect to `/about#contact` (TanStack `redirect` in `beforeLoad`).
- Update `head()` on `/about` with merged title/description ("About & Contact — XPRT Insurance | NV & CO").
- Add `Person` JSON-LD entries for each team member (name, jobTitle, telephone, email, worksFor → InsuranceAgency `@id`) — strong E-A-T signal for YMYL.
- Add `speakable` class to the hero summary.
- Update internal links (header nav, footer, sitemap.xml, llms.txt) so any `/contact` reference points to `/about#contact`.

## Design direction

Match the existing site (current palette, typography, spacing). The Kinetic Team component brings its own motion (hover lift + parallax); we'll keep that but throttle intensity to feel professional, not playful — appropriate for an insurance brand. No separate `create_directions` round unless you want one after seeing the first build.

## Files touched

- new: `src/components/ui/kinetic-team-hybrid.tsx` (via shadcn CLI)
- new: `src/components/site/TeamSection.tsx`
- new: `src/data/team.ts`
- new: `src/assets/team/` (placeholder slots)
- edit: `src/routes/about.tsx` (full rebuild with sections above)
- edit: `src/routes/contact.tsx` (redirect to `/about#contact`)
- edit: `src/components/site/SiteHeader.tsx` (nav: remove Contact or repoint to /about#contact)
- edit: `src/components/site/SiteFooter.tsx` (link updates)
- edit: `src/routes/sitemap.xml.tsx`, `public/llms.txt`
- edit: `src/lib/seo.ts` (add Person JSON-LD helper)

## What I need from you after approval

1. Headshots (4 JPGs, square, ~800×800) — drop them in chat.
2. Direct phone + email for each of the four team members.

I can ship the page immediately with monogram placeholders and `TODO` contact fields, then swap in the real data the moment you send it.
