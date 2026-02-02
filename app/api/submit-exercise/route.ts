import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Submissions not configured" },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    exerciseDay?: number;
    submissionUrl?: string;
    summary?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const exerciseDay =
    typeof body.exerciseDay === "number" ? body.exerciseDay : NaN;
  const submissionUrl =
    typeof body.submissionUrl === "string" ? body.submissionUrl.trim() : "";
  const summary =
    typeof body.summary === "string" ? body.summary.trim() : null;

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }
  if (!Number.isInteger(exerciseDay) || exerciseDay < 1 || exerciseDay > 5) {
    return NextResponse.json(
      { error: "Exercise day must be 1–5" },
      { status: 400 }
    );
  }
  if (!submissionUrl) {
    return NextResponse.json(
      { error: "Submission URL is required" },
      { status: 400 }
    );
  }
  if (!isValidUrl(submissionUrl)) {
    return NextResponse.json(
      { error: "Invalid URL format" },
      { status: 400 }
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO submissions (email, exercise_day, submission_url, summary)
      VALUES (${email}, ${exerciseDay}, ${submissionUrl}, ${summary || null})
      ON CONFLICT (email, exercise_day)
      DO UPDATE SET
        submission_url = EXCLUDED.submission_url,
        summary = EXCLUDED.summary,
        created_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit exercise error:", err);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 502 }
    );
  }
}
