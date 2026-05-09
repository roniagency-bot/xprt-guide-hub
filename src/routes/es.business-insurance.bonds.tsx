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
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { BondsLeadForm } from "@/components/site/BondsLeadForm";
import { getLeadMagnet } from "@/server/content.functions";
import { BONDS_FAQ_PREVIEWS, PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";
import { applyTranslation } from "@/lib/i18n";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";

const EN_PATH = "/business-insurance/bonds";
const ES_PATH = "/es/business-insurance/bonds";

export const Route = createFileRoute("/es/business-insurance/bonds")({
  loader: async () => {
    const [quickGuide, ebook] = await Promise.all([
      getLeadMagnet({ data: { slug: "bond-quick-guide" } }),
      getLeadMagnet({ data: { slug: "complete-guide-to-surety-bonds" } }),
    ]);
    return { quickGuide, ebook };
  },
  head: () => {
    const title = "Fianzas en Nevada y Colorado | XPRT Insurance";
    const description =
      "Orientación educativa y opciones en línea para fianzas de licencia, permiso, contratista, distribuidor, título, notario y comerciales en Nevada y Colorado.";
    return pageHead({
      title,
      description,
      path: ES_PATH,
      image: canonical("/og-default.jpg"),
      locale: "es",
      alternates: { en: EN_PATH, es: ES_PATH },
      jsonLd: [
        orgJsonLd(),
        breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Negocios", path: "/es" },
          { name: "Fianzas", path: ES_PATH },
        ]),
        serviceJsonLd({
          name: "Fianzas — Nevada y Colorado",
          description,
          path: ES_PATH,
          areaServed: ["Nevada", "Colorado"],
        }),
        faqPageJsonLd(
          BONDS_FAQ_PREVIEWS.map((f) => {
            const t = applyTranslation(
              { question: f.question_en, answer: f.short_answer_en },
              {
                question: (f as any).question_es,
                answer: (f as any).short_answer_es,
              },
            );
            return t;
          }),
        ),
      ],
    });
  },
  component: BondsHubEs,
});

const TRUST_ITEMS_ES = [
  "Especialista en fianzas",
  "Nevada y Colorado",
  "Opciones rápidas en línea",
  "Atención bilingüe",
];

const BOND_PARTIES_ES = [
  {
    icon: Users,
    title: "Principal",
    body: "La persona o negocio al que se le exige obtener la fianza — eres tú.",
  },
  {
    icon: ShieldCheck,
    title: "Beneficiario (Obligee)",
    body: "La agencia, corte o entidad que requiere la fianza y queda protegida por ella.",
  },
  {
    icon: Building2,
    title: "Aseguradora (Surety)",
    body: "La compañía que emite la fianza y respalda la garantía.",
  },
];

const BOND_TYPES_ES = [
  {
    icon: FileBadge,
    title: "Fianzas de licencia y permiso",
    body: "Requeridas por agencias estatales, de condado o municipales antes de emitir una licencia o permiso.",
  },
  {
    icon: Hammer,
    title: "Fianzas de licencia de contratista",
    body: "Requeridas por las juntas de contratistas para proteger a los clientes y cumplir con las reglas del oficio.",
  },
  {
    icon: Car,
    title: "Fianzas de distribuidor de autos",
    body: "Requeridas para distribuidores licenciados como parte del cumplimiento del DMV o departamento estatal.",
  },
  {
    icon: ScrollText,
    title: "Fianzas de título / título perdido",
    body: "Se usan cuando falta la documentación de propiedad y se necesita aclarar el título de un vehículo.",
  },
  {
    icon: ClipboardCheck,
    title: "Fianzas de contrato",
    body: "Fianzas de oferta, cumplimiento y pago utilizadas en contratos de construcción y servicios.",
  },
  {
    icon: PenTool,
    title: "Fianzas de notario",
    body: "Requeridas para obtener la comisión como notario público en muchos estados.",
  },
  {
    icon: ShieldCheck,
    title: "Fianzas de fidelidad",
    body: "Protegen a un negocio o a sus clientes contra pérdidas causadas por deshonestidad de empleados.",
  },
  {
    icon: FileText,
    title: "Fianzas de preparación de documentos / LDA",
    body: "Requeridas para preparadores de documentos y asistentes legales en estados regulados.",
  },
];

function BondsHubEs() {
  const { quickGuide, ebook } = Route.useLoaderData();
  const faqs = BONDS_FAQ_PREVIEWS.map((f) => ({
    slug: f.slug,
    question: (f as any).question_es || f.question_en,
    short_answer: (f as any).short_answer_es || f.short_answer_en,
    funnel_stage: f.funnel_stage,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose pt-10 md:pt-14 flex items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/es" },
              { name: "Negocios", path: "/es" },
              { name: "Fianzas" },
            ]}
          />
          <LanguageToggle current="es" />
        </div>
        <div className="container-prose pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-3xl fade-in-up">
            <Eyebrow>Fianzas · Nevada y Colorado</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Obtén la fianza que necesitas — con menos confusión.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Orientación clara y opciones en línea para fianzas de licencia,
              permiso, contratista, distribuidor, notario y cumplimiento.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground shadow-lift hover:bg-gold/90"
              >
                <a
                  href={PROPELLER_QUOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cotiza y compra en línea
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#guia-fianzas">
                  Descarga la Guía Rápida de Fianzas
                </a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {TRUST_ITEMS_ES.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT IS A SURETY BOND */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Conceptos básicos"
          title="¿Qué es una fianza de garantía?"
          intro="Una fianza es un contrato a tres partes que garantiza el cumplimiento de una obligación. No es un seguro para ti — protege a la agencia o cliente que requiere la fianza."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BOND_PARTIES_ES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BOND TYPES */}
      <Section id="tipos-de-fianza">
        <SectionHeading
          eyebrow="Tipos comunes"
          title="Tipos de fianzas que ofrecemos"
          intro="Trabajamos con la mayoría de los tipos de fianza requeridos en Nevada y Colorado. Si no ves la tuya, contáctanos."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BOND_TYPES_ES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lift"
            >
              <Icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-lg leading-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* QUICK GUIDE LEAD MAGNET */}
      <Section id="guia-fianzas" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Descarga gratuita</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Guía Rápida de Fianzas
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Una página de referencia con los tipos más solicitados, lo que
              cada agencia normalmente pide, y cómo prepararte para una
              aprobación rápida.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">
                    Obtén la Guía
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PDF · entrega inmediata.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={quickGuide?.id}
                  leadMagnetSlug="bond-quick-guide"
                  resourceName="Guía Rápida de Fianzas"
                  thankYouSlug="bond-quick-guide"
                  ctaLabel="Descargar la Guía"
                  leadSource="es-bond-quick-guide"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EBOOK LEAD MAGNET */}
      <Section id="ebook-fianzas">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight">
                    Descarga el eBook
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Guía completa de fianzas · PDF.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <BondsLeadForm
                  leadMagnetId={ebook?.id}
                  leadMagnetSlug="complete-guide-to-surety-bonds"
                  resourceName="Guía Completa de Fianzas de Garantía"
                  thankYouSlug="complete-guide-to-surety-bonds"
                  ctaLabel="Descargar el eBook"
                  leadSource="es-bond-ebook"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Versión completa</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Guía Completa de Fianzas de Garantía
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              La versión detallada — incluye cómo se calcula la prima, qué
              documentos preparar, los plazos típicos de aprobación y los
              errores más comunes que retrasan la emisión.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Centro de conocimiento"
            title="Preguntas frecuentes sobre fianzas"
            intro="Lo esencial antes de cotizar — para que llegues con expectativas claras."
          />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/es/faq/bonds">
                Ver todas las preguntas de fianzas
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}

      {/* DISCLAIMER */}
      <Section>
        <p className="rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Aviso educativo.</strong> Esta
          página tiene fines educativos y no constituye asesoría legal,
          financiera ni una oferta de fianza. Los requisitos varían según la
          agencia, el estado y el tipo de fianza. Confirma siempre los
          requisitos exactos con la entidad que solicita la fianza antes de
          comprarla.
        </p>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        title="¿Necesitas una fianza específica?"
        subtitle="Cotiza y compra en línea, o habla con un especialista bilingüe que te guía en el proceso."
        primaryLabel="Cotiza y compra en línea"
        primaryHref={PROPELLER_QUOTE_URL}
        secondaryLabel="Habla con un especialista"
      />
    </>
  );
}
