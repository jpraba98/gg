import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import { bestTier, getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe → site. Whenever a subscription starts, changes, or ends, recompute
 * the member's tier from all of their live subscriptions and save it.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabase = createAdminClient();
  if (!stripe || !secret || !supabase) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? "", secret);
  } catch (err) {
    console.error("Stripe webhook signature check failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!event.type.startsWith("customer.subscription.")) {
    return NextResponse.json({ received: true });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata?.supabase_user_id;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  if (!userId) {
    console.warn("Subscription without supabase_user_id metadata:", subscription.id);
    return NextResponse.json({ received: true });
  }

  const all = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 });
  const tier = bestTier(all.data);

  const { error } = await supabase.from("profiles").update({ membership_tier: tier }).eq("id", userId);
  if (error) {
    console.error("Failed to update membership tier:", error);
    // Non-2xx makes Stripe retry later.
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true, tier });
}
