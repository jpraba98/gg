export interface Bundle {
  name: string;
  price: string;
  includes: string[];
}

export const bundles: Bundle[] = [
  {
    name: "The Starter Pack",
    price: "$199",
    includes: [
      "2 Simple Reposts",
      "1 Story Post",
      "Basic content review",
      "24–48hr turnaround",
    ],
  },
  {
    name: "The Launch Pad",
    price: "$349",
    includes: [
      "4 Edited Posts + Stories",
      "2 Captioned Stories",
      "YouTube placement",
      "Priority scheduling",
    ],
  },
  {
    name: "The Hype Machine",
    price: "$499",
    includes: [
      "Push Hype Pack (2x/2x, 7 days)",
      "2 Edited Posts + Stories",
      "Link in Bio placement (5 days)",
      "Performance recap",
    ],
  },
  {
    name: "The Full Press",
    price: "$699",
    includes: [
      "Motion Hype Pack (4x/4x, 14 days)",
      "4-Page Collab",
      "YouTube placement",
      "Dedicated account contact",
    ],
  },
  {
    name: "The Diamond",
    price: "$899",
    includes: [
      "Wave Hype Pack (6x/6x, 30 days)",
      "Monthly content buyout (8 posts)",
      "Custom collab campaign",
      "Priority booking + strategy call",
    ],
  },
];

export interface HypePack {
  name: string;
  postsStories: string;
  window: string;
  price: string;
}

export const hypePacks: HypePack[] = [
  { name: "Push Hype Pack", postsStories: "2x / 2x", window: "7 days", price: "$60" },
  { name: "Motion Hype Pack", postsStories: "4x / 4x", window: "14 days", price: "$110" },
  { name: "Wave Hype Pack", postsStories: "6x / 6x", window: "30 days", price: "$200" },
];

export interface PriceItem {
  name: string;
  price: string;
}

export const individualPromo: PriceItem[] = [
  { name: "Story Post", price: "$15" },
  { name: "Captioned Story", price: "$20" },
  { name: "Simple Repost", price: "$30" },
  { name: "Edited Post + Story", price: "$40" },
  { name: "YouTube Placement", price: "$35" },
  { name: "Link in Bio (5 days)", price: "$100" },
];

export const contentPackages: PriceItem[] = [
  { name: "Monthly Buyout — 8 posts", price: "$300" },
  { name: "The Creative Campaign — 10 posts custom", price: "$400" },
  { name: "Annual Buyout — 36 posts", price: "$1,000" },
];

export const collabAddOns: PriceItem[] = [
  { name: "2-Page Collab", price: "$60" },
  { name: "4-Page Collab", price: "$150" },
  { name: "Custom Collab", price: "$60/page" },
];

export const artistDevelopment: PriceItem[] = [
  { name: "Consultation", price: "$50/hr" },
  { name: "Social Media Management", price: "$1,000/wk" },
  { name: "SEO", price: "$150" },
  { name: "Email Blast", price: "$350" },
];

export const eventServices: PriceItem[] = [
  { name: "Full Planning", price: "$1,000" },
  { name: "Day-of Management", price: "$750" },
  { name: "Eventbrite Setup", price: "$300" },
];

export const digitalProducts: PriceItem[] = [
  { name: "The 6ix Blueprint", price: "$25 / $40" },
  { name: "Artist Launch Toolkit", price: "$15" },
];

export const allServiceNames = [
  ...bundles.map((b) => b.name),
  ...hypePacks.map((h) => h.name),
  ...individualPromo.map((i) => i.name),
  ...contentPackages.map((c) => c.name),
  ...collabAddOns.map((c) => c.name),
  ...artistDevelopment.map((a) => a.name),
  ...eventServices.map((e) => e.name),
  ...digitalProducts.map((d) => d.name),
];

export const budgetRanges = [
  "Under $100",
  "$100 – $300",
  "$300 – $500",
  "$500 – $1,000",
  "$1,000+",
];
