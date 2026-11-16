import { NextRequest, NextResponse } from "next/server";

import { getCurrentProfile } from "@/lib/supabase/profile";
import { findCustomer, getStripe } from "@/lib/stripe";

/** Sends a subscriber to Stripe's hosted page to change plan, update card, or cancel. */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const profile = await getCurrentProfile();
  if (!stripe || !profile) {
    return NextResponse.json({ error: "Not available." }, { status: 400 });
  }

  const customer = await findCustomer(stripe, profile.id);
  if (!customer) {
    return NextResponse.json(
      { error: "No card subscription on file — e-Transfer memberships are managed by our team." },
      { status: 404 },
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${req.nextUrl.origin}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
