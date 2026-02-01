"use client";

import { useState } from "react";

type Variant = "course" | "subscribe";

export function EmailCapture({
  variant = "subscribe",
  className = "",
  id,
}: {
  variant?: Variant;
  className?: string;
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const isCourse = variant === "course";
  const title = isCourse
    ? "The 5-Day Course: Games You're Actually Playing"
    : "Subscribe for updates";
  const description = isCourse
    ? "Five days to find out if you're a Hitchhiker. Five exercises to prove you can see what we see. One cohort building coordination infrastructure for people who've crossed."
    : "Get new guides and episodes in your inbox.";
  const buttonLabel = isCourse ? "Start Day 1" : "Subscribe";
  const placeholder = "you@example.com";
  const list = isCourse ? "course" : "newsletter";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), list }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 ${className}`}
      {...(id ? { id } : {})}
    >
      <h2 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
        {title}
      </h2>
      <p className="mb-6 text-sm text-[var(--muted)]">{description}</p>
      {status === "success" ? (
        <p className="text-sm font-medium text-[var(--foreground)]">
          Check your inbox. We&apos;ve sent the first step.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              disabled={status === "loading"}
              className="min-w-0 flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "..." : buttonLabel}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-2 text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </section>
  );
}
