import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { hash } from "bcryptjs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL);

  const accessRows = await sql`
    SELECT email FROM library_access WHERE email = ${email}
  `;
  if (accessRows.length === 0) {
    return NextResponse.json(
      {
        error:
          "No library access found for this email. If you just completed your purchase, wait a moment and try again, or sync from the thank-you page (use the same browser and click Create account from there). Otherwise, purchase access first.",
      },
      { status: 403 }
    );
  }

  const existing = await sql`
    SELECT email FROM library_passwords WHERE email = ${email}
  `;
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Account already exists. Sign in instead." },
      { status: 409 }
    );
  }

  const passwordHash = await hash(password, 12);

  const userRows = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (userRows.length === 0) {
    await sql`
      INSERT INTO users (name, email, "emailVerified", image)
      VALUES (NULL, ${email}, NULL, NULL)
    `;
  }

  await sql`
    INSERT INTO library_passwords (email, password_hash)
    VALUES (${email}, ${passwordHash})
    ON CONFLICT (email) DO NOTHING
  `;

  return NextResponse.json({ success: true });
}
