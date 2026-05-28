import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/es/book")({
  head: () =>
    pageHead({
      title: "Reserva una revisión gratuita de cobertura | XPRT Insurance",
      description:
        "Reserva una revisión gratuita de 20 minutos con un asesor licenciado. Educativa, sin obligación, bilingüe.",
      path: "/es/book",
      locale: "es",
      alternates: { en: "/book", es: "/es/book" },
    }),
  component: BookEs,
});

function BookEs() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Inicio", path: "/es" }, { name: "Reservar una revisión" }]} />
        </div>
        <div className="container-prose grid gap-12 pb-20 pt-10 md:pb-28 md:pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Revisión gratuita de 20 minutos</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Reserva una revisión gratuita de cobertura.
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
              Revisaremos tu cobertura actual, identificaremos posibles vacíos y te explicaremos
              todo con claridad — sin presión ni tecnicismos.
            </p>
            <ul className="mt-8 space-y-3 text-base">
              {[
                "20 minutos, por teléfono o video",
                "Trae tu declaración (declarations page) actual",
                "Bilingüe: inglés o español",
                "Con licencia en Nevada y Colorado",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-muted-foreground">
              Usa el calendario a la derecha para escoger un horario — solo toma unos segundos.
            </p>
          </div>

          <div className="lg:col-span-6">
            <p className="mb-4 text-center text-sm font-medium text-foreground md:text-base">
              Elige un horario que te funcione — toma menos de 30 segundos.
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant ring-1 ring-gold/20">
              <GHLBookingEmbed />
            </div>

            <div className="mt-6 rounded-lg border border-border/60 bg-background/50 px-5 py-4 text-center text-sm text-muted-foreground">
              ¿Prefieres no agendar en línea? También puedes{" "}
              <a href="tel:+17253442211" className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold">
                <Phone className="h-3.5 w-3.5" /> llamarnos
              </a>{" "}
              o{" "}
              <Link to="/es/contact" className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold">
                <Mail className="h-3.5 w-3.5" /> enviar un mensaje
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GHLBookingEmbed() {
  useEffect(() => {
    const SRC = "https://link.xprtinsurance.com/js/form_embed.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src="https://link.xprtinsurance.com/widget/booking/gdCQpOEIBzTvMZs419sO"
      style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "720px" }}
      scrolling="no"
      id="gdCQpOEIBzTvMZs419sO_1777664456604"
      title="Reservar una revisión gratuita de cobertura"
    />
  );
}
