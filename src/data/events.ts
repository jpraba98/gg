export interface DripEvent {
  slug: string;
  name: string;
  presentedBy?: string;
  poweredBy?: string;
  date: string;
  dateLabel: string;
  venue: string;
  address: string;
  doors: string;
  lastCall?: string;
  age: string;
  priceRange: string;
  ticketUrl: string;
  talent: string[];
  category: "Showcases" | "Networking" | "Members Only";
  theme: "motion" | "drip" | "gold";
  description: string;
  image?: string;
  pressUrl?: string;
  pressLabel?: string;
}

/**
 * What the homepage promotes (hero "Up Next" pill + Featured Event strip).
 * Kept separate from `upcomingEvents` so a teaser can run before a date,
 * venue, or ticket link exists. Swap this object to change the feature.
 */
export interface HomeFeature {
  name: string;
  season?: string;
  status: string;
  blurb: string;
  ctaLabel: string;
  ctaHref: string;
}

export const homeFeature: HomeFeature = {
  name: "Love in the 6ix",
  season: "Season 3",
  status: "Coming Soon",
  blurb: "The series is back. Date, venue and tickets dropping soon — follow @thedriproom6ix so you don't miss it.",
  ctaLabel: "Get Notified",
  ctaHref: "https://instagram.com/thedriproom6ix",
};

export const upcomingEvents: DripEvent[] = [
  {
    slug: "island-motion-vol-1",
    name: "A2M Presents Island Motion Vol. 1",
    presentedBy: "Access 2 Motion",
    poweredBy: "TheDripRoom6ix & CTR Productions",
    date: "2026-08-27",
    dateLabel: "Thursday, August 27, 2026",
    venue: "Dopamine Lounge",
    address: "2415 Yonge St, Toronto ON M4P 2E7",
    doors: "8:00 PM",
    lastCall: "2:00 AM",
    age: "19+ | Valid ID required",
    priceRange: "$25 – $40",
    ticketUrl: "https://www.eventbrite.ca/e/1996006511206",
    talent: ["Topman Meeko (Live)", "DJ Icy", "Opening: DJ Unruly & DJ Jojo"],
    category: "Showcases",
    theme: "motion",
    description:
      "An electric night of live performance and DJ sets celebrating island culture in the heart of Toronto — presented by Access 2 Motion, powered by TheDripRoom6ix and CTR Productions.",
    pressUrl: "https://www.blogto.com/events/access2motion-presents-island-motion-vol-1-toronto/",
    pressLabel: "Featured on BlogTO",
  },
];

/** True until the end of the event's date (Toronto time is close enough to UTC-day for this). */
export function isUpcoming(event: DripEvent, now: Date = new Date()): boolean {
  return new Date(`${event.date}T23:59:59-05:00`).getTime() >= now.getTime();
}

export function getUpcomingEvents(now: Date = new Date()): DripEvent[] {
  return upcomingEvents.filter((e) => isUpcoming(e, now));
}

export interface PastEvent {
  name: string;
  series?: string;
  season?: string;
  year: string;
  /** Link to a recap post, video or gallery; the "View Recap" link only shows when set. */
  recapUrl?: string;
}

export const pastEvents: PastEvent[] = [
  { name: "Stars Align", season: "S1", year: "2022" },
  { name: "Stars Align", season: "S2", year: "2022" },
  { name: "Stars Align", season: "S3", year: "2023" },
  { name: "Stars Align", season: "S4", year: "2023" },
  { name: "Stars Align", season: "S5", year: "2024" },
  { name: "Love in the 6ix", season: "S1", year: "2023" },
  { name: "Love in the 6ix", season: "S2", year: "2024" },
  { name: "6ixConnected", year: "2024" },
  { name: "Dreamz 2 Reality", year: "2024" },
  { name: "6ixclusive", year: "2025" },
  { name: "Island Motion", season: "Vol. 1", year: "2026" },
];
