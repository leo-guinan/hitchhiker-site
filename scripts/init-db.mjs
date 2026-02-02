#!/usr/bin/env node
/**
 * Initialize the submissions table in Neon Postgres.
 * Run: npm run db:init (loads DATABASE_URL from .env.local)
 * Or: DATABASE_URL=... node scripts/init-db.mjs
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required. Set it in .env.local or pass inline.");
    process.exit(1);
  }

  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      exercise_day INTEGER NOT NULL CHECK (exercise_day BETWEEN 1 AND 5),
      submission_url TEXT NOT NULL,
      summary TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(email, exercise_day)
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_exercise_day
    ON submissions (exercise_day)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_email
    ON submissions (email)
  `;

  console.log("Table 'submissions' created (or already exists).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
