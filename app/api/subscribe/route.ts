import { NextResponse } from "next/server";

const CONVERTKIT_API = "https://api.convertkit.com/v3";

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

  try {
    const res = await fetch(`${CONVERTKIT_API}/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("ConvertKit subscribe error:", res.status, text);
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
