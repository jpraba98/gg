export const siteConfig = {
  name: "The Drip Room",
  handle: "@thedriproom6ix",
  domain: "thedriproom6ix.com",
  tagline: "Toronto's Creative Engine",
  parentCompany: "MGT Entertainment",
  contactEmail: "416mediacompany@gmail.com",
  eTransferEmail: "416mediacompany@gmail.com",
  eventbriteUrl: "https://www.eventbrite.ca/e/1996006511206",
  youtubeChannel: "@thedriproom6ix",
  discordUrl: "https://discord.gg/JZ4JNKJN3",
  social: {
    instagram: "https://instagram.com/thedriproom6ix",
    tiktok: "https://tiktok.com/@thedriproom6ix",
    youtube: "https://youtube.com/@thedriproom6ix",
    twitter: "https://x.com/thedriproom6ix",
    discord: "https://discord.gg/JZ4JNKJN3",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Services", href: "/services" },
    { label: "Media", href: "/media" },
    { label: "Blog", href: "/blog" },
    { label: "Members", href: "/members" },
    { label: "About", href: "/about" },
    { label: "Sponsor", href: "/sponsor" },
  ],
  stats: {
    events: "14+",
    followers: "8,000+",
    clients: "1,000+",
    years: "5+",
    revenue: "$20,000+",
  },
};

export type SiteConfig = typeof siteConfig;
