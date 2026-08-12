import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_IDS: Record<string, string | undefined> = {
  "dr-member-monthly": process.env.STRIPE_PRICE_DR_MEMBER_MONTHLY,
  "dr-member-yearly": process.env.STRIPE_PRICE_DR_MEMBER_YEARLY,
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable checkout." },
      { status: 503 },
    );
  }

  const { plan } = (await req.json()) as { plan?: string };
  const priceId = plan ? PRICE_IDS[plan] : undefined;

  if (!priceId) {
    return NextResponse.json(
      { error: "Unknown or unconfigured plan. Set the matching STRIPE_PRICE_* env var." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(secretKey);
  const origin = req.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ["card"],
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/members?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 502 });
  }
}
