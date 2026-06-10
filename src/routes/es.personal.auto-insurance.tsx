import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Car,
  FileText,
  Calendar,
  BookOpen,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";

const EN_PATH = "/personal/auto-insurance";
const ES_PATH = "/es/personal/auto-insurance";

/**
 * Twin español de /personal/auto-insurance. Misma estructura, esquema y CTAs
 * que la página en inglés, con contenido nativo en español de EE. UU. y
 * hreflang bidireccional.
 */

const AUTO_FAQS_ES = [
  {
    question: "¿Qué cobertura de seguro de auto es obligatoria en Nevada?",
    answer:
      "Nevada exige límites mínimos de responsabilidad civil de $25,000 por persona / $50,000 por accidente por lesiones corporales y $20,000 por daños a la propiedad (25/50/20). Son mínimos estatales — no alcanzan para la mayoría de los accidentes reales. La mayoría de los conductores en Las Vegas, Henderson o Reno se benefician con 100/300/100 o más, además de cobertura de conductor sin seguro o con seguro insuficiente (UM/UIM) en los mismos límites.",
  },
  {
    question: "¿Qué cobertura de seguro de auto es obligatoria en Colorado?",
    answer:
      "Colorado exige responsabilidad mínima de $25,000 por persona / $50,000 por accidente por lesiones corporales y $15,000 por daños a la propiedad (25/50/15). La aseguradora debe ofrecer UM/UIM en los mismos límites — puedes rechazarla por escrito, pero para la mayoría de los conductores en Denver, Aurora y Colorado Springs es la línea de mayor valor de la póliza después de la responsabilidad civil.",
  },
  {
    question: "¿Qué incluye realmente la cobertura completa de auto?",
    answer:
      "'Cobertura completa' (full coverage) no es un tipo de póliza — es una forma de decir responsabilidad civil + comprensiva + colisión. La responsabilidad paga a otros cuando tú tienes la culpa. La comprensiva cubre robo, granizo, incendio, vandalismo y choques con animales. La colisión cubre daños a tu propio vehículo por un accidente. La mayoría de los prestamistas exige comprensiva y colisión mientras tengas el auto financiado o arrendado.",
  },
  {
    question: "¿Qué es la cobertura UM/UIM y la necesito?",
    answer:
      "La cobertura UM/UIM paga tus gastos médicos y, en algunos casos, daños materiales si el conductor culpable no tiene seguro o tiene poco. Aproximadamente 1 de cada 8 conductores en EE. UU. no tiene seguro, y la cifra es mayor en zonas como Las Vegas. Recomendamos UM/UIM con los mismos límites que tu responsabilidad civil — es una de las partes más baratas y más importantes de una póliza real.",
  },
  {
    question: "¿Mi seguro de auto cubre Uber, Lyft o entregas?",
    answer:
      "Las pólizas personales estándar excluyen el uso comercial. Manejar para Uber, Lyft, DoorDash o Instacart activa exclusiones durante el período en línea y durante los viajes activos. Necesitas un endoso de rideshare/entregas o una póliza comercial. Sin ella, un accidente con culpa mientras estás conectado a la app puede dejarte personalmente responsable.",
  },
  {
    question: "¿Cuánto cuesta el seguro de auto en Nevada y Colorado?",
    answer:
      "La prima depende del código postal, el vehículo, tu historial de manejo, el puntaje de crédito de seguros, los límites de cobertura y los deducibles. Las áreas metropolitanas de Las Vegas y Denver suelen ser más caras que las zonas rurales por la frecuencia de accidentes, el robo y el porcentaje de conductores sin seguro. La verdad: la prima más barata con los mínimos casi siempre termina costando más después de un accidente.",
  },
  {
    question: "¿Qué es un deducible y cómo elijo el monto correcto?",
    answer:
      "Un deducible es lo que tú pagas de tu bolsillo en un reclamo de comprensiva o colisión antes de que la aseguradora pague el resto. Las opciones comunes son $500, $1,000 y $2,500. Un deducible más alto baja la prima pero aumenta tu exposición en un reclamo. Elige el deducible más alto que puedas pagar mañana sin desordenar tus finanzas.",
  },
  {
    question: "¿Mi seguro de auto cubre un auto de renta después de un accidente?",
    answer:
      "Solo si tienes la cobertura de reembolso de auto de renta. Suele costar pocos dólares al mes y paga un límite diario (típicamente $30–$50/día) por una cantidad de días mientras reparan tu auto tras una pérdida cubierta. Sin esa cobertura, la renta sale de tu bolsillo.",
  },
  {
    question: "¿Cuándo conviene una póliza paraguas (umbrella) para auto?",
    answer:
      "Un umbrella agrega $1 millón o más de responsabilidad civil sobre tus pólizas de auto y vivienda por una prima relativamente baja. Si eres dueño de una casa, tienes ahorros importantes, hay conductores adolescentes en la casa o tienes mayor exposición (muchas millas en autopista, remolques, reputación profesional), un umbrella suele ser la póliza con mayor apalancamiento que puedes comprar.",
  },
  {
    question: "¿Cada cuánto debo revisar mi póliza de auto?",
    answer:
      "En cada renovación (cada 6 o 12 meses) y después de cualquier evento de vida: vehículo nuevo, conductor nuevo, cambio de dirección, matrimonio, hijo adolescente conduciendo, auto pagado, o trabajo de rideshare/entregas. Una revisión de 20 minutos con un asesor licenciado detecta vacíos antes de que se conviertan en negaciones de reclamo.",
  },
];

const COVERAGE_PARTS_ES = [
  {
    title: "Responsabilidad por Lesiones Corporales",
    body:
      "Paga por las lesiones que tú causas a otros. Los mínimos de Nevada y Colorado son bajos; la mayoría de los conductores debe llevar 100/300 o más.",
  },
  {
    title: "Responsabilidad por Daños a la Propiedad",
    body:
      "Paga por los daños que causas a otros vehículos, cercas, edificios o infraestructura. Los mínimos estatales rara vez cubren el valor real de un vehículo moderno.",
  },
  {
    title: "Conductor sin Seguro / con Seguro Insuficiente (UM/UIM)",
    body:
      "Paga tus gastos médicos y salarios perdidos cuando el conductor culpable no tiene seguro o tiene poco. Mantenlo en los mismos límites que tu responsabilidad civil.",
  },
  {
    title: "Comprensiva (otra que no sea colisión)",
    body:
      "Robo, granizo, incendio, vandalismo, vidrios, objetos que caen, choques con animales. Requerida por el prestamista mientras tengas el auto financiado o arrendado.",
  },
  {
    title: "Colisión",
    body:
      "Daños a tu propio vehículo por un choque, independientemente de quién tenga la culpa. Sujeta al deducible que elijas.",
  },
  {
    title: "Pagos Médicos / PIP",
    body:
      "Paga gastos médicos para ti y tus pasajeros sin importar la culpa. Útil incluso si ya tienes seguro de salud.",
  },
];

const NOT_COVERED_ES = [
  {
    title: "Rideshare y entregas",
    body:
      "La póliza personal excluye Uber, Lyft, DoorDash e Instacart durante los períodos activos. Requiere un endoso de rideshare/entregas o una póliza comercial.",
  },
  {
    title: "Uso comercial",
    body:
      "Usar tu vehículo personal para trabajo pagado (visitas a clientes, mover herramientas, ventas) puede activar exclusiones. La cobertura correcta es auto comercial.",
  },
  {
    title: "Conductores excluidos",
    body:
      "Cualquier persona firmada como 'excluida' en la póliza no tiene cobertura cuando maneja el auto — incluso con permiso. Sorpresa común tras un cambio en el hogar.",
  },
  {
    title: "Desgaste y falla mecánica",
    body:
      "El seguro de auto paga pérdidas súbitas y accidentales — no frenos, transmisiones o motores que envejecen. La cobertura de falla mecánica es un complemento aparte.",
  },
  {
    title: "Partes y equipo personalizado",
    body:
      "Rines aftermarket, estéreo, kits de elevación y wraps tienen límites bajos o están excluidos. Requiere un endoso de equipo personalizado con valor declarado.",
  },
  {
    title: "Manejo fuera del país",
    body:
      "La mayoría de las pólizas de EE. UU. no se extiende a México y tiene cobertura limitada en Canadá. Compra una póliza turística mexicana para cualquier viaje transfronterizo.",
  },
];

const TRUST_ITEMS_ES = [
  "Con licencia en Nevada y Colorado",
  "Agencia independiente",
  "Servicio bilingüe",
  "Educamos primero, nunca vendemos a presión",
];

export const Route = createFileRoute("/es/personal/auto-insurance")({
  head: () => {
    const title = "Seguro de Auto en Nevada y Colorado | XPRT Insurance";
    const description =
      "Entiende los límites del seguro de auto, UM/UIM, comprensiva, colisión y los vacíos de rideshare. Revisiones de cobertura educativas para conductores de Nevada y Colorado.";
    const jsonLd: Record<string, unknown>[] = [
      orgJsonLd(),
      breadcrumbJsonLd([
        { name: "Inicio", path: "/es" },
        { name: "Personal", path: "/es" },
        { name: "Seguro de Auto", path: ES_PATH },
      ]),
      serviceJsonLd({
        name: "Seguro de Auto — Nevada y Colorado",
        description,
        path: ES_PATH,
        areaServed: ["Nevada", "Colorado"],
      }),
      faqPageJsonLd(AUTO_FAQS_ES, {
        path: ES_PATH,
        locale: "es",
        speakableSelectors: ["#answer-block", "[data-speakable]"],
      }),
    ];
    return pageHead({
      title,
      description,
      path: ES_PATH,
      image: canonical("/og-default.jpg"),
      locale: "es",
      alternates: { en: EN_PATH, es: ES_PATH },
      jsonLd,
    });
  },
  component: AutoHubEs,
});

function AutoHubEs() {
  return (
    <>
      {/* HERO + BLOQUE DE RESPUESTA */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14 flex items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/es" },
              { name: "Personal", path: "/es" },
              { name: "Seguro de Auto" },
            ]}
          />
          <LanguageToggle current="es" />
        </div>
        <div className="container-prose grid gap-12 pb-20 pt-8 md:pb-28 md:pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7 fade-in-up">
            <Eyebrow>Personal · Auto</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Seguro de Auto en Nevada y Colorado — entiende qué paga tu póliza antes del accidente.
            </h1>
            <p
              id="answer-block"
              data-speakable
              className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              El seguro de auto paga por lesiones y daños tras un accidente cubierto, pero los
              mínimos estatales de Nevada (25/50/20) y Colorado (25/50/15) casi nunca alcanzan
              para un choque real. La póliza correcta combina responsabilidad civil, conductor sin
              seguro (UM/UIM), comprensiva y colisión con límites que correspondan a lo que
              realmente tienes y ganas — no a la prima más barata en un comparador.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GhlFormButton
                form="personal_quote"
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                Solicitar Cotización de Auto
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </GhlFormButton>
              <Button asChild size="lg" variant="outline">
                <Link to="/es/book">Agenda una revisión gratuita</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <aside className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lift md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <Gauge className="h-5 w-5" />
                </span>
                <h2 className="font-display text-lg leading-tight">Respuesta rápida</h2>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-foreground">Mínimos en Nevada</dt>
                  <dd className="mt-1 text-muted-foreground">25/50/20 — lesiones corporales y daños a la propiedad.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Mínimos en Colorado</dt>
                  <dd className="mt-1 text-muted-foreground">25/50/15 — la aseguradora debe ofrecer UM/UIM en los mismos límites.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">"Cobertura completa" significa</dt>
                  <dd className="mt-1 text-muted-foreground">Responsabilidad + comprensiva + colisión (no es un tipo de póliza).</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Vacío más común</dt>
                  <dd className="mt-1 text-muted-foreground">UM/UIM bajo cuando el culpable no tiene seguro.</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="border-y border-border bg-background">
        <div className="container-prose py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground">
            {TRUST_ITEMS_ES.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>{t}</span>
                {i < TRUST_ITEMS_ES.length - 1 && <span className="hidden text-border md:inline">•</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTES DE LA PÓLIZA */}
      <Section id="cobertura" tone="cream">
        <SectionHeading
          eyebrow="Lo que hay en una póliza real"
          title="Las seis partes de toda póliza de auto personal"
          intro="Toda conversación seria sobre seguro de auto regresa a estas seis líneas. Lo que importa son los límites — los nombres son solo la envoltura."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {COVERAGE_PARTS_ES.map((c) => (
            <li key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="font-display text-xl leading-tight">{c.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* LO QUE NO ESTÁ CUBIERTO */}
      <Section id="no-cubierto">
        <div className="mx-auto max-w-5xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <Eyebrow>Léelo antes de firmar</Eyebrow>
              <h2 className="mt-3 text-balance font-display text-3xl leading-tight md:text-4xl">
                Lo que una póliza de auto estándar NO cubre
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground">
                Estos son los vacíos que se convierten en las sorpresas más caras después de un
                accidente. Casi todos pueden resolverse — pero solo con el endoso correcto o una
                póliza comercial separada <em>antes</em> de la pérdida.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {NOT_COVERED_ES.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-background p-5">
                <p className="font-display text-lg leading-tight text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">¿No estás seguro de cuáles aplican a ti?</p>
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/es/book">
                Agenda una revisión gratuita
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* GUÍA POR ESTADO */}
      <Section id="guias-por-estado" tone="cream">
        <SectionHeading
          eyebrow="Guía local"
          title="Seguro de auto por estado"
          intro="Las necesidades de cobertura cambian por región. Las Vegas y Reno tienen una de las tasas más altas de conductores sin seguro del país; Denver y el Front Range enfrentan temporadas de granizo que provocan pérdidas totales. Los límites correctos se ven distintos en cada mercado."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            to="/states/$state"
            params={{ state: "nevada" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Conductores en Nevada</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Las Vegas, Henderson, North Las Vegas, Reno y Sparks. Las altas tasas de conductores
              sin seguro y el tráfico turístico hacen que UM/UIM y umbrella sean las mejoras de
              mayor impacto.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Guía de cobertura en Nevada <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            to="/states/$state"
            params={{ state: "colorado" }}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-lift"
          >
            <h3 className="font-display text-2xl">Conductores en Colorado</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Denver, Aurora, Colorado Springs, Boulder y el Front Range. Los reclamos por granizo,
              los trayectos por la montaña y los conductores de altas millas definen cómo deben
              verse la comprensiva y la colisión.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Guía de cobertura en Colorado <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="preguntas">
        <SectionHeading
          eyebrow="Preguntas frecuentes de seguro de auto"
          title="Respuestas directas sobre cobertura de auto"
          intro="Las preguntas que más nos hacen los conductores de Nevada y Colorado. Optimizadas para lectura rápida, búsqueda por voz y citación por IA."
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {AUTO_FAQS_ES.map((qa) => (
            <details
              key={qa.question}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lift"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-left font-display text-lg leading-snug text-foreground">
                <span data-speakable>{qa.question}</span>
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p data-speakable className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {qa.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* COBERTURAS RELACIONADAS */}
      <Section id="relacionados" tone="cream">
        <SectionHeading
          eyebrow="Arma tu cobertura personal completa"
          title="Otras coberturas para revisar junto con auto"
          intro="El auto casi nunca va solo. Las páginas a continuación son las combinaciones más comunes que hacemos para clientes en Nevada y Colorado."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              to: "/es/personal/homeowners-insurance" as const,
              title: "Seguro de Vivienda",
              body:
                "Descuentos por combinar pólizas, elegibilidad de umbrella y revisión compartida de deducibles. La combinación más común con auto.",
              icon: BookOpen,
            },
            {
              to: "/personal/renters-insurance" as const,
              title: "Seguro de Inquilino",
              body:
                "Bienes personales y responsabilidad civil para arrendatarios. Combinable con auto para descuentos multi-póliza.",
              icon: FileText,
            },
            {
              to: "/personal/landlord-insurance" as const,
              title: "Seguro de Arrendador",
              body:
                "Cobertura de incendio de vivienda (DP-3), responsabilidad y pérdida de alquiler para dueños de propiedades en renta.",
              icon: Calendar,
            },
            {
              to: "/bonds/auto-dealer-bond" as const,
              title: "Fianza de Concesionario",
              body:
                "Fianza requerida para concesionarios de vehículos en Nevada — mismo asesor, especialidad de licencias y permisos.",
              icon: ShieldCheck,
            },
            {
              to: "/es/bonds" as const,
              title: "Fianzas y Comerciales",
              body:
                "Fianzas de contratista, licencia y permiso, y fidelidad. Nuestra especialidad para negocios en Nevada y Colorado.",
              icon: Car,
            },
            {
              to: "/es/about" as const,
              title: "Habla con un asesor licenciado",
              body:
                "Teléfonos y correos directos de cada asesor del equipo — bilingües, oficinas en Las Vegas y Denver.",
              icon: ArrowRight,
            },
          ].map(({ to, title, body, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lift"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Conoce más <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Aviso educativo.</strong> Esta página tiene fines
          educativos y no constituye asesoría de seguros, una cotización ni una oferta de
          cobertura. La cobertura real depende de los términos específicos de tu póliza, la
          aseguradora, los endosos, la suscripción y la ley aplicable de Nevada o Colorado. Revisa
          siempre tu página de declaraciones y consulta a un asesor licenciado antes de hacer
          cambios. Para una revisión personalizada,{" "}
          <Link to="/es/book" className="underline underline-offset-2">
            agenda una revisión gratuita
          </Link>
          {" "}o explora el{" "}
          <Link to="/es/faq" className="underline underline-offset-2">
            centro de conocimiento
          </Link>
          .
        </p>
      </Section>

      {/* CTA FINAL */}
      <CTASection
        title="Obtén una revisión de cobertura de auto — gratis, 20 minutos."
        subtitle="Un asesor licenciado revisa tu póliza actual línea por línea. Sin cotización requerida, sin presión. Solo claridad sobre lo que tienes y lo que podría faltarte."
        primaryLabel="Solicitar Cotización de Auto"
        primaryForm="personal_quote"
        secondaryLabel="Agenda una revisión gratuita"
        secondaryHref="/es/book"
      />
    </>
  );
}
