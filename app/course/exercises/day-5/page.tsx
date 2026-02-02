import Link from "next/link";

export const metadata = {
  title: "Day 5: Define Your First Season | 5-Day Course",
  description:
    "Exercise for Day 5 of The Games You're Actually Playing. Choose Scout, Architect, or Guide—and commit to your first season.",
};

export default function Day5ExercisePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          5-Day Course: The Games You&apos;re Actually Playing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Day 5: Define Your First Season
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Part of Day 5: Building Internet 2.0. Read{" "}
          <Link
            href="/deep-dives/from-edges-to-federations"
            className="font-medium text-[var(--foreground)] hover:underline"
          >
            From Edges to Federations
          </Link>{" "}
          for full context.
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <h2>Instructions</h2>
        <p>This is where talk becomes commitment.</p>

        <h3>Part 1: Choose your role</h3>
        <p>Based on everything you&apos;ve learned, which role are you taking RIGHT NOW?</p>
        <ul>
          <li><strong>Scout (G6):</strong> Finding and connecting people</li>
          <li><strong>Architect (G3+G4):</strong> Designing and testing games</li>
          <li><strong>Guide (G2+G5):</strong> Helping others navigate</li>
        </ul>
        <p>Don&apos;t list all three. Pick ONE for your first season.</p>

        <h3>Part 2: Define your season</h3>
        <ul>
          <li><strong>Duration:</strong> When does this season start and end? (Be specific: dates)</li>
          <li><strong>Core commitment:</strong> What are you committing to do during this season?</li>
          <li><strong>Observable outcome:</strong> What artifact/result will prove you did it?</li>
          <li><strong>Time budget:</strong> How many hours per week, realistically?</li>
          <li><strong>Support needed:</strong> What do you need from others to make this work?</li>
        </ul>

        <h3>Part 3: Design your game</h3>
        <p><strong>If you&apos;re a Scout:</strong></p>
        <ul>
          <li>Which 10 people are you connecting in the next 30 days?</li>
          <li>What territory are you mapping?</li>
          <li>What waystations are you marking?</li>
        </ul>
        <p><strong>If you&apos;re an Architect:</strong></p>
        <ul>
          <li>Which game are you designing and testing?</li>
          <li>Who are the 5–10 people who&apos;ll play the first season?</li>
          <li>What&apos;s the observable outcome of your test?</li>
        </ul>
        <p><strong>If you&apos;re a Guide:</strong></p>
        <ul>
          <li>Who are the 10 people you&apos;re helping navigate?</li>
          <li>What framework/tool are you creating to help them?</li>
          <li>How will you know if it worked?</li>
        </ul>

        <h3>Part 4: The constraints</h3>
        <ul>
          <li>What could make you quit early? Be honest.</li>
          <li>What&apos;s the minimum viable version? If you had to 10x reduce scope, what&apos;s left?</li>
          <li>Who&apos;s going to hold you accountable? Name a specific person.</li>
          <li>What are you NOT doing to make room for this? What stops?</li>
        </ul>

        <h3>Part 5: The commitment</h3>
        <p>Write a public statement (2–3 paragraphs):</p>
        <ul>
          <li>This is the role I&apos;m playing</li>
          <li>This is the season I&apos;m committing to</li>
          <li>This is the outcome I&apos;m producing</li>
          <li>This is how you&apos;ll know if I did it</li>
          <li>This is when I&apos;m starting</li>
        </ul>

        <h2>Submission format</h2>
        <ul>
          <li>Complete document with all 5 parts</li>
          <li>Part 5 must be written as if it will be public (because it might be)</li>
          <li>Specific enough that someone could verify your commitment and hold you accountable</li>
        </ul>

        <h2>What we&apos;re looking for</h2>
        <ul>
          <li>Actual commitment, not aspiration</li>
          <li>Realistic scope (this is one season, not your life&apos;s work)</li>
          <li>Observable outcomes (not vague &quot;I&apos;ll learn&quot; or &quot;I&apos;ll explore&quot;)</li>
          <li>Honest constraint analysis</li>
          <li>Willingness to make it public</li>
        </ul>

        <h2>What happens after submission</h2>
        <ul>
          <li>If you completed all 5 exercises: workshop invitation with 50% discount</li>
          <li>Your Day 5 commitment becomes your accountability anchor</li>
          <li>We&apos;ll check in at the season end to see if you did what you said</li>
          <li>Your performance becomes part of your reputation in this network</li>
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
