"use client";

import Link from "next/link";
import { trackGoal } from "fathom-client";

const entryPoints = [
  {
    label: "Speculation",
    headline: "Imagine a future that doesn't exist yet.",
    body: "Buy $MARVIN. Stake your belief before the story is written. Financial conviction is still conviction.",
    cta: "Buy $MARVIN →",
    href: "https://pump.fun/coin/91gCUo2EY9sXNCTioG2AbCCTyraNn9zXvX5HF9qnpump",
    external: true,
    accent: "border-t-2 border-t-amber-500",
    goalEnvKey: "NEXT_PUBLIC_FATHOM_GOAL_SPECULATION",
    ref: "speculation",
  },
  {
    label: "Work",
    headline: "Build toward one that might.",
    body: "Take the 5-day course. Do the exercises. Apply the framework to your actual situation. Work is how you prove you mean it.",
    cta: "Take the course →",
    href: "/course",
    external: false,
    accent: "border-t-2 border-t-teal-500",
    goalEnvKey: "NEXT_PUBLIC_FATHOM_GOAL_WORK",
    ref: "work",
  },
  {
    label: "Conviction",
    headline: "Believe in one enough to stake your story on it.",
    body: "Access the framework library. The actual tools — entropy surfaces, validation distance, shipping velocity. For people who need the map, not the tour.",
    cta: "Access the framework →",
    href: "/library",
    external: false,
    accent: "border-t-2 border-t-violet-500",
    goalEnvKey: "NEXT_PUBLIC_FATHOM_GOAL_CONVICTION",
    ref: "conviction",
  },
];

function getGoalId(envKey: string): string | null {
  // Next.js bakes NEXT_PUBLIC_ vars at build time — access via process.env
  return (process.env as Record<string, string>)[envKey] || null;
}

function trackEntry(goalEnvKey: string, ref: string) {
  const goalId = getGoalId(goalEnvKey);
  if (goalId) trackGoal(goalId, 0);
  // Also store ref in sessionStorage for downstream attribution
  try { sessionStorage.setItem("hg_ref", ref); } catch {}
}

export function EntryPoints() {
  return (
    <section className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {entryPoints.map(({ label, headline, body, cta, href, external, accent, goalEnvKey, ref }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEntry(goalEnvKey, ref)}
                className={`group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-[var(--muted)] ${accent}`}
              >
                <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                  {label}
                </span>
                <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)]">
                  {headline}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {body}
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--foreground)] group-hover:underline">
                  {cta}
                </span>
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                onClick={() => trackEntry(goalEnvKey, ref)}
                className={`group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-[var(--muted)] ${accent}`}
              >
                <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                  {label}
                </span>
                <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)]">
                  {headline}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {body}
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--foreground)] group-hover:underline">
                  {cta}
                </span>
              </Link>
            )
          )}
        </div>
        <p className="mt-10 text-center text-sm text-[var(--muted)]">
          All three paths lead to the same place:{" "}
          <span className="font-semibold text-[var(--foreground)]">Heart of Gold</span>
          {" "}— a crew of people who&apos;ve stopped waiting for the future to happen to them.
        </p>
      </div>
    </section>
  );
}
