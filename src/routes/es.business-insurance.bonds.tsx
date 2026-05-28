import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Consolidated to /es/bonds.
 */
export const Route = createFileRoute("/es/business-insurance/bonds")({
  beforeLoad: () => {
    throw redirect({ to: "/es/bonds" });
  },
});
