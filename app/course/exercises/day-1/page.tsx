import Link from "next/link";

export const metadata = {
  title: "Day 1: Map Your Identity Contradictions | 5-Day Course",
  description:
    "Exercise for Day 1 of The Games You're Actually Playing. List your identities, what each makes legible, and articulate capability without identity crutches.",
};

export default function Day1ExercisePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          5-Day Course: The Games You&apos;re Actually Playing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Day 1: Map Your Identity Contradictions
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Part of Day 1: The Trap of Static Identity. Read the{" "}
          <Link
            href="/deep-dives/validation-distance-problem"
            className="font-medium text-[var(--foreground)] hover:underline"
          >
            Validation Distance Problem
          </Link>{" "}
          deep dive for full context.
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <h2>Instructions</h2>

        <h3>Part 1: List 5–10 ways people have described you or roles you&apos;ve played</h3>
        <ul>
          <li>Include job titles, labels others use, identities you&apos;ve tried on</li>
          <li>Be specific: &quot;Product manager at X&quot; not just &quot;PM&quot;</li>
        </ul>

        <h3>Part 2: For each identity, write</h3>
        <ul>
          <li>What it makes legible about you</li>
          <li>What it hides or distorts</li>
          <li>Why you couldn&apos;t stay in it (or haven&apos;t fully committed to it)</li>
        </ul>

        <h3>Part 3: Identify the patterns</h3>
        <ul>
          <li>What capabilities show up across multiple identities but don&apos;t fit any single one?</li>
          <li>What questions can you answer that none of these identities explain?</li>
          <li>What positions can you model that these identities don&apos;t capture?</li>
        </ul>

        <h3>Part 4: The synthesis</h3>
        <ul>
          <li>Write 2–3 paragraphs describing what you actually do in terms of capabilities and perspectives, not identities</li>
          <li>Then try to compress it into a single identity label</li>
          <li>Note what gets lost in the compression</li>
          <li>This is the gap that games will solve</li>
        </ul>

        <h2>Submission format</h2>
        <ul>
          <li>PDF or markdown document</li>
          <li>Must include all four parts</li>
          <li>Part 4 synthesis must be specific enough that someone could verify your claims</li>
        </ul>

        <h2>What we&apos;re looking for</h2>
        <ul>
          <li>Recognition that identity labels are lossy compression</li>
          <li>Awareness of what gets lost</li>
          <li>Ability to articulate capability without identity crutches</li>
          <li>Honesty about the contradiction, not resolution of it</li>
        </ul>
      </div>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href="/course"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← Back to 5-Day Course
        </Link>
      </footer>
    </article>
  );
}
