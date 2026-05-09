import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "XPRT Insurance";

export interface TripwireOfferProps {
  name?: string;
  offerTitle?: string;
  downloadUrl?: string;
  lang?: "en" | "es";
}

const COPY = {
  en: {
    preview: (title: string) => `Your ${title} is ready to download`,
    greet: (name?: string) => (name ? `Hi ${name},` : "Hi there,"),
    intro: (title: string) =>
      `Thanks for requesting ${title}. Your personal copy is ready — tap the button below to download it.`,
    button: "Download my guide",
    note: "This link is unique to you, so please don't share it. If you have questions about the guide, just reply to this email and a licensed advisor will help.",
    closing: `Talk soon,\nThe ${SITE_NAME} team`,
    fallback: "If the button doesn't work, copy and paste this link:",
    subject: (title: string) => `Your ${title} is ready`,
  },
  es: {
    preview: (title: string) => `Tu ${title} está listo para descargar`,
    greet: (name?: string) => (name ? `Hola ${name},` : "Hola,"),
    intro: (title: string) =>
      `Gracias por solicitar ${title}. Tu copia personal está lista — toca el botón a continuación para descargarla.`,
    button: "Descargar mi guía",
    note: "Este enlace es único para ti, así que por favor no lo compartas. Si tienes preguntas, responde a este correo y un asesor con licencia te ayudará.",
    closing: `Hasta pronto,\nEl equipo de ${SITE_NAME}`,
    fallback: "Si el botón no funciona, copia y pega este enlace:",
    subject: (title: string) => `Tu ${title} está listo`,
  },
} as const;

const TripwireOfferEmail = ({
  name,
  offerTitle = "your guide",
  downloadUrl = "https://www.xprtinsurance.com",
  lang = "en",
}: TripwireOfferProps) => {
  const t = COPY[lang === "es" ? "es" : "en"];
  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview(offerTitle)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.greet(name)}</Heading>
          <Text style={text}>{t.intro(offerTitle)}</Text>
          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Button href={downloadUrl} style={button}>
              {t.button}
            </Button>
          </Section>
          <Text style={muted}>
            {t.fallback}
            <br />
            <a href={downloadUrl} style={link}>
              {downloadUrl}
            </a>
          </Text>
          <Text style={text}>{t.note}</Text>
          <Text style={footer}>{t.closing}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: TripwireOfferEmail,
  subject: (data: Record<string, any>) => {
    const lang = data?.lang === "es" ? "es" : "en";
    const title = data?.offerTitle || (lang === "es" ? "tu guía" : "your guide");
    return COPY[lang].subject(title);
  },
  displayName: "Tripwire offer delivery",
  previewData: {
    name: "Jane",
    offerTitle: "Homeowners Insurance Cheat Sheet",
    downloadUrl: "https://www.xprtinsurance.com/api/public/downloads/homeowners-cheat-sheet?t=preview",
    lang: "en",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Inter, Arial, sans-serif" };
const container = { padding: "32px 24px", maxWidth: "560px" };
const h1 = { fontSize: "22px", fontWeight: "bold", color: "#1a1f3a", margin: "0 0 16px" };
const text = { fontSize: "15px", color: "#384151", lineHeight: "1.6", margin: "0 0 18px" };
const muted = { fontSize: "12px", color: "#6b7280", lineHeight: "1.5", margin: "0 0 24px", wordBreak: "break-all" as const };
const link = { color: "#1a1f3a", textDecoration: "underline" };
const button = {
  backgroundColor: "#c9a44c",
  color: "#1a1f3a",
  fontSize: "15px",
  fontWeight: 600,
  padding: "12px 28px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
};
const footer = { fontSize: "13px", color: "#6b7280", margin: "32px 0 0", whiteSpace: "pre-line" as const };
