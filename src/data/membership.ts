export interface MembershipTier {
  id: "general" | "dr-member" | "top-tier";
  name: string;
  monthly: string;
  yearly: string;
  perks: string[];
  highlighted?: boolean;
}

export const membershipTiers: MembershipTier[] = [
  {
    id: "general",
    name: "General",
    monthly: "Free",
    yearly: "Free",
    perks: ["Blog access", "Service catalog access", "Booking access"],
  },
  {
    id: "dr-member",
    name: "DR Member",
    monthly: "$5/month",
    yearly: "$60/year",
    perks: [
      "Discounts on services + events + merch",
      "Early info drops",
      "Discord community access",
    ],
    highlighted: true,
  },
  {
    id: "top-tier",
    name: "Top Tier",
    monthly: "TBD",
    yearly: "TBD",
    perks: [
      "Priority booking",
      "Exclusive content",
      "Direct DM access",
      "VIP event access",
    ],
  },
];
