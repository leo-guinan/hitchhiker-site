import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID_LIFETIME || !process.env.STRIPE_PRICE_ID_MONTHLY) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let body: { priceType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const priceType = body.priceType === "monthly" ? "monthly" : "lifetime";
  const priceId = priceType === "monthly"
    ? process.env.STRIPE_PRICE_ID_MONTHLY
    : process.env.STRIPE_PRICE_ID_LIFETIME;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: priceType === "monthly" ? "subscription" : "payment",
      line_items: [{ price: priceId!, quantity: 1 }],
      success_url: `${baseUrl}/library/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/library`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 502 }
    );
  }
}
