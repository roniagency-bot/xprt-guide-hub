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
  venue: string;
  city: string;
  /** Short description of the event. */
  description: string;
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
    id: "novel-rino-2026",
    status: "current",
    name: "Local Music Night at Novel RiNo",
    dateTime: "Date & time to be announced",
    venue: "Novel RiNo",
    city: "Denver, Colorado",
    description:
      "An evening of Colorado local music in the heart of the RiNo Art District. XPRT Insurance is a proud community sponsor — come for the music, stay for the neighborhood, and enter our community giveaway while you're there.",
    artists: [
      {
        name: "Featured artist — to be announced",
        bio: "Artist bio coming soon. We spotlight Colorado musicians and the small businesses that keep our neighborhoods playing.",
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

/** Short giveaway terms shown directly beneath the form. */
export const GIVEAWAY_TERMS = {
  en: "No purchase necessary. Must be 18 or older to enter. One entry per person. The winner will be contacted after the event using the phone number or email submitted. Entering does not obligate you to buy insurance. XPRT Insurance, A Roni Rivers Agency — licensed in Nevada and Colorado.",
  es: "No es necesario comprar. Debe tener 18 años o más para participar. Una entrada por persona. Contactaremos al ganador después del evento con el teléfono o correo enviado. Participar no lo obliga a comprar un seguro. XPRT Insurance, A Roni Rivers Agency — con licencia en Nevada y Colorado.",
};
