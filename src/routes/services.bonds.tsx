import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy /services/bonds URL. Consolidated to /bonds.
 */
export const Route = createFileRoute("/services/bonds")({
  beforeLoad: () => {
    throw redirect({ to: "/bonds" });
  },
});
