import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = (session.customer_email || (session.customer as Stripe.Customer)?.email)?.toString()?.trim()?.toLowerCase();
      if (!email) {
        console.error("checkout.session.completed: no email");
        return NextResponse.json({ received: true });
      }
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
      const isSubscription = session.mode === "subscription" && session.subscription;
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription ?? null;
      const accessType = isSubscription ? "subscription" : "lifetime";

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
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const subId = subscription.id;
      const status = subscription.status;
      const customerId = subscription.customer as string;

      if (status === "active" || status === "trialing") {
        const customer = await stripe.customers.retrieve(customerId);
        const email = (customer as Stripe.Customer).email?.trim()?.toLowerCase();
        if (email) {
          await sql`
            UPDATE library_access
            SET stripe_subscription_id = ${subId}, access_type = 'subscription', updated_at = NOW()
            WHERE stripe_customer_id = ${customerId}
          `;
        }
      }
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const subId = subscription.id;
      await sql`
        UPDATE library_access
        SET stripe_subscription_id = NULL, updated_at = NOW()
        WHERE stripe_subscription_id = ${subId}
      `;
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
