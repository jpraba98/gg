import Stripe from "stripe";

import type { MembershipTier } from "@/lib/supabase/profile";

/** Server-only. Returns null when Stripe isn't configured yet. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

export type PlanId = "member-monthly" | "member-yearly" | "top-tier-monthly" | "top-tier-yearly";

export const PLANS: Record<PlanId, { tier: Exclude<MembershipTier, "free">; priceId?: string }> = {
  "member-monthly": { tier: "member", priceId: process.env.STRIPE_PRICE_DR_MEMBER_MONTHLY },
  "member-yearly": { tier: "member", priceId: process.env.STRIPE_PRICE_DR_MEMBER_YEARLY },
  "top-tier-monthly": { tier: "top_tier", priceId: process.env.STRIPE_PRICE_TOP_TIER_MONTHLY },
  "top-tier-yearly": { tier: "top_tier", priceId: process.env.STRIPE_PRICE_TOP_TIER_YEARLY },
};

export function tierForPrice(priceId: string): Exclude<MembershipTier, "free"> | null {
  const match = Object.values(PLANS).find((p) => p.priceId === priceId);
  return match?.tier ?? null;
}

const TIER_RANK: Record<MembershipTier, number> = { free: 0, member: 1, top_tier: 2 };

/** Highest tier among a customer's live subscriptions ("free" if none). */
export function bestTier(subscriptions: Stripe.Subscription[]): MembershipTier {
  let best: MembershipTier = "free";
  for (const sub of subscriptions) {
    // past_due keeps access while Stripe retries the card.
    if (!["active", "trialing", "past_due"].includes(sub.status)) continue;
    for (const item of sub.items.data) {
      const tier = tierForPrice(item.price.id);
      if (tier && TIER_RANK[tier] > TIER_RANK[best]) best = tier;
    }
  }
  return best;
}

/** Find the Stripe customer for a site user, creating one if asked. */
export async function findCustomer(
  stripe: Stripe,
  userId: string,
  create?: { email: string | null; name: string | null },
): Promise<Stripe.Customer | null> {
  const found = await stripe.customers.search({
    query: `metadata['supabase_user_id']:'${userId}'`,
    limit: 1,
  });
  if (found.data[0]) return found.data[0];
  if (!create) return null;
  return stripe.customers.create({
    email: create.email ?? undefined,
    name: create.name ?? undefined,
    metadata: { supabase_user_id: userId },
  });
}
