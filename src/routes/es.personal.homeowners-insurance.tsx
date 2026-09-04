import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Home as HomeIcon,
  FileText,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HomeownersLeadForm } from "@/components/site/HomeownersLeadForm";
import { HomeownersQuiz } from "@/components/site/HomeownersQuiz";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { getServicePage, getLeadMagnet } from "@/lib/content.functions";
import {
  pageHead,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  orgJsonLd,
  canonical,
} from "@/lib/seo";
import { HomeFlythroughExperience, FLYTHROUGH_COPY_ES } from "@/components/site/HomeFlythroughExperience";

const EN_PATH = "/personal/homeowners-insurance";
const ES_PATH = "/es/personal/homeowners-insurance";

export const Route = createFileRoute("/es/personal/homeowners-insurance")({
  loader: async () => {
    const [page, cheatSheet, ebook] = await Promise.all([
      getServicePage({ data: { slug: "homeowners-insurance" } }),
      getLeadMagnet({ data: { slug: "homeowners-cheat-sheet" } }),
      getLeadMagnet({ data: { slug: "homeowners-ebook" } }),
    ]);
    return { page, cheatSheet, ebook };
  },
  head: ({ loaderData }) => {
    const title =
      "Seguro de Vivienda en Nevada y Colorado | XPRT Insurance";
    const description =
      "Comprende qué cubre tu póliza de seguro de vivienda, qué excluye y qué revisar antes de la renovación o un reclamo. Con licencia en Nevada y Colorado.";
    const jsonLd: Record<string, unknown>[] = [
      orgJsonLd(),
      breadcrumbJsonLd([
        { name: "Inicio", path: "/es" },
        { name: "Personal", path: "/es" },
        { name: "Seguro de Vivienda", path: ES_PATH },
      ]),
      serviceJsonLd({
        name: "Seguro de Vivienda — Nevada y Colorado",
        description,
        path: ES_PATH,
        areaServed: ["Nevada", "Colorado"],
      }),
    ];
    if (loaderData?.page?.faqs?.length) {
      jsonLd.push(
        faqPageJsonLd(
          loaderData.page.faqs.map((f: any) => ({
            question: f.question_es || f.question_en,
            answer: f.short_answer_es || f.short_answer_en,
          })),
        ),
      );
    }
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
  component: HomeownersHubEs,
});

const TRUST_ITEMS_ES = [
  "Con licencia en Nevada y Colorado",
  "Agencia independiente",
  "Servicio bilingüe",
  "Educamos primero, nunca vendemos a presión",
];

function HomeownersHubEs() {
  const { page, cheatSheet, ebook } = Route.useLoaderData();
  const faqs = (page?.faqs ?? []).map((f: any) => ({
    slug: f.slug,
    question: f.question_es || f.question_en,
    short_answer: f.short_answer_es || f.short_answer_en,
    funnel_stage: f.funnel_stage,
  }));

  return (
    <>
      {/* BREADCRUMBS + SEO/A11Y HEADING - the visible "hero" is the cinematic
          opener below; the <h1> stays in the document (visually hidden) so the
          heading structure is unchanged for SEO and screen readers. */}
      <section className="relative isolate overflow-hidden bg-cream-gradient">
        <div className="container-prose flex items-center justify-between gap-4 pb-6 pt-10 md:pb-8 md:pt-14">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/es" },
              { name: "Personal", path: "/es" },
              { name: "Seguro de Vivienda" },
            ]}
          />
          <LanguageToggle current="es" />
        </div>
      </section>
      <h1 className="sr-only">
        Seguro de Vivienda en Nevada y Colorado — entiende lo que cubre tu póliza antes de necesitarla.
      </h1>

      {/* CINEMATIC OPENER - drone flythrough of the home, Spanish captions */}
      <HomeFlythroughExperience copy={FLYTHROUGH_COPY_ES} />

      {/* Continuation - keeps the quote / review buttons from the previous static hero */}
      <div className="bg-ink px-6 pb-24 pt-4 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <span className="h-px w-16 bg-gold/60" aria-hidden="true" />
          <p className="text-pretty text-lg text-primary-foreground/85 md:text-xl">
            Esto es lo que una póliza de vivienda realmente necesita cubrir — y dónde suelen esconderse los vacíos.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <GhlFormButton
              form="personal_quote"
              size="lg"
              className="btn-gold-shimmer bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold"
            >
              Solicitar Cotización
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </GhlFormButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/book">Agenda una revisión gratuita</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-background">
        <div className="container-prose py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground">
            {TRUST_ITEMS_ES.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>{t}</span>
                {i < TRUST_ITEMS_ES.length - 1 && (
                  <span className="hidden text-border md:inline">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUICK GUIDE LEAD MAGNET */}
      <Section id="guia-rapida" tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Descarga gratuita · Recurso 1</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Guía Rápida del Seguro de Vivienda
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              Descarga la guía de 2 páginas que muestra qué incluyen la mayoría
              de las pólizas de vivienda, qué no se cubre automáticamente y los
              vacíos más comunes que sorprenden durante un reclamo.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Vivienda vs valor de mercado, explicado",
                "Las 6 secciones de toda póliza de vivienda",
                "Endosos que muchos agentes omiten",
                "Límites de responsabilidad y cuándo conviene un paraguas",
                "Lista de verificación para la renovación",
              ].map((b) => (
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
                  <h3 className="font-display text-xl leading-tight">
                    Obtén la Guía Rápida
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PDF de 2 páginas · entrega inmediata.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <HomeownersLeadForm
                  leadMagnetId={cheatSheet?.id}
                  leadMagnetSlug="homeowners-cheat-sheet"
                  resourceName="Guía Rápida del Seguro de Vivienda"
                  thankYouSlug="homeowners-cheat-sheet"
                  ctaLabel="Descargar la Guía Rápida"
                  leadSource="es-homeowners-cheat-sheet"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EBOOK LEAD MAGNET */}
      <Section id="ebook">
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
                    Guía completa de cobertura · PDF.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <HomeownersLeadForm
                  leadMagnetId={ebook?.id}
                  leadMagnetSlug="homeowners-ebook"
                  resourceName="Guía Completa de Cobertura de Vivienda"
                  thankYouSlug="homeowners-ebook"
                  ctaLabel="Descargar el eBook"
                  leadSource="es-homeowners-ebook"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>Descarga gratuita · Recurso 2</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl leading-tight md:text-5xl">
              Guía Completa de Cobertura de Vivienda
            </h2>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              ¿Quieres la versión completa? Descarga la guía detallada para
              entender mejor los límites de cobertura, exclusiones, endosos,
              costo de reconstrucción, responsabilidad y preguntas para la
              renovación.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Límites de cobertura, línea por línea",
                "Exclusiones que la mayoría pasa por alto",
                "Endosos que cierran vacíos reales",
                "Costo de reconstrucción vs valor de mercado",
                "Responsabilidad y estrategia de paraguas",
                "Preguntas clave para la renovación",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* QUIZ */}
      <Section id="cuestionario" tone="cream">
        <SectionHeading
          align="center"
          eyebrow="Cuestionario interactivo"
          title="¿Tienes la cobertura adecuada?"
          intro="Responde unas preguntas rápidas para ver qué áreas de tu póliza pueden necesitar una revisión más detallada."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <HomeownersQuiz cheatSheetSlug="homeowners-cheat-sheet" />
        </div>
      </Section>

      {/* FAQ FUNNEL */}
      {faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Centro de conocimiento"
            title="Preguntas sobre vivienda, organizadas con claridad"
            intro="Empieza con lo básico, profundiza, y termina con los pasos a seguir. Cada respuesta conecta con la siguiente etapa."
          />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/es/faq">
                Explora el centro de conocimiento
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}

      {/* STATE GUIDES + E-E-A-T */}
      <Section id="guias-por-estado">
        <SectionHeading
          eyebrow="Guía local"
          title="Seguro de vivienda por estado"
          intro="Las necesidades de cobertura varían según la región. Exposición a incendios forestales en el Front Range, granizo en Denver, viento y antigüedad del techo en Las Vegas, y la inflación del costo de reconstrucción en ambos estados cambian lo que significa una buena póliza."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="group rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="font-display text-2xl">Vivienda en Nevada</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Las Vegas, Henderson, North Las Vegas, Reno y Sparks. La antigüedad
              del techo, el viento y el costo de reconstrucción son los puntos
              de revisión más comunes.
            </p>
          </div>
          <div className="group rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="font-display text-2xl">Vivienda en Colorado</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Denver, Aurora, Colorado Springs, Boulder y el Front Range. El
              granizo, la exposición a incendios forestales y los endosos del
              techo guían la mayoría de nuestras revisiones.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "Con licencia en Nevada y Colorado", icon: ShieldCheck },
            { label: "Agencia independiente", icon: HomeIcon },
            { label: "Servicio bilingüe (EN/ES)", icon: BookOpen },
            { label: "Revisiones de cobertura educativas", icon: Calendar },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Aviso educativo.</strong> Esta
          página tiene fines educativos y no constituye asesoría de seguros, una
          cotización ni una oferta de cobertura. La cobertura real depende de
          los términos específicos de tu póliza, la aseguradora, los endosos,
          la suscripción y la ley aplicable de Nevada o Colorado. Revisa siempre
          tu página de declaraciones y consulta a un asesor licenciado antes de
          hacer cambios. Para una revisión personalizada,{" "}
          <Link to="/book" className="underline underline-offset-2">
            agenda una revisión gratuita
          </Link>{" "}
          o explora nuestro{" "}
          <Link to="/es/faq/homeowners" className="underline underline-offset-2">
            centro de conocimiento de vivienda
          </Link>
          .
        </p>
      </Section>

      {/* FINAL CTA */}
      <CTASection
        title="Obtén una revisión de cobertura — gratis, 20 minutos."
        subtitle="Un asesor revisa tu póliza actual línea por línea. Sin cotización requerida, sin presión. Solo claridad sobre lo que tienes y lo que podría faltarte."
        primaryLabel="Solicitar Cotización"
        primaryForm="personal_quote"
        secondaryLabel="Descarga la Guía Rápida"
        secondaryHref="/es/personal/homeowners-insurance#guia-rapida"
      />
    </>
  );
}
