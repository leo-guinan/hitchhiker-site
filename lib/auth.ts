import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "@neondatabase/serverless";
import NeonAdapter from "@auth/neon-adapter";
import { compare } from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const authOptions: NextAuthOptions = {
  adapter: pool ? NeonAdapter(pool) : undefined,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/library/signin" },
  providers: [
    CredentialsProvider({
      name: "Library",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !process.env.DATABASE_URL) return null;
        const sql = neon(process.env.DATABASE_URL);
        const email = credentials.email.trim().toLowerCase();

        const pwRows = await sql`
          SELECT password_hash FROM library_passwords WHERE email = ${email}
        `;
        if (pwRows.length === 0) return null;
        const valid = await compare(credentials.password, pwRows[0].password_hash);
        if (!valid) return null;

        let userRows = await sql`SELECT id, name, email, "emailVerified", image FROM users WHERE email = ${email}`;
        if (userRows.length === 0) {
          await sql`
            INSERT INTO users (name, email, "emailVerified", image)
            VALUES (NULL, ${email}, NULL, NULL)
            RETURNING id, name, email, "emailVerified", image
          `;
          userRows = await sql`SELECT id, name, email, "emailVerified", image FROM users WHERE email = ${email}`;
        }
        if (userRows.length === 0) return null;
        const u = userRows[0];
        return {
          id: String(u.id),
          name: u.name ?? null,
          email: u.email ?? email,
          emailVerified: u.emailVerified ?? null,
          image: u.image ?? null,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
