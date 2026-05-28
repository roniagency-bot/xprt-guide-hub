/**
 * Team roster for /about. Phone and email are placeholders — fill once the
 * founder confirms direct lines. Photo paths point at src/assets/team/;
 * until real headshots arrive, the TeamSection renders a branded monogram
 * fallback (initials on the brand surface) so layout is never broken.
 */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  location: "Las Vegas, NV" | "Denver, CO";
  /** One-line specialty shown under the role on hover/expand. */
  specialty: string;
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
    location: "Denver, CO",
    specialty:
      "Founder of XPRT Insurance. Bond, commercial, and Colorado coverage specialist.",
    phone: "",
    phoneDisplay: "",
    email: "",
    photo: null,
  },
  {
    id: "02",
    name: "Sindy F. Acosta-Correa",
    role: "Las Vegas Personal Insurance Specialist",
    location: "Las Vegas, NV",
    specialty: "Home, auto, renters and landlord coverage for Nevada families.",
    phone: "",
    phoneDisplay: "",
    email: "",
    photo: null,
  },
  {
    id: "03",
    name: "Mayela Masters",
    role: "Las Vegas Insurance Producer",
    location: "Las Vegas, NV",
    specialty: "Bilingual producer guiding new clients through quotes and coverage.",
    phone: "",
    phoneDisplay: "",
    email: "",
    photo: null,
  },
  {
    id: "04",
    name: "Yasmin Munoz",
    role: "Las Vegas CSR",
    location: "Las Vegas, NV",
    specialty: "Client service — policy changes, certificates, claims support.",
    phone: "",
    phoneDisplay: "",
    email: "",
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
