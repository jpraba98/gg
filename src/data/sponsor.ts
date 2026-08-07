export interface SponsorTier {
  name: string;
  price: string;
  benefits: string[];
}

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Bronze",
    price: "$300",
    benefits: [
      "Logo placement on event signage",
      "1 social media shoutout",
      "Mention in event recap post",
    ],
  },
  {
    name: "Silver",
    price: "$500",
    benefits: [
      "Everything in Bronze",
      "Logo on step-and-repeat backdrop",
      "2 social media shoutouts",
      "Vendor/booth space at event",
    ],
  },
  {
    name: "Gold",
    price: "$750",
    benefits: [
      "Everything in Silver",
      "Dedicated Instagram post",
      "Email database placement (500+)",
      "On-mic shoutout during event",
    ],
  },
  {
    name: "Platinum",
    price: "$1,000",
    benefits: [
      "Everything in Gold",
      "Co-branded content piece",
      "Priority booth placement",
      "Inclusion in pre-event promo campaign",
    ],
  },
  {
    name: "Diamond",
    price: "$1,500",
    benefits: [
      "Everything in Platinum",
      "Title/presenting sponsor recognition",
      "Custom activation opportunity",
      "Direct access to talent for collab content",
      "Full recap deck with reach analytics",
    ],
  },
  {
    name: "Custom",
    price: "Inquire",
    benefits: [
      "Tailored package built around your brand goals",
      "Multi-event partnership options",
      "Year-round collaboration opportunities",
    ],
  },
];

export const sponsorEvents = [
  "Island Motion Vol. 1",
  "Future Showcase (TBA)",
  "Ongoing Partnership",
  "Other",
];
