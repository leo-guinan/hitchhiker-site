import Link from "next/link";
import { neon } from "@neondatabase/serverless";

export const metadata = {
  title: "Submission Metrics | 5-Day Course",
  description:
    "Public dashboard of exercise submission metrics and workshop-eligible completions.",
};

export const dynamic = "force-dynamic";

async function getStats() {
  const empty = {
    submissionsByDay: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    uniqueSubmitters: 0,
    completedAllFive: 0,
  };

  const connString = process.env.DATABASE_URL;
  if (!connString) return empty;

  try {
    const sql = neon(connString);
    const [byDayRows, uniqueResult, completedResult] = await Promise.all([
      sql`
        SELECT exercise_day, COUNT(*)::int as count
        FROM submissions
        GROUP BY exercise_day
      `,
      sql`
        SELECT COUNT(DISTINCT email)::int as count
        FROM submissions
      `,
      sql`
        SELECT COUNT(*)::int as count
        FROM (
          SELECT email
          FROM submissions
          GROUP BY email
          HAVING COUNT(DISTINCT exercise_day) = 5
        ) t
      `,
    ]);

    const submissionsByDay: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    };
    for (const row of byDayRows) {
      const day = String(row.exercise_day);
      if (day in submissionsByDay) {
        submissionsByDay[day] = Number(row.count);
      }
    }

    return {
      submissionsByDay,
      uniqueSubmitters: Number(uniqueResult[0]?.count ?? 0),
      completedAllFive: Number(completedResult[0]?.count ?? 0),
    };
  } catch {
    return empty;
  }
}

export default async function DashboardPage() {
  const stats = await getStats();
  const dayLabels: Record<string, string> = {
    "1": "Day 1: Map Your Identity Contradictions",
    "2": "Day 2: Audit the Games You're Currently Playing",
    "3": "Day 3: Score Yourself Across All Six Games",
    "4": "Day 4: Design a Game With Roles You'd Actually Play",
    "5": "Day 5: Define Your First Season",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Submission Metrics
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Live stats for the 5-Day Course: The Games You&apos;re Actually Playing.
        </p>
      </header>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">
            Unique submitters
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            {stats.uniqueSubmitters}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">
            Completed all 5
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            {stats.completedAllFive}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Workshop-eligible
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">
            Total submissions
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            {Object.values(stats.submissionsByDay).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Submissions by day
        </h2>
        <ul className="mt-4 space-y-3">
          {(["1", "2", "3", "4", "5"] as const).map((day) => (
            <li
              key={day}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
            >
              <span className="text-sm text-[var(--foreground)]">
                {dayLabels[day]}
              </span>
              <span className="text-lg font-semibold text-[var(--foreground)]">
                {stats.submissionsByDay[day] ?? 0}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href="/course"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← Back to 5-Day Course
        </Link>
      </footer>
    </div>
  );
}
