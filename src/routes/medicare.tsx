import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/medicare")({
  component: MedicareRedirect,
});

function MedicareRedirect() {
  useEffect(() => {
    // keep ?lang=es and campaign (utm_*) parameters when handing off to the static page
    window.location.replace("/medicare/index.html" + window.location.search);
  }, []);

  return null;
}
