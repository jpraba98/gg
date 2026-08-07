export interface BlogPost {
  slug: string;
  title: string;
  category: "Events" | "Artist Features" | "Industry Tips" | "Press Releases" | "Culture";
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "island-motion-vol-1-announcement",
    title: "Announcing Island Motion Vol. 1 — A New Era for TheDripRoom6ix",
    category: "Press Releases",
    date: "2026-07-15",
    readTime: "3 min read",
    excerpt:
      "We're teaming up with Access 2 Motion and CTR Productions to bring Toronto its next unmissable night out. Here's everything you need to know.",
    author: "The Drip Room Team",
    content: [
      "TheDripRoom6ix is proud to announce Island Motion Vol. 1, presented by Access 2 Motion and powered by TheDripRoom6ix & CTR Productions, landing at Dopamine Lounge on August 27, 2026.",
      "This showcase brings together live performance and DJ culture in one room, headlined by Topman Meeko with sets from DJ Icy, and openers DJ Unruly & DJ Jojo.",
      "Tickets are limited and available now via Eventbrite. Doors open at 8:00 PM, last call at 2:00 AM. This is a 19+ event — valid ID required at the door.",
    ],
  },
  {
    slug: "how-we-built-a-toronto-media-brand",
    title: "From Scarborough to the 6ix: Building a Media Brand from Scratch",
    category: "Culture",
    date: "2026-05-02",
    readTime: "5 min read",
    excerpt:
      "A look back at five years of events, artist management, and media production — and what it took to build a lasting community.",
    author: "JP",
    content: [
      "Five years ago, The Drip Room started as an idea — a way to create space for Toronto's creative community that didn't exist yet.",
      "Since then we've produced 14+ events, worked with over 1,000 clients, and built a community of 8,000+ across our platforms.",
      "The throughline has always been the same: give Toronto's culture a real platform, and back it with the professionalism to make it last.",
    ],
  },
  {
    slug: "artist-promo-playbook",
    title: "The 6ix Blueprint: A Promo Playbook for Independent Artists",
    category: "Industry Tips",
    date: "2026-03-18",
    readTime: "6 min read",
    excerpt:
      "Practical strategies independent Toronto artists can use right now to grow their reach — pulled straight from our own service catalog.",
    author: "The Drip Room Team",
    content: [
      "Independent artists in Toronto face a crowded field, but the fundamentals of getting discovered haven't changed: consistent content, strategic placements, and real community engagement.",
      "Our Hype Packs were built specifically to give emerging artists an affordable way to test paid promotion without committing to a full campaign.",
      "Want the full breakdown? Check out The 6ix Blueprint in our Digital Products — a step-by-step guide built from what's actually worked for our own roster.",
    ],
  },
];
