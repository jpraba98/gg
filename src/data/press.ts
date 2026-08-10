export interface PressFeature {
  outlet: "BlogTO" | "PlayMoreEnt";
  title: string;
  url: string;
}

export const pressFeatures: PressFeature[] = [
  {
    outlet: "BlogTO",
    title: "Access2Motion Presents Island Motion Vol. 1",
    url: "https://www.blogto.com/events/access2motion-presents-island-motion-vol-1-toronto/",
  },
  {
    outlet: "BlogTO",
    title: "Stars Align in the 6ix",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-toronto-2/",
  },
  {
    outlet: "BlogTO",
    title: "Stars Align in the 6ix Season 6",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-season-6-toronto/",
  },
  {
    outlet: "BlogTO",
    title: "Stars Align in the 6ix",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-toronto/",
  },
  {
    outlet: "PlayMoreEnt",
    title: "Sandalwood Parkway — A Brampton-Born Collaboration",
    url: "https://playmoreent.com/articles/f/sandalwood-parkway-%E2%80%93-a-brampton-born-collaboration-that-sounds",
  },
];

export interface IndustryCredit {
  category: string;
  title: string;
  role: string;
  note?: string;
}

export const industryCredits: IndustryCredit[] = [
  {
    category: "Event Series",
    title: "Stars Align (Seasons 1–4)",
    role: "Lead Partner / Marketing",
    note: "Industry Artist Showcase Series",
  },
  {
    category: "Featured Event",
    title: "Island Motion Vol. 1",
    role: "Co-Producer & Marketing",
    note: "Featured on BlogTO",
  },
  {
    category: "Music Video Production",
    title: "Dope Boy DQ Videos",
    role: "Content / Event Coordinator",
    note: "3 Music Videos Produced",
  },
  {
    category: "Brand Placement",
    title: "Buggz Music Video",
    role: "Product Placement",
    note: "416 CustomKicks",
  },
  {
    category: "Documentary / Edit",
    title: "YungPro Vlog",
    role: "Video Editor / Documentation",
    note: "Artist Documentary Episode",
  },
];
