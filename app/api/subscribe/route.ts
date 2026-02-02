import { NextResponse } from "next/server";

// Kit/ConvertKit V4 API - V4 keys are NOT compatible with V3 (api.convertkit.com)
const KIT_API = "https://api.kit.com/v4";

type List = "course" | "newsletter";

function getFormId(list: List): string | undefined {
  if (list === "course") return process.env.CONVERTKIT_FORM_ID_COURSE;
  if (list === "newsletter") return process.env.CONVERTKIT_FORM_ID_NEWSLETTER;
  return undefined;
}

export async function POST(request: Request) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Subscription not configured" },
      { status: 503 }
    );
  }

  let body: { email?: string; list?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const list = body.list === "course" || body.list === "newsletter" ? body.list : "newsletter";

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const formId = getFormId(list);
  if (!formId) {
    return NextResponse.json(
      { error: "Form not configured for this list" },
      { status: 503 }
    );
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  try {
    // V4: Create subscriber first (upsert), then add to form.
    // Subscriber must exist before adding to form. Create does upsert.
    const createRes = await fetch(`${KIT_API}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        state: "active",
      }),
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error("ConvertKit create subscriber error:", createRes.status, text);
      return NextResponse.json(
        { error: "Subscription failed" },
        { status: 502 }
      );
    }

    const addRes = await fetch(`${KIT_API}/forms/${formId}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
      }),
    });

    if (!addRes.ok) {
      const text = await addRes.text();
      console.error("ConvertKit add to form error:", addRes.status, text);
      return NextResponse.json(
        { error: "Subscription failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ConvertKit subscribe error:", err);
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 502 }
    );
  }
}
