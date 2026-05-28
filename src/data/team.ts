/**
 * Team roster for /about. Photos live in src/assets/team/ and are imported
 * as ES6 modules for proper bundling. When a photo is null, the TeamSection
 * renders a branded monogram fallback (initials on the brand surface).
 */
import veronicaPhoto from "@/assets/team/veronica.png";
import sindyPhoto from "@/assets/team/sindy.png";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  roleEs: string;
  location: "Las Vegas, NV" | "Denver, CO";
  /** One-line specialty shown under the role on hover/expand. */
  specialty: string;
  specialtyEs: string;
  /** Direct dial in E.164 (e.g. +17025551234). Leave empty until confirmed. */
  phone: string;
  /** Pretty-formatted phone for display. */
  phoneDisplay: string;
  /** Direct email. Leave empty until confirmed. */
  email: string;
  /** Imported headshot URL — set to null until uploaded. */
  photo: string | null;
};

export const TEAM: TeamMember[] = [
  {
    id: "01",
    name: "Veronica I. Rivera-Nuñez",
    role: "Founder · CO Bond, Commercial & CO Specialist",
    roleEs: "Fundadora · Especialista en Fianzas, Comercial y Colorado",
    location: "Denver, CO",
    specialty:
      "Founder of XPRT Insurance. Bond, commercial, and Colorado coverage specialist.",
    specialtyEs:
      "Fundadora de XPRT Insurance. Especialista en fianzas, seguros comerciales y cobertura de Colorado.",
    phone: "+17027663394",
    phoneDisplay: "(702) 766-3394",
    email: "vrivera@farmersagent.com",
    photo: veronicaPhoto,
  },
  {
    id: "02",
    name: "Sindy F. Acosta-Correa",
    role: "Las Vegas Personal Insurance Specialist",
    roleEs: "Especialista en Seguros Personales — Las Vegas",
    location: "Las Vegas, NV",
    specialty: "Home, auto, renters and landlord coverage for Nevada families.",
    specialtyEs:
      "Cobertura de hogar, auto, inquilinos y propietarios de alquiler para familias de Nevada.",
    phone: "+17253442211",
    phoneDisplay: "(725) 344-2211",
    email: "sindy.vrivera@farmersagency.com",
    photo: sindyPhoto,
  },
  {
    id: "03",
    name: "Mayela Masters",
    role: "Las Vegas Insurance Producer",
    roleEs: "Productora de Seguros — Las Vegas",
    location: "Las Vegas, NV",
    specialty: "Bilingual producer guiding new clients through quotes and coverage.",
    specialtyEs:
      "Productora bilingüe que guía a nuevos clientes a través de cotizaciones y coberturas.",
    phone: "+17253442211",
    phoneDisplay: "(725) 344-2211",
    email: "mayelad.vrivera@farmersagency.com",
    photo: null,
  },
  {
    id: "04",
    name: "Yasmin Munoz",
    role: "Las Vegas CSR & DMV Services Specialist",
    roleEs: "Servicio al Cliente y Especialista en Servicios del DMV — Las Vegas",
    location: "Las Vegas, NV",
    specialty:
      "Client service and DMV services — policy changes, certificates, claims, and registration support.",
    specialtyEs:
      "Servicio al cliente y servicios del DMV — cambios de póliza, certificados, reclamos y soporte de registro.",
    phone: "+17253442211",
    phoneDisplay: "(725) 344-2211",
    email: "yasmin.vrivera@farmersagency.com",
    photo: null,
  },
];


/** Build initials for monogram fallback when no photo is uploaded yet. */
export function initialsOf(name: string): string {
  return name
    .replace(/[^A-Za-zÀ-ÿ\s-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
