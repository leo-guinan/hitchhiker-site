import Link from "next/link";
import { ExerciseSubmitForm } from "@/components/ExerciseSubmitForm";

export const metadata = {
  title: "Day 2: Audit the Games You're Currently Playing | 5-Day Course",
  description:
    "Exercise for Day 2 of The Games You're Actually Playing. Score your current contexts on roles, rules, outcomes, seasons, and exits.",
};

export default function Day2ExercisePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          5-Day Course: The Games You&apos;re Actually Playing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Day 2: Audit the Games You&apos;re Currently Playing
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Part of Day 2: Games Create Coordination. Read{" "}
          <Link
            href="/deep-dives/observable-games-vs-algorithmic-capture"
            className="font-medium text-[var(--foreground)] hover:underline"
          >
            Observable Games vs. Algorithmic Capture
          </Link>{" "}
          for full context.
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <h2>Instructions</h2>

        <h3>Part 1: Identify your current &quot;games&quot;</h3>
        <ul>
          <li>List 3–5 contexts where you&apos;re currently active (job, projects, communities, platforms)</li>
          <li>For each, try to identify: roles, rules, outcomes, seasons, exits</li>
        </ul>

        <h3>Part 2: Evaluate each as a game</h3>
        <p>Use this scoring (0–10 for each):</p>
        <ul>
          <li><strong>Roles:</strong> Are roles clearly defined? (0 = no roles, 10 = crystal clear)</li>
          <li><strong>Rules:</strong> Are rules shared and stable? (0 = chaotic, 10 = everyone knows)</li>
          <li><strong>Outcomes:</strong> Are outcomes observable? (0 = hidden/fake, 10 = anyone can verify)</li>
          <li><strong>Seasons:</strong> Is there bounded time? (0 = infinite, 10 = clear start/end)</li>
          <li><strong>Exits:</strong> Can you leave cleanly? (0 = trapped, 10 = expected and normal)</li>
        </ul>
        <p>Total score: 0–50 for each &quot;game&quot;</p>

        <h3>Part 3: Analysis</h3>
        <ul>
          <li>Which &quot;games&quot; scored highest? Why?</li>
          <li>Which scored lowest? What&apos;s missing?</li>
          <li>Are any of these actually games, or are they just performance contexts?</li>
          <li>Which ones create real coordination vs. just engagement?</li>
        </ul>

        <h3>Part 4: The hard question</h3>
        <ul>
          <li>If you could only play the top 2 games from your list, which would you choose?</li>
          <li>What would you have to stop doing?</li>
          <li>What are you currently doing that isn&apos;t a real game at all?</li>
          <li>Why are you still doing it?</li>
        </ul>

        <h2>Submission format</h2>
        <ul>
          <li>Spreadsheet or structured document</li>
          <li>All games scored on all dimensions</li>
          <li>Part 4 must show actual decision-making, not just listing</li>
        </ul>

        <h2>What we&apos;re looking for</h2>
        <ul>
          <li>Honest assessment of what&apos;s actually a game vs. performance theater</li>
          <li>Recognition that most &quot;work&quot; isn&apos;t structured as a real game</li>
          <li>Willingness to see where time is being wasted on fake games</li>
          <li>Beginning to think about what real games you&apos;d rather play</li>
        </ul>
      </div>

      <section className="mt-16">
        <ExerciseSubmitForm
          exerciseDay={2}
          exerciseTitle="Audit the Games You're Currently Playing"
        />
      </section>

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
