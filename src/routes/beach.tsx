import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Short, QR-friendly alias for the Beach & Boujie community landing page.
 *
 * Use xprtinsurance.com/beach on flyers, posts, and QR codes. It permanently
 * redirects (301) to the canonical page at xprtinsurance.com/community so
 * search engines and AI crawlers treat /community as the primary URL.
 */
export const Route = createFileRoute("/beach")({
  beforeLoad: () => {
    throw redirect({ to: "/community", statusCode: 301 });
  },
});

