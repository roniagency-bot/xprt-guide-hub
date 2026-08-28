import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/garage")({
  component: GarageRedirect,
});

function GarageRedirect() {
  useEffect(() => {
    window.location.replace("/garage/index.html");
  }, []);

  return null;
}
