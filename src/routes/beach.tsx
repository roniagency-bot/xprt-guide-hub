import { createFileRoute, redirect } from "@tanstack/react-router";

/** Short, QR-friendly alias for the Beach & Boujie community landing page. */
export const Route = createFileRoute("/beach")({
  beforeLoad: () => {
    throw redirect({ to: "/community" });
  },
});
