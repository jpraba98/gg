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
    title: "Stars Align in the 6ix — Season 5",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-toronto-2/",
  },
  {
    outlet: "BlogTO",
    title: "Stars Align in the 6ix — Season 4",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-toronto/",
  },
  {
    outlet: "BlogTO",
    title: "Stars Align in the 6ix — Season 6",
    url: "https://www.blogto.com/events/stars-align-in-the-6ix-season-6-toronto/",
  },
  // PlayMoreEnt "Sandalwood Parkway" article removed: the URL 404s (checked
  // Nov 17, 2026). Add it back here with a working link.
];

export interface IndustryCredit {
  category: string;
  title: string;
  role: string;
  note?: string;
  videoUrl?: string;
}

export const industryCredits: IndustryCredit[] = [
  {
    category: "Event Series",
    title: "Stars Align (Seasons 1–5)",
    role: "Lead Partner / Marketing",
    note: "Industry Artist Showcase Series",
    videoUrl: "https://www.youtube.com/watch?v=cApqBl8g1vY",
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
    videoUrl: "https://www.youtube.com/watch?v=oHRBXZze-J8",
  },
  {
    category: "Brand Placement",
    title: "Buggz Music Video",
    role: "Product Placement",
    note: "416 CustomKicks",
    videoUrl: "https://www.youtube.com/watch?v=olE63lyc-gk",
  },
  {
    category: "Documentary / Edit",
    title: "YungPro Vlog",
    role: "Video Editor / Documentation",
    note: "Artist Documentary Episode",
    videoUrl: "https://www.youtube.com/watch?v=bHzFK4RsvDo",
  },
];
