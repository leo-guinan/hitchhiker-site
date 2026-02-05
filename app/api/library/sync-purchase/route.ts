import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

/**
 * Syncs a completed Checkout Session to library_access.
 * Use when the webhook didn't run (e.g. local dev) or didn't have the email (legacy customer_email).
 * Call with session_id from the thanks page URL.
 */
export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });
  } catch (err) {
    console.error("Stripe session retrieve error:", err);
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return NextResponse.json({ error: "Session not paid" }, { status: 400 });
  }

  let email: string | null =
    (session.customer_details?.email ?? session.customer_email ?? null) as string | null;
  if (!email && session.customer) {
    const customer =
      typeof session.customer === "string"
        ? await stripe.customers.retrieve(session.customer)
        : session.customer;
    email = (customer as Stripe.Customer).email ?? null;
  }
  email = email?.trim()?.toLowerCase() ?? null;

  if (!email) {
    return NextResponse.json({ error: "No email on session" }, { status: 400 });
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
  const isSubscription = session.mode === "subscription" && session.subscription;
  const subId =
    typeof session.subscription === "string" ? session.subscription : session.subscription ?? null;
  const accessType = isSubscription ? "subscription" : "lifetime";

  const sql = neon(process.env.DATABASE_URL);
  await sql`
    INSERT INTO library_access (email, stripe_customer_id, access_type, stripe_subscription_id, updated_at)
    VALUES (${email}, ${customerId}, ${accessType}, ${subId}, NOW())
    ON CONFLICT (email) DO UPDATE SET
      stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, library_access.stripe_customer_id),
      access_type = CASE
        WHEN library_access.access_type = 'lifetime' THEN 'lifetime'
        ELSE EXCLUDED.access_type
      END,
      stripe_subscription_id = CASE
        WHEN EXCLUDED.stripe_subscription_id IS NOT NULL THEN EXCLUDED.stripe_subscription_id
        ELSE library_access.stripe_subscription_id
      END,
      updated_at = NOW()
  `;

  return NextResponse.json({ success: true, email });
}
