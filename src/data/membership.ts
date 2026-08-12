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
    name: "Free Member",
    monthly: "$0",
    yearly: "$0",
    perks: [
      "Create account",
      "Comment & like content",
      "Apply for staff roles",
      "Blog & media access",
    ],
  },
  {
    id: "dr-member",
    name: "TheDripRoom6ix Member",
    monthly: "$5/month",
    yearly: "$60/year",
    perks: [
      "All Free benefits",
      "Discounts on services",
      "Early event access",
      "Exclusive content drops",
      "Merch discounts",
    ],
    highlighted: true,
  },
  {
    id: "top-tier",
    name: "Top Tier",
    monthly: "$10/month",
    yearly: "$120/year",
    perks: [
      "All Member benefits",
      "Priority booking",
      "VIP event access",
      "Direct DM access",
      "Exclusive Top Tier content",
    ],
  },
];
