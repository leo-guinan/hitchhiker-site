#!/usr/bin/env node
/**
 * Initialize Neon Postgres tables: submissions, Auth.js (users, accounts, sessions, verification_tokens), library_access.
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

  // --- submissions (existing) ---
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
  await sql`CREATE INDEX IF NOT EXISTS idx_submissions_exercise_day ON submissions (exercise_day)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions (email)`;
  console.log("Table 'submissions' created (or already exists).");

  // --- Auth.js (NextAuth) @auth/neon-adapter schema ---
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      "emailVerified" TIMESTAMPTZ,
      image TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(255) NOT NULL,
      provider VARCHAR(255) NOT NULL,
      "providerAccountId" VARCHAR(255) NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at BIGINT,
      id_token TEXT,
      scope TEXT,
      session_state TEXT,
      token_type TEXT,
      UNIQUE(provider, "providerAccountId")
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires TIMESTAMPTZ NOT NULL,
      "sessionToken" VARCHAR(255) NOT NULL UNIQUE
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS verification_token (
      identifier TEXT NOT NULL,
      expires TIMESTAMPTZ NOT NULL,
      token TEXT NOT NULL,
      PRIMARY KEY (identifier, token)
    )
  `;
  console.log("Auth.js tables (users, accounts, sessions, verification_token) created (or already exist).");

  // --- library_access (Stripe-driven) ---
  await sql`
    CREATE TABLE IF NOT EXISTS library_access (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      stripe_customer_id TEXT,
      access_type TEXT NOT NULL CHECK (access_type IN ('lifetime', 'subscription')),
      stripe_subscription_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_library_access_email ON library_access (email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_library_access_stripe_customer ON library_access (stripe_customer_id)`;

  await sql`
    CREATE TABLE IF NOT EXISTS library_passwords (
      email TEXT NOT NULL UNIQUE PRIMARY KEY,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("Table 'library_passwords' created (or already exists).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
