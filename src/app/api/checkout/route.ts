import { NextRequest, NextResponse } from "next/server";

import { getCurrentProfile } from "@/lib/supabase/profile";
import { PLANS, findCustomer, getStripe, type PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Card payments aren't set up yet — use e-Transfer for now." },
      { status: 503 },
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Create a free account first.", needsAccount: true }, { status: 401 });
  }

  const { plan } = (await req.json()) as { plan?: string };
  const config = plan && plan in PLANS ? PLANS[plan as PlanId] : undefined;
  if (!config?.priceId) {
    return NextResponse.json({ error: "That plan isn't available right now." }, { status: 400 });
  }

  const origin = req.nextUrl.origin;

  try {
    const customer = await findCustomer(stripe, profile.id, {
      email: profile.email,
      name: profile.displayName,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer!.id,
      client_reference_id: profile.id,
      line_items: [{ price: config.priceId, quantity: 1 }],
      subscription_data: { metadata: { supabase_user_id: profile.id } },
      allow_promotion_codes: true,
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/members?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json({ error: "Couldn't start checkout. Try again in a minute." }, { status: 502 });
  }
}
