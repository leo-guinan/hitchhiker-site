import Link from "next/link";

export const metadata = {
  title: "Course Exercises | The Hitchhiker's Guide to the Future",
  description:
    "Standalone exercises from the 5-Day Course: The Games You're Actually Playing. No signup required—work through them at your own pace.",
};

const exercises = [
  {
    day: 1,
    title: "Map Your Identity Contradictions",
    description:
      "List your identities, what each makes legible, and articulate capability without identity crutches.",
    path: "/course/exercises/day-1",
  },
  {
    day: 2,
    title: "Audit the Games You're Currently Playing",
    description:
      "Score your current contexts on roles, rules, outcomes, seasons, and exits.",
    path: "/course/exercises/day-2",
  },
  {
    day: 3,
    title: "Score Yourself Across All Six Games",
    description:
      "Self-assess across G1–G6, provide evidence, and identify your primary game.",
    path: "/course/exercises/day-3",
  },
  {
    day: 4,
    title: "Design a Game With Roles You'd Actually Play",
    description:
      "Design a real game with roles, season structure, and clean exits.",
    path: "/course/exercises/day-4",
  },
  {
    day: 5,
    title: "Define Your First Season",
    description:
      "Choose Scout, Architect, or Guide—and commit to your first season.",
    path: "/course/exercises/day-5",
  },
];

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Course Exercises
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          From the 5-Day Course: The Games You&apos;re Actually Playing. No signup
          required—work through these at your own pace.
        </p>
      </header>

      <ul className="mt-12 space-y-6">
        {exercises.map(({ day, title, description, path }) => (
          <li key={day}>
            <Link
              href={path}
              className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--muted)]"
            >
              <span className="text-sm font-medium text-[var(--muted)]">
                Day {day}
              </span>
              <h2 className="mt-1 text-xl font-semibold text-[var(--foreground)]">
                {title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--foreground)]">
                Start exercise →
              </span>
            </Link>
          </li>
        ))}
      </ul>

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
