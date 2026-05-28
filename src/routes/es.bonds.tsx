import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  BookOpen,
  ScrollText,
  Building2,
  Car,
  Hammer,
  FileBadge,
  ClipboardCheck,
  Users,
  PenTool,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Zap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { BondsLeadForm } from "@/components/site/BondsLeadForm";
import { getLeadMagnet } from "@/server/content.functions";
import { BONDS_FAQ_PREVIEWS, PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import { BONDS_FAQS_ES } from "@/lib/i18n/bonds-faqs-es";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";
import heroBonds from "@/assets/hero-bonds.jpg";

const PATH = "/es/bonds";

// Bloque Q&A de alta densidad para AEO/GEO. Se mantiene en línea para que el
// JSON-LD FAQPage y el HTML visible sean byte-idénticos.
const AEO_QA: Array<{ q: string; a: string }> = [
  {
    q: "¿Qué es una fianza surety y cómo funciona?",
    a: "Una fianza surety es un contrato legal de tres partes que garantiza que un negocio o individuo cumplirá con sus obligaciones legales y las regulaciones estatales. Las tres partes son el Principal (el negocio que compra la fianza), el Obligante (la agencia gubernamental que requiere la fianza) y la Surety (la compañía aseguradora que respalda la garantía financiera). A diferencia del seguro, una fianza surety protege al consumidor y al estado de pérdidas financieras causadas por las prácticas del negocio — no al negocio.",
  },
  {
    q: "¿Qué tipo de fianza surety necesito como concesionario de autos en Nevada?",
    a: "Para obtener o renovar su licencia de negocio automotriz en Nevada, el DMV requiere una Fianza de Concesionario de Vehículos continua. El límite típico requerido es de $100,000 para concesionarias estándar de autos usados o nuevos, y $10,000 para concesionarios de motocicletas o trailers utilitarios. Esta fianza garantiza que su concesionaria cumpla con las leyes de protección al consumidor, transfiera títulos de vehículos de forma transparente y pague impuestos estatales con precisión.",
  },
  {
    q: "¿Cuál es la diferencia entre una fianza de licencia y permiso y una fianza de contrato?",
    a: "Una fianza de licencia y permiso es una presentación obligatoria requerida por jurisdicciones estatales, del condado o municipales como requisito previo para operar legalmente un negocio o oficio (por ejemplo, fianzas de contratistas HVAC, fianzas de concesionarios DMV). Una fianza de contrato — que comprende fianzas de licitación, cumplimiento y pago — es específica del proyecto, garantizando que un contratista ejecutará un contrato de construcción según las especificaciones del proyecto y pagará a todos los subcontratistas y proveedores de materiales.",
  },
  {
    q: "¿Cuánto cuesta una fianza surety en Nevada y Colorado?",
    a: "El costo de una fianza surety, conocido como prima de la fianza, normalmente se calcula como un pequeño porcentaje del límite total de la fianza — entre el 1% y el 3% para solicitantes con buen crédito comercial. Para una fianza estándar de concesionario de $50,000, esto equivale a un costo anual de $500 a $1,500. Para clasificaciones especializadas o de mayor riesgo, o solicitantes con perfiles de crédito no prime, la tasa de prima puede ajustarse según los parámetros de suscripción independientes.",
  },
  {
    q: "¿Puedo comprar una fianza surety al instante en línea?",
    a: "Sí. En XPRT Insurance hemos optimizado nuestra infraestructura para soportar la suscripción instantánea de fianzas surety en línea y la entrega digital del certificado. Para fianzas estándar comerciales, de licencia, permiso y concesionario, los solicitantes pueden ingresar los datos de su entidad, pasar la verificación digital, pagar su prima e imprimir su documentación oficial de presentación de fianza en menos de cinco minutos.",
  },
];

export const Route = createFileRoute("/es/bonds")({
  loader: async () => {
    const [quickGuide, ebook, bundle] = await Promise.all([
      getLeadMagnet({ data: { slug: "bond-quick-guide" } }),
      getLeadMagnet({ data: { slug: "complete-guide-to-surety-bonds" } }),
      getLeadMagnet({ data: { slug: "dealer-bond-bundle" } }),
    ]);
    return { quickGuide, ebook, bundle };
  },
  head: () => {
    const title = "Fianzas Surety — Emisión instantánea en línea en Nevada y Colorado | XPRT Insurance";
    const description =
      "Compra tu fianza surety de Nevada o Colorado en línea en menos de cinco minutos. Fianzas de licencia, permiso, contratista, concesionario, notario y comerciales — cotización instantánea, entrega digital, agentes licenciados.";
    return pageHead({
      title,
      description,
      path: PATH,
      image: canonical("/og-default.jpg"),
      locale: "es",
      alternates: { en: "/bonds", es: PATH },
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Fianzas", path: PATH },
        ]),
        serviceJsonLd({
          name: "Fianzas Surety — Nevada y Colorado",
          description,
          path: PATH,
          areaServed: ["Nevada", "Colorado"],
        }),
        faqPageJsonLd([
          ...AEO_QA.map(({ q, a }) => ({ question: q, answer: a })),
          ...BONDS_FAQ_PREVIEWS.map((f) => {
            const es = BONDS_FAQS_ES[f.slug];
            return {
              question: es?.question ?? f.question_en,
              answer: es?.shortAnswer ?? f.short_answer_en,
            };
          }),
        ]),
      ],
    });
  },
  component: BondsHubEs,
});

const TRUST_ITEMS = [
  "Emisión instantánea en línea",
  "Licenciados en NV y CO",
  "Entrega digital del certificado",
  "Soporte bilingüe",
];

const BOND_PARTIES = [
  { icon: Users, title: "Principal", body: "La persona o negocio que debe obtener la fianza — eres tú." },
  { icon: ShieldCheck, title: "Obligante", body: "La agencia, tribunal o parte que requiere la fianza y está protegida por ella." },
  { icon: Building2, title: "Surety", body: "La compañía que emite la fianza y respalda la garantía." },
];

const BOND_TYPES = [
  { icon: FileBadge, title: "Fianzas de Licencia y Permiso", body: "Requeridas por agencias estatales, del condado y municipales antes de emitir una licencia o permiso." },
  { icon: Hammer, title: "Fianzas de Licencia de Contratista", body: "Requeridas por las juntas de licencias de contratistas para proteger a clientes y cumplir las reglas del oficio." },
  { icon: ScrollText, title: "Fianzas de Título / Título Perdido", body: "Se usan cuando falta documentación de propiedad y se necesita aclarar el título de un vehículo." },
  { icon: ClipboardCheck, title: "Fianzas de Contrato", body: "Fianzas de licitación, cumplimiento y pago utilizadas en contratos de construcción y servicios." },
  { icon: PenTool, title: "Fianzas de Notario", body: "Requeridas para ser comisionado como notario público en muchos estados." },
  { icon: ShieldCheck, title: "Fianzas de Fidelidad", body: "Protegen al negocio o a sus clientes de pérdidas causadas por deshonestidad de empleados." },
  { icon: FileText, title: "Fianzas de Preparación de Documentos / LDA", body: "Requeridas para preparadores de documentos y asistentes legales en estados regulados." },
];

function BondsHubEs() {
  const { quickGuide, ebook, bundle } = Route.useLoaderData();
  const faqs = BONDS_FAQ_PREVIEWS.map((f) => {
    const es = BONDS_FAQS_ES[f.slug];
    return {
      slug: f.slug,
      question: es?.question ?? f.question_en,
      short_answer: es?.shortAnswer ?? f.short_answer_en,
      funnel_stage: f.funnel_stage,
    };
  });

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroBonds}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />
        <div className="container-prose relative pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Inicio", path: "/es" }, { name: "Fianzas" }]} />
        </div>
        <div className="container-prose relative pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl fade-in-up text-primary-foreground">
            <Eyebrow className="text-gold">
              <Zap className="mr-1.5 inline h-3.5 w-3.5" /> Emisión instantánea de fianzas surety en línea
            </Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
              Obtén tu fianza surety de Nevada o Colorado en menos de 5 minutos.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Fianzas de licencia, permiso, contratista, concesionario, notario y comerciales —
              cotizadas, suscritas, pagadas y entregadas digitalmente en una sola pantalla.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-gold-shimmer bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                  Cotiza y compra en línea ahora
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <GhlFormButton
                form="commercial_quote"
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Habla con un agente licenciado
              </GhlFormButton>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              {TRUST_ITEMS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BOND TYPES GRID */}
      <Section tone="cream" id="bond-types">
        <SectionHeading
          eyebrow="Coberturas"
          title="Tipos de fianza comunes — cotiza en un clic"
          intro="La mayoría de las fianzas estándar pueden emitirse al instante en línea. Las fianzas más grandes o especializadas pueden requerir una breve revisión de suscripción."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BOND_TYPES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
              <h3 className="mt-4 font-display text-xl leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <a
                href={PROPELLER_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-gold"
              >
                Iniciar cotización
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* AUTO DEALER SPOTLIGHT */}
      <Section id="auto-dealer-bond">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-ink via-ink to-ink/95 text-primary-foreground shadow-lift">
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="p-8 lg:col-span-3 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" /> Fianza más vendida
              </span>
              <h2 className="mt-5 text-balance font-display text-3xl leading-tight md:text-4xl">
                Fianzas de Concesionario de Autos — Listas para el DMV de Nevada y Colorado en minutos.
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-primary-foreground/85 md:text-lg">
                La Fianza de Concesionario de Vehículos es nuestra presentación de mayor volumen.
                Ya sea que estés abriendo un nuevo lote, renovando tu licencia del DMV, o pasando
                de mayoreo a venta al público, emitimos, presentamos y entregamos la fianza el mismo día.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gold">Nevada — Usados / Nuevos</dt>
                  <dd className="mt-1 font-display text-lg">Límite $100,000</dd>
                  <p className="mt-1 text-xs text-primary-foreground/70">Requerido por el DMV de Nevada para concesionarias licenciadas.</p>
                </div>
                <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gold">Nevada — Motocicleta / Trailer</dt>
                  <dd className="mt-1 font-display text-lg">Límite $10,000</dd>
                  <p className="mt-1 text-xs text-primary-foreground/70">Límite menor para concesionarios de motocicletas y trailers.</p>
                </div>
                <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gold">Colorado — Concesionario</dt>
                  <dd className="mt-1 font-display text-lg">Límite $50,000</dd>
                  <p className="mt-1 text-xs text-primary-foreground/70">Según las reglas de licencia de la División Auto de Colorado.</p>
                </div>
                <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gold">Prima anual típica</dt>
                  <dd className="mt-1 font-display text-lg">1–3% del límite</dd>
                  <p className="mt-1 text-xs text-primary-foreground/70">Rango de $500–$1,500 para solicitantes con buen crédito.</p>
                </div>
              </dl>

              <ul className="mt-8 space-y-2 text-sm text-primary-foreground/85">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Presentación digital el mismo día aceptada por el DMV de NV y la División Auto de CO.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Fianza continua — renovable anualmente sin nueva suscripción para crédito prime.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Se combina con responsabilidad de garage, lote abierto y E&amp;O de concesionario.</li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-gold hover:bg-gold/90">
                  <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                    Cotizar fianza de concesionario
                    <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/bonds/auto-dealer-bond">
                    Guía completa de la fianza
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-primary-foreground/70">
                ¿También necesitas el programa de concesionaria?{" "}
                <Link to="/services/$category" params={{ category: "dealership" }} className="text-gold hover:underline">
                  Ver seguro de concesionaria →
                </Link>
              </p>
            </div>

            <aside className="border-t border-primary-foreground/10 bg-primary-foreground/5 p-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <Car className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg leading-tight">Estrategia de paquete para concesionarios</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                La mayoría de nuestros clientes concesionarios mantienen la fianza <em>y</em> un
                programa completo de seguro de concesionaria con nosotros — responsabilidad de
                garage, lote abierto, placas de concesionario y deshonestidad de empleados.
                Combinarlos con una sola agencia mantiene renovaciones, certificados y
                presentaciones del DMV en un mismo calendario.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-primary-foreground/85">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Un agente para fianza + responsabilidad + lote abierto.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Calendario coordinado de renovaciones y presentaciones DMV.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Soporte bilingüe para concesionarios hispanohablantes.</li>
              </ul>
              <div className="mt-7 flex flex-col gap-2 text-sm">
                {bundle && (
                  <Link
                    to="/bonds/auto-dealer-bond"
                    hash="bundle"
                    className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                  >
                    Descarga la hoja de trabajo (PDF)
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  to="/es/faq/dealership"
                  className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                >
                  Lee la base de conocimiento de concesionarias
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {/* INSTANT BUY CALLOUT */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-10 text-center shadow-lift md:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Plataforma de emisión en línea
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl leading-tight md:text-5xl">
            ¿Necesitas una fianza ya?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Ingresa los datos de tu entidad, pasa la verificación digital, paga tu prima e
            imprime tu documentación oficial — todo en menos de cinco minutos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground shadow-gold hover:bg-gold/90"
            >
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Cotizar y comprar en línea
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/es/book">Agendar revisión de fianza</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Las fianzas más grandes o especializadas pueden requerir suscripción independiente.
          </p>
        </div>
      </Section>

      {/* AEO/GEO KNOWLEDGE BASE */}
      <Section tone="cream" id="knowledge-base">
        <article className="mx-auto max-w-3xl">
          <header>
            <Eyebrow>Base de conocimiento</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Preguntas frecuentes sobre fianzas surety en Nevada y Colorado
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Respuestas directas y autorizadas a las preguntas que nuestros suscriptores
              reciben con más frecuencia de solicitantes en Nevada y Colorado.
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {AEO_QA.map(({ q, a }) => (
              <section key={q}>
                <h3 className="font-display text-xl leading-tight text-foreground md:text-2xl">
                  {q}
                </h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-foreground/85">
                  {a}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-14">
            <h3 className="font-display text-xl leading-tight md:text-2xl">
              Las tres partes de toda fianza surety
            </h3>
            <dl className="mt-6 grid gap-5 md:grid-cols-3">
              {BOND_PARTIES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 shadow-elegant"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <dt className="mt-3 font-display text-base">{title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </Section>

      {/* FAQ FUNNEL */}
      <Section>
        <SectionHeading
          eyebrow="Profundiza"
          title="Explora el centro de conocimiento de fianzas"
          intro="Cada tema enlaza a un artículo largo con contexto específico del estado, mecánica de reclamos y detalle de suscripción."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(["tofu", "mofu", "bofu"] as const).map((stage) => {
            const stageFaqs = faqs.filter((f) => f.funnel_stage === stage);
            const meta = {
              tofu: { label: "Conceptos básicos", desc: "Qué son las fianzas y por qué las necesitas." },
              mofu: { label: "Cobertura y costo", desc: "Cotización, suscripción y qué afecta la aprobación." },
              bofu: { label: "¿Listo para revisar?", desc: "Cotiza, compra y emite tu fianza." },
            }[stage];
            return (
              <div key={stage} className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-gold/40 bg-gold/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                    {meta.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stageFaqs.length} {stageFaqs.length === 1 ? "tema" : "temas"}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{meta.desc}</p>
                <ul className="mt-5 space-y-3">
                  {stageFaqs.map((f) => (
                    <li key={f.slug}>
                      <Link
                        to="/es/faq/bonds/$slug"
                        params={{ slug: f.slug }}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-gold/50"
                      >
                        <span className="font-display text-base leading-snug text-foreground">
                          {f.question}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* LEAD MAGNETS */}
      <Section id="bond-quick-guide" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Descarga gratis · Recurso 1</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Fianzas Surety: Guía rápida
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Un manual de 2 páginas que cubre tipos comunes de fianzas, términos clave,
              fundamentos de cotización, requisitos estatales y errores comunes a evitar.
            </p>
            <ul className="mt-8 space-y-3">
              {(quickGuide?.bullets_es ?? quickGuide?.bullets_en ?? []).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Obtén la guía rápida</h3>
                  <p className="text-xs text-muted-foreground">PDF de 2 páginas · entrega instantánea.</p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={quickGuide?.id}
                  leadMagnetSlug="bond-quick-guide"
                  resourceName="Guía rápida de fianzas surety"
                  thankYouSlug="bond-quick-guide"
                  ctaLabel="Obtener la guía rápida"
                  leadSource="bonds_cheat_sheet"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="complete-bond-guide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Obtén el ebook</h3>
                  <p className="text-xs text-muted-foreground">Guía completa de fianzas · PDF.</p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={ebook?.id}
                  leadMagnetSlug="complete-guide-to-surety-bonds"
                  resourceName="Guía completa de fianzas surety"
                  thankYouSlug="complete-guide-to-surety-bonds"
                  ctaLabel="Obtener la guía completa"
                  leadSource="bonds_ebook"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Descarga gratis · Recurso 2</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight md:text-4xl">
              Guía completa de fianzas surety
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Una guía más profunda que cubre suscripción, fianzas de contrato, fianzas
              comerciales, requisitos de cumplimiento y reglas específicas por estado.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {(ebook?.bullets_es ?? ebook?.bullets_en ?? []).map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* YMYL TRUST */}
      <Section tone="cream" id="licensing">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <Eyebrow>Licencias y confianza</Eyebrow>
          <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
            Productores de fianzas surety licenciados en Nevada y Colorado
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            XPRT Insurance es una agencia de seguros de propiedad y responsabilidad activamente
            licenciada y autorizada para colocar fianzas surety en Nevada y Colorado. Todas las
            fianzas se colocan con compañías surety admitidas y calificadas por A.M. Best.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Nevada
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Productor licenciado · División de Seguros de Nevada.
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin className="h-3.5 w-3.5" /> Colorado
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                Productor licenciado · División de Seguros de Colorado.
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="tel:+17027663394">
                <Phone className="mr-1.5 h-4 w-4" /> (702) 766-3394
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="mailto:roni@xprtinsurance.com">
                <Mail className="mr-1.5 h-4 w-4" /> roni@xprtinsurance.com
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/es/book">Agendar revisión de fianza</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Aviso educativo.</strong> Esta página es solo
            educativa. Los requisitos de fianza, suscripción, aprobación, precio y elegibilidad
            varían según el estado, el obligante, la compañía surety y los detalles de la
            solicitud. Completar una cotización no garantiza la aprobación ni la emisión. Confirma
            siempre los requisitos específicos con el obligante y un asesor licenciado.
          </p>
        </div>
      </Section>

      <CTASection
        title="¿Necesitas ayuda para estructurar la fianza correcta?"
        subtitle="Cotiza y compra fianzas comunes en línea, o habla con un asesor licenciado para fianzas más grandes o especializadas en Nevada y Colorado."
        primaryLabel="Solicitar cotización"
        primaryForm="commercial_quote"
        secondaryLabel="Descarga la guía rápida"
        secondaryHref="/es/bonds#bond-quick-guide"
      />
    </>
  );
}
