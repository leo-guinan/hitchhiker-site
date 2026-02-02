import Link from "next/link";

export const metadata = {
  title: "Day 4: Design a Game With Roles You'd Actually Play | 5-Day Course",
  description:
    "Exercise for Day 4 of The Games You're Actually Playing. Design a real game with roles, season structure, and clean exits.",
};

export default function Day4ExercisePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          5-Day Course: The Games You&apos;re Actually Playing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Day 4: Design a Game With Roles You&apos;d Actually Play
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Part of Day 4: Roles, Seasons, and Clean Exits. Read{" "}
          <Link
            href="/deep-dives/designing-games-that-dont-capture"
            className="font-medium text-[var(--foreground)] hover:underline"
          >
            Designing Games That Don&apos;t Capture
          </Link>{" "}
          for full context.
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <h2>Instructions</h2>
        <p>Design a real game you would actually participate in.</p>

        <h3>Part 1: Game specification</h3>
        <ul>
          <li><strong>Game type:</strong> Which of the 6 games (G1–G6)?</li>
          <li><strong>Core outcome:</strong> What does winning produce?</li>
          <li><strong>Duration:</strong> How long is one season?</li>
          <li><strong>Player count:</strong> How many people?</li>
          <li><strong>Observable measures:</strong> How do you know if it worked?</li>
        </ul>

        <h3>Part 2: Role design</h3>
        <p>Define 2–3 roles needed for this game. For each role, specify:</p>
        <ul>
          <li><strong>Role name:</strong> What do you call this role?</li>
          <li><strong>Core responsibility:</strong> What is this role&apos;s job?</li>
          <li><strong>Observable behaviors:</strong> How can others see if you&apos;re playing this role well?</li>
          <li><strong>Entry requirements:</strong> What capability do you need to take this role?</li>
          <li><strong>Exit conditions:</strong> When/how does someone leave this role?</li>
          <li><strong>Time commitment:</strong> How much time per week?</li>
        </ul>

        <h3>Part 3: Season structure</h3>
        <ul>
          <li><strong>Start ritual:</strong> How does the season begin?</li>
          <li><strong>Mid-season check:</strong> How do you know if you&apos;re on track?</li>
          <li><strong>End ritual:</strong> How does the season conclude?</li>
          <li><strong>Outcome documentation:</strong> What artifact proves this season happened?</li>
          <li><strong>Re-entry option:</strong> Could someone play again in a future season?</li>
        </ul>

        <h3>Part 4: The commitment</h3>
        <ul>
          <li>Which role would you play? Be specific.</li>
          <li>For how long? Actual commitment, not aspiration.</li>
          <li>Who else would need to play? Name real people or describe real profiles.</li>
          <li>What would make you exit early? Be honest about your constraints.</li>
          <li>Why this game, now? What makes this worth doing?</li>
        </ul>

        <h2>Submission format</h2>
        <ul>
          <li>Structured document with all parts complete</li>
          <li>Specific enough that someone could actually run this game</li>
          <li>Part 4 must show real thinking about constraints and commitment</li>
        </ul>

        <h2>What we&apos;re looking for</h2>
        <ul>
          <li>Actual game design, not vague &quot;it would be cool if...&quot;</li>
          <li>Roles that are well-defined and observable</li>
          <li>Season structure that makes sense for the game type</li>
          <li>Honest assessment of whether you&apos;d actually play</li>
          <li>Recognition of what infrastructure would be needed</li>
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
