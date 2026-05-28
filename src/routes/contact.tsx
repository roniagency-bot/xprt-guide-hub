import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * /contact has been merged into /about. Redirect to the contact anchor so old
 * links and external citations keep working. SSR sends a 307 via TanStack's
 * redirect throw; client navigation hits the same target.
 */
export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/about", hash: "contact" });
  },
});
