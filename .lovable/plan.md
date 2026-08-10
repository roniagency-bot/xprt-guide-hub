# URL strategy for the community event landing page

The current setup is correct: `/beach` redirects to `/community` in the route tree, and `/community` is the canonical page with full SEO metadata and event schema. No structural change is needed.

Recommended approach: keep `/beach` as the short, QR-friendly alias, and make `/community` the canonical URL. This gives you the best of both worlds — a short, easy-to-type/scan link for marketing, plus a descriptive page URL that performs better for SEO and social sharing.

## Plan

1. **Confirm the redirect is intentional**
   - Keep `src/routes/beach.tsx` as a redirect to `/community`.
   - Add a code comment explaining that `/beach` is the short alias for QR/post use.

2. **Make the redirect permanent (301) for SEO**
   - Update `redirect({ to: "/community" })` to `redirect({ to: "/community", statusCode: 301 })` so search engines and AI crawlers treat `/beach` as permanently moved to `/community`.

3. **Ensure `/community` is the canonical URL**
   - The `/community` page already sets its own canonical; no change needed.

4. **No QR code or posting changes needed yet**
   - When you later create QR codes or social posts, use `xprtinsurance.com/beach` — it will land on the `/community` page.

## What to tell visitors

For marketing, use: **xprtinsurance.com/beach**  
For SEO and social canonical, the page is: **xprtinsurance.com/community**

No user-facing content changes; this is a small technical SEO tightening of the redirect.
