import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export type LibraryAuthResult =
  | { user: { id: string; email: string | null }; access: true }
  | { user: null; access: false };

export async function getLibraryAuth(): Promise<LibraryAuthResult> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim()?.toLowerCase();
  if (!email || !process.env.DATABASE_URL) {
    return { user: null, access: false };
  }

  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`
    SELECT email FROM library_access
    WHERE email = ${email}
      AND (
        access_type = 'lifetime'
        OR (access_type = 'subscription' AND stripe_subscription_id IS NOT NULL)
      )
  `;
  if (rows.length === 0) {
    return { user: null, access: false };
  }

  return {
    user: { id: session!.user!.id!, email: session!.user!.email ?? null },
    access: true,
  };
}
