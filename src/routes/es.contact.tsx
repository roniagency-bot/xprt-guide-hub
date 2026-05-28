import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * /es/contact se ha fusionado con /es/about. Redirige al ancla de contacto para
 * que los enlaces antiguos y citas externas sigan funcionando.
 */
export const Route = createFileRoute("/es/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/es/about", hash: "contact" });
  },
});
