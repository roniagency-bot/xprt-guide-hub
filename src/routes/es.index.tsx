import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Car,
  Building2,
  ScrollText,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import heroAgency from "@/assets/hero-agency.jpg";
import { pageHead, orgJsonLd, canonical } from "@/lib/seo";

const STAGGER = [0, 75, 150, 225, 225, 225] as const;

export const Route = createFileRoute("/es/")({
  head: () =>
    pageHead({
      title: "XPRT Insurance | Agencia en Nevada y Colorado",
      description:
        "Agencia de seguros independiente con licencia en Nevada y Colorado. Cobertura educativa y asesorada para personal, comercial, fianzas y concesionarios de Nevada.",
      path: "/es",
      locale: "es",
      alternates: { en: "/", es: "/es" },
      image: canonical("/og-default.jpg"),
      jsonLd: orgJsonLd(),
    }),
  component: HomePageEs,
});

const SERVICES = [
  {
    icon: Home,
    title: "Seguros Personales",
    description: "Auto, hogar, inquilinos, propietarios de alquiler y umbrella — estructurados correctamente.",
    to: "/services/personal",
  },
  {
    icon: ScrollText,
    title: "Fianzas",
    description: "Surety, licencia y permiso, contratista, concesionario y judiciales. Nuestra especialidad.",
    to: "/es/business-insurance/bonds",
    badge: "Nuestra especialidad",
    featured: true,
  },
  {
    icon: Car,
    title: "Seguros para Concesionarios",
    description: "Garage liability, dealer open lot y dealer bonds — para concesionarios con licencia en Nevada.",
    to: "/services/dealership",
    badge: "Solo NV",
  },
  {
    icon: Building2,
    title: "Seguros Comerciales",
    description: "Responsabilidad general, compensación laboral, auto comercial y póliza BOP.",
    to: "/services/commercial",
  },
] as const;

function HomePageEs() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose grid gap-12 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6 fade-in-up">
            <Eyebrow>Nevada y Colorado · Agencia independiente</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              La mayoría de las pólizas se ven bien
              <span className="text-muted-foreground">…</span>
              <span className="block italic text-muted-foreground">hasta que realmente las necesitas.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Seguros personales, cobertura comercial, fianzas y programas para concesionarios —
              construidos en torno a cómo realmente vives y trabajas. Primero educación. Nunca presión de venta.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="btn-gold-shimmer bg-gold text-gold-foreground shadow-lift hover:bg-gold/90">
                <Link to="/es/book">
                  Reserva tu revisión gratuita de cobertura
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/es/faq">Explora el Centro de Conocimiento</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-border">
              <img
                src={heroAgency}
                alt="XPRT Insurance — protegiendo hogares, autos, negocios y contratistas en Nevada y Colorado"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 text-primary-foreground md:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Independiente · Nevada y Colorado
                </div>
                <p className="mt-2 font-display text-2xl leading-tight">
                  Personal, comercial, fianzas y concesionarios — un solo estándar de asesoría.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  Revisamos cada línea de cada póliza para que entiendas exactamente lo que tienes.
                </p>
                <Link
                  to="/es/book"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80"
                >
                  Reservar una revisión gratuita →
                </Link>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-gold/15 blur-2xl md:block" />
          </div>
        </div>
      </section>

      <Reveal><TrustBar /></Reveal>

      {/* SERVICES */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Cobertura"
            title="Cobertura estructurada para cada línea"
            intro="Cuatro áreas de práctica. Un solo estándar de asesoría. Cada póliza revisada línea por línea para que entiendas lo que tienes."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.to} delay={STAGGER[i] ?? 225}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY CLIENTS CHOOSE */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Por qué XPRT"
              title="Independiente. Educativa. Construida sobre la claridad."
              intro="Trabajamos para ti, no para las aseguradoras. Nuestro proceso comienza por entender lo que proteges — luego estructuramos cobertura que realmente coincida."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                icon: ShieldCheck,
                title: "Agencia independiente",
                body: "Múltiples aseguradoras calificadas A. Recomendaciones basadas en tu situación, no en una cuota.",
              },
              {
                icon: GraduationCap,
                title: "Educación primero",
                body: "Explicamos costo de reemplazo, UM/UIM, asegurado adicional y todo término — con claridad.",
              },
              {
                icon: ScrollText,
                title: "Especialistas en fianzas",
                body: "Surety, licencia y permiso, contratista, fianzas de concesionario. Conocemos a los suscriptores.",
              },
              {
                icon: Sparkles,
                title: "Servicio bilingüe",
                body: "Inglés y Español, con el mismo estándar de asesoría en ambos idiomas.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={STAGGER[i] ?? 225}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
                  <h3 className="mt-4 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="El proceso"
            title="Cómo funciona una revisión de cobertura"
            intro="Un recorrido simple y estructurado. No requiere cotización para comenzar."
          />
        </Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Descubrimiento", b: "Llamada de 20 minutos para entender tu situación, activos y pólizas actuales." },
            { n: "02", t: "Educación", b: "Explicamos la cobertura línea por línea — qué paga cada sección y dónde fallan la mayoría de las pólizas." },
            { n: "03", t: "Recomendación", b: "Si podemos estructurarla mejor, te mostramos opciones lado a lado. Si no, también te lo decimos." },
          ].map((step, i) => (
            <Reveal key={step.n} as="li" delay={STAGGER[i] ?? 225} className="relative">
              <span className="font-display text-5xl text-gold">{step.n}</span>
              <h3 className="mt-3 font-display text-2xl">{step.t}</h3>
              <p className="mt-2 text-muted-foreground">{step.b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* FAQ ENTRY */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Centro de conocimiento"
              title="Orientación de seguros, organizada con claridad."
              intro="Comienza con lo básico y profundiza. Cada artículo conecta con la siguiente etapa para que construyas conocimiento paso a paso."
            />
            <Button asChild className="mt-8" variant="outline">
              <Link to="/es/faq">
                Abrir el Centro de Conocimiento
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-3 lg:col-span-7">
            {[
              { stage: "Conceptos básicos", q: "¿Qué cubre realmente el seguro de propietarios?", slug: "what-does-homeowners-insurance-cover" },
              { stage: "Cobertura y costo", q: "Costo de reemplazo vs valor en efectivo real — ¿cuál es la diferencia?", slug: "replacement-cost-vs-actual-cash-value" },
              { stage: "Listo para una revisión", q: "¿Cómo reviso mi póliza con un asesor?", slug: "how-to-review-homeowners-policy-with-an-advisor" },
            ].map((f, i) => (
              <Reveal key={f.slug} delay={STAGGER[i] ?? 225}>
                <Link
                  to="/es/faq/homeowners/$slug"
                  params={{ slug: f.slug }}
                  className="group flex items-start justify-between gap-6 rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
                >
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{f.stage}</span>
                    <p className="mt-1.5 font-display text-xl text-foreground">{f.q}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Reveal><CTASection /></Reveal>
    </>
  );
}
