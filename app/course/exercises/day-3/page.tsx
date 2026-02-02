import Link from "next/link";

export const metadata = {
  title: "Day 3: Score Yourself Across All Six Games | 5-Day Course",
  description:
    "Exercise for Day 3 of The Games You're Actually Playing. Self-assess across G1–G6, provide evidence, and identify your primary game.",
};

export default function Day3ExercisePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          5-Day Course: The Games You&apos;re Actually Playing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Day 3: Score Yourself Across All Six Games
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Part of Day 3: The Six Games Framework. Read{" "}
          <Link
            href="/deep-dives/six-games-deep-dive"
            className="font-medium text-[var(--foreground)] hover:underline"
          >
            The Six Games Deep Dive
          </Link>{" "}
          for full context.
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <h2>Instructions</h2>

        <h3>Part 1: Self-assessment</h3>
        <p>For each game (G1–G6), rate yourself on:</p>
        <ul>
          <li><strong>Capability (0–10):</strong> How good are you at playing this game?</li>
          <li><strong>Interest (0–10):</strong> How much do you enjoy this game?</li>
          <li><strong>Current activity (0–10):</strong> How much are you currently playing this game?</li>
          <li><strong>Natural fit (0–10):</strong> How naturally does this game come to you?</li>
        </ul>
        <p>Create a table with all 6 games and all 4 dimensions.</p>

        <h3>Part 2: Evidence</h3>
        <p>For each game where you scored &gt;5 on capability, provide:</p>
        <ul>
          <li>Specific example of you playing this game well</li>
          <li>Observable outcome (what happened because you played?)</li>
          <li>Who could verify your performance?</li>
          <li>What artifact exists as proof?</li>
        </ul>

        <h3>Part 3: Gap analysis</h3>
        <ul>
          <li>Where is your capability higher than your current activity? (Underutilized games)</li>
          <li>Where is your current activity higher than your capability? (Wasted effort)</li>
          <li>Where is interest high but capability low? (Development opportunity)</li>
          <li>Which game has the highest combined score across all dimensions? (Primary game)</li>
        </ul>

        <h3>Part 4: The hard truth</h3>
        <ul>
          <li>If you could only play ONE game for the next 6 months, which would it be?</li>
          <li>What would you have to stop doing?</li>
          <li>Who in your current network is playing this game at a high level?</li>
          <li>What would it take to actually commit to playing this game well?</li>
        </ul>

        <h2>Submission format</h2>
        <ul>
          <li>Structured document with scores table</li>
          <li>Evidence for all high-capability claims</li>
          <li>Complete gap analysis</li>
          <li>Part 4 must show real thinking about commitment, not just &quot;I&apos;d like to do X&quot;</li>
        </ul>

        <h2>What we&apos;re looking for</h2>
        <ul>
          <li>Honest self-assessment, not aspirational claims</li>
          <li>Actual evidence of capability (not just interest)</li>
          <li>Recognition of where effort is misaligned with capability</li>
          <li>Beginning to see which game you should actually be playing</li>
          <li>Willingness to consider stopping activities that don&apos;t serve your primary game</li>
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
