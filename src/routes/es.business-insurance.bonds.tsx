import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * EN /bonds has been consolidated and rewritten. The ES translation will be
 * published in the next translation batch; until then send Spanish visitors
 * to the Knowledge Center home so the URL never 404s.
 */
export const Route = createFileRoute("/es/business-insurance/bonds")({
  beforeLoad: () => {
    throw redirect({ to: "/es" });
  },
});
