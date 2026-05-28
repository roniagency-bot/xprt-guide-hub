import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Spanish translation of /bonds ships in the next translation batch. Until
 * then, send visitors to the Spanish Knowledge Center home so the URL never
 * 404s. Replace this with a full ES page when the translation lands.
 */
export const Route = createFileRoute("/es/bonds")({
  beforeLoad: () => {
    throw redirect({ to: "/es" });
  },
});
