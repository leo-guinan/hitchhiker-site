"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/library/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      if (result?.url) {
        window.location.href = callbackUrl;
      } else {
        setLoading(false);
      }
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-20">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Sign in to your library
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Use the email and password you set when creating your account.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[var(--accent)] py-2.5 font-medium text-[var(--accent-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Don&apos;t have an account?{" "}
        <Link href="/library/create-account" className="text-[var(--accent)] hover:underline">
          Create one
        </Link>{" "}
        (requires library access).
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/library" className="text-[var(--foreground)] hover:underline">
          ← Framework Library
        </Link>
      </p>
    </div>
  );
}

export default function LibrarySignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-center text-[var(--muted)]">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
