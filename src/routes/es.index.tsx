import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/es/")({
  beforeLoad: () => {
    throw redirect({ to: "/es/faq" });
  },
});
