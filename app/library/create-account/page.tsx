"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LibraryCreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/library/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      setDone(true);
      const signInResult = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      if (signInResult?.url) {
        window.location.href = "/library/dashboard";
      } else {
        setLoading(false);
      }
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-lg text-[var(--foreground)]">
          Account created. Redirecting to your library…
        </p>
        <Link href="/library/dashboard" className="mt-6 inline-block text-[var(--accent)] hover:underline">
          Go to library now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-20">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Create your library account
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Use the email you used when purchasing. You must have library access to create an account.
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
            Password (min 8 characters)
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
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
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/library/signin" className="text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/library" className="text-[var(--foreground)] hover:underline">
          ← Framework Library
        </Link>
      </p>
    </div>
  );
}
