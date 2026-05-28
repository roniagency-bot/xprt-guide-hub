import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/ui/kinetic-team-hybrid";
import { TEAM } from "@/data/team";
import { pageHead, orgJsonLd, teamPersonJsonLd, SITE } from "@/lib/seo";
import {
  ShieldCheck,
  GraduationCap,
  Languages,
  ScrollText,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/es/about")({
  head: () => {
    const team = TEAM.map((m) =>
      teamPersonJsonLd({
        name: m.name,
        jobTitle: m.roleEs,
        telephone: m.phone || undefined,
        email: m.email || undefined,
        worksLocation: m.location,
      }),
    );
    return pageHead({
      title: "Conoce a los XPRTs — XPRT Insurance | NV y CO",
      description:
        "Conoce a los XPRTs — asesores y productores bilingües en Las Vegas y Denver. Teléfonos directos, correos y oficinas para cobertura personal, comercial, fianzas y concesionarios.",
      path: "/es/about",
      locale: "es",
      alternates: { en: "/about", es: "/es/about" },
      jsonLd: [orgJsonLd(), ...team],
    });
  },
  component: AboutEs,
});

function AboutEs() {
  return (
    <>
      <section className="bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Inicio", path: "/es" }, { name: "Conoce a los XPRTs" }]} />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl">
            <Eyebrow>Conoce a los XPRTs</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              El equipo detrás de cada póliza.
            </h1>
            <p className="speakable mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              XPRT Insurance es una agencia independiente con licencia en Nevada (NV DOI #3762886) y
              Colorado (CO DOI #759040). Asesores y productores bilingües en Las Vegas y Denver —
              cobertura personal, comercial, fianzas y para concesionarios de Nevada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#team">
                <Button variant="outline" size="lg">Conoce a los XPRTs</Button>
              </a>
              <a href="#contact">
                <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  Contáctanos
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team — kinetic 21st.dev component on ink surface */}
      <section id="team" className="scroll-mt-24">
        <TeamSection />
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Nuestro estándar" title="Educar primero. Vender, nunca." />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-7">
            <p>
              La mayoría de los compradores de seguros no sabe qué hay en su póliza. Conocen el precio y
              el nombre de la aseguradora. Eso es todo. Creemos que es un problema que vale la pena resolver.
            </p>
            <p>
              Cada compromiso comienza con educación. Repasamos la declaración línea por línea.
              Explicamos costo de reemplazo, asegurado adicional, UM/UIM, primary and noncontributory
              — cada término que importa. Solo entonces hablamos de cotizaciones.
            </p>
            <p>
              El resultado son clientes que entienden exactamente lo que tienen y por qué. Eso es lo
              que queremos decir con claridad primero.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Lo que defendemos" title="Cuatro estándares. En cada compromiso." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Independiente", b: "Múltiples aseguradoras calificadas A. Trabajamos para ti, no para ellas." },
            { icon: GraduationCap, t: "Educativo", b: "Lenguaje claro. Sin tecnicismos. Explicaciones reales." },
            { icon: ScrollText, t: "Especialistas en fianzas", b: "Surety, licencia y permiso, contratista, fianzas de concesionario." },
            { icon: Languages, t: "Bilingüe", b: "Mismo estándar de asesoría en inglés y español." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-7">
              <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Offices */}
      <Section id="offices">
        <SectionHeading
          eyebrow="Oficinas"
          title="Dos estados. Un mismo estándar."
          intro="Visítanos, llámanos o reserva una revisión virtual. Servicio bilingüe en ambas ubicaciones."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SITE.addresses.map((a) => (
            <div key={a.addressLocality} className="rounded-xl border border-border bg-card p-7 shadow-elegant">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" />
                <h3 className="font-display text-xl">
                  {a.addressLocality}, {a.addressRegion}
                </h3>
              </div>
              <address className="mt-4 not-italic text-muted-foreground">
                <p>{a.streetAddress}</p>
                <p>
                  {a.addressLocality}, {a.addressRegion} {a.postalCode}
                </p>
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${a.telephone}`}>
                    <Phone className="mr-1.5 h-4 w-4" />
                    {formatPhone(a.telephone)}
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> Lun–Vie · 9am–6pm
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact / Book */}
      <Section id="contact" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contáctanos"
              title="Hablemos de cobertura."
              intro="Personal, comercial, fianzas, concesionarios — escríbenos y te conectaremos con el asesor adecuado."
            />
            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 hover:text-gold"
              >
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4" />
                {formatPhone(SITE.phone)} · Línea principal
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
              <h3 className="font-display text-2xl">Envíanos un mensaje</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cuéntanos qué necesitas cubrir — responderemos dentro de un día hábil.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <GhlFormButton
                  form="contact"
                  size="lg"
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  Enviar un mensaje
                </GhlFormButton>
                <GhlFormButton form="personal_quote" size="lg" variant="outline">
                  Obtener una cotización
                </GhlFormButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

/** +17253442211 → (725) 344-2211 */
function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "").replace(/^1/, "");
  if (digits.length !== 10) return e164;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
