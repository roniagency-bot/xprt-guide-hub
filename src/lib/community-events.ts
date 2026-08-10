/**
 * Community Events config — edit this file to update the /community page.
 *
 * HOW TO ADD A NEW SPONSORED EVENT
 *  1. Add an object to COMMUNITY_EVENTS (newest first).
 *  2. Set `status: "current"` on the one being promoted; older ones become
 *     "past" and upcoming ones "upcoming". The page renders the current event
 *     as the featured hero card and lists any "upcoming" events below.
 *  3. Drop the artwork/artist image in src/assets/ and import it here.
 */

export type CommunityEvent = {
  id: string;
  status: "current" | "upcoming" | "past";
  /** Event name, e.g. "RiNo Live Sessions". */
  name: string;
  /** Human-readable date/time, e.g. "Friday, September 12, 2026 · 7:00 PM". */
  dateTime: string;
  /** ISO start datetime for schema, e.g. "2026-09-12T19:00:00-06:00". */
  startDateIso?: string;
  /** ISO end datetime for schema. */
  endDateIso?: string;
  venue: string;
  /** Street address of the venue, e.g. "1350 40th St". */
  streetAddress?: string;
  city: string;
  /** Extra venue detail, e.g. "Backyard Terrace". */
  venueDetail?: string;
  /** Short description of the event. */
  description: string;
  /** Dress code, if the event has one. */
  dressCode?: string;
  /** After-party venue / note. */
  afterParty?: string;
  /** Presenting partners, e.g. "Pure Artist Music". */
  presentedBy?: string[];
  /** Ticket price note, e.g. "$20 presale". */
  ticketNote?: string;
  /** Featured artist(s). */
  artists: {
    name: string;
    bio: string;
    /** Imported image or absolute URL. Leave undefined for a placeholder. */
    image?: string;
  }[];
  /** Event flyer / artwork. Imported image or absolute URL. */
  artwork?: string;
  /** Optional external ticket / event link. */
  eventUrl?: string;
};

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "beach-boujie-2026",
    status: "current",
    name: "Beach & Boujie Summer Bash Music Festival",
    dateTime: "Saturday, August 15, 2026 · 11:00 AM – 3:00 PM",
    startDateIso: "2026-08-15T11:00:00-06:00",
    endDateIso: "2026-08-15T15:00:00-06:00",
    venue: "NOVEL RiNo",
    venueDetail: "Backyard Terrace",
    streetAddress: "1350 40th St",
    city: "Denver, Colorado",
    description:
      "Retro beach meets elevated Denver culture — live music from Colorado artists, a champagne wall, local brands, local bites and sips, and a rooftop after-party. One day only in the RiNo Art District. XPRT Insurance is a proud community sponsor.",
    dressCode: "Beach & Boujie",
    afterParty: "After party at Sorry Gorgeous Cocktail Bar",
    presentedBy: [
      "Pure Artist Music",
      "Eloura Hospitality Group",
      "NOVEL RiNo by Crescent Communities",
    ],
    ticketNote: "$20 presale · Free for NOVEL RiNo residents",
    eventUrl:
      "https://www.eventbrite.com/e/beach-bougie-summer-bash-music-festival-tickets-1993710990241?aff=oddtdtcreator",
    artists: [
      {
        name: "E.M.E",
        bio: "On the Beach & Boujie stage as part of the Pure Artist Music lineup. Full bio and photo coming soon — ask us at the merch table or follow @pure_artist_music.",
      },
      {
        name: "Jewel House",
        bio: "Performing live at the Summer Bash with the Pure Artist Music lineup. Full bio and photo coming soon.",
      },
      {
        name: "Kayla Smith",
        bio: "Part of the Beach & Boujie live lineup, presented by Pure Artist Music. Full bio and photo coming soon.",
      },
    ],
  },
];

export const currentEvent = () =>
  COMMUNITY_EVENTS.find((e) => e.status === "current") ?? COMMUNITY_EVENTS[0];

export const upcomingEvents = () => COMMUNITY_EVENTS.filter((e) => e.status === "upcoming");

/**
 * GoHighLevel "Community Events" giveaway form.
 * Paste the form ID from your GHL embed code between the quotes and the real
 * form replaces the placeholder box automatically.
 * Example embed src: https://link.xprtinsurance.com/widget/form/AbCdEf123456
 */
export const COMMUNITY_FORM_ID = "";

/** Optional: override the iframe height if your GHL form is taller/shorter. */
export const COMMUNITY_FORM_HEIGHT = 760;

/** Giveaway prizes — edit freely; the page renders however many you list. */
export const GIVEAWAY_PRIZES = [
  {
    place: "1st prize",
    en: "A vinyl record from one of the featured Beach & Boujie artists.",
    es: "Un disco de vinilo de uno de los artistas destacados de Beach & Boujie.",
  },
  {
    place: "2nd prize",
    en: "A ticket to the next Pure Artist Music event in Denver.",
    es: "Un boleto para el próximo evento de Pure Artist Music en Denver.",
  },
];

/** Shown under the prize list. */
export const PRIZE_NOTE = {
  en: "Prizes are being finalized and may be substituted for something of equal value.",
  es: "Los premios se están confirmando y pueden ser sustituidos por algo de valor similar.",
};

/** Short giveaway terms shown directly beneath the form. */
export const GIVEAWAY_TERMS = {
  en: "No purchase necessary. Must be 18 or older to enter. One entry per person. The winner will be contacted after the event using the phone number or email submitted. Entering does not obligate you to buy insurance. XPRT Insurance, A Roni Rivers Agency — licensed in Nevada and Colorado.",
  es: "No es necesario comprar. Debe tener 18 años o más para participar. Una entrada por persona. Contactaremos al ganador después del evento con el teléfono o correo enviado. Participar no lo obliga a comprar un seguro. XPRT Insurance, A Roni Rivers Agency — con licencia en Nevada y Colorado.",
};

/** Message from Roni — she can't attend in person, so this stands in for her. */
export const RONI_NOTE = {
  en: "Hi, I'm Roni Rivers. I couldn't be at the Bash in person this time — I'm traveling — but XPRT Insurance is right here with you. Scan, text, call, or book a time and you'll reach my team today, in English or Español. Enjoy the music, and let us know how we can help.",
  es: "Hola, soy Roni Rivers. Esta vez no pude estar en el evento en persona porque estoy de viaje, pero XPRT Insurance está aquí con ustedes. Escanea, envía un mensaje, llama o reserva una cita y mi equipo te atiende hoy mismo, en inglés o español. Disfruten la música y dígannos cómo podemos ayudar.",
};
