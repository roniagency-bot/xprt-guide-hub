import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Consolidated to /bonds. SSR returns a 307 via TanStack's redirect throw;
 * client navigation hits the same target. Update inbound links to /bonds.
 */
export const Route = createFileRoute("/business-insurance/bonds")({
  beforeLoad: () => {
    throw redirect({ to: "/bonds" });
  },
});
