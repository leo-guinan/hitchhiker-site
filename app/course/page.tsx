import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata = {
  title: "5-Day Course | The Hitchhiker's Guide to the Future",
  description:
    "The Games You're Actually Playing. Five days to map your identity contradictions, audit your games, and design coordination infrastructure. Exercises produce artifacts that prove understanding.",
};

const designPrinciples = [
  "Each day builds on the previous",
  "Content is actionable, not theoretical",
  "Exercises produce artifacts that prove understanding",
  "Progression mirrors actual development through game space",
  "Culminates in designing your first real game",
];

const proofOfWork = [
  "Each exercise submission is timestamped",
  "Exercises must show actual thinking, not just completion",
  "All 5 exercises required for workshop discount",
  "Exercises are public (submitted via form that creates accountability)",
];

const days = [
  {
    day: 1,
    title: "The Trap of Static Identity",
    description:
      "Why your clarity looks like confusion. Map your identity contradictions—what gets lost when you compress yourself into a single label.",
    deepDive: { slug: "validation-distance-problem", title: "The Validation Distance Problem" },
    exercisePath: "/course/exercises/day-1",
  },
  {
    day: 2,
    title: "Games Create Coordination",
    description:
      "How temporary roles enable deeper trust than permanent brands. Audit the games you're currently playing—which are real, which are performance theater?",
    deepDive: { slug: "observable-games-vs-algorithmic-capture", title: "Observable Games vs. Algorithmic Capture" },
    exercisePath: "/course/exercises/day-2",
  },
  {
    day: 3,
    title: "The Six Games Framework",
    description:
      "Every transformation happens through one of six game types. Score yourself across all six—find your primary game and where you're wasting effort.",
    deepDive: { slug: "six-games-deep-dive", title: "The Six Games Deep Dive" },
    exercisePath: "/course/exercises/day-3",
  },
  {
    day: 4,
    title: "Roles, Seasons, and Clean Exits",
    description:
      "The infrastructure that makes flickering functional. Design a game with roles you'd actually play—bounded, observable, with clean exits.",
    deepDive: { slug: "designing-games-that-dont-capture", title: "Designing Games That Don't Capture" },
    exercisePath: "/course/exercises/day-4",
  },
  {
    day: 5,
    title: "Building Internet 2.0",
    description:
      "Your role in creating coordination infrastructure. Define your first season—Scout, Architect, or Guide—with a real commitment and observable outcome.",
    deepDive: { slug: "from-edges-to-federations", title: "From Edges to Federations" },
    exercisePath: "/course/exercises/day-5",
  },
];

const faq = [
  {
    q: "How long does each day take?",
    a: "About 15–20 minutes of reading, 30–45 minutes of extended reading (the deep dive), and 30–60 minutes for the exercise. Designed to fit around a full schedule.",
  },
  {
    q: "What if I don't complete the exercises?",
    a: "No guilt. The course is self-paced. You can do the exercises on your own anytime—no signup required. But if you complete all five and submit them, you get 50% off the live workshop—proof of work, not just signup.",
  },
  {
    q: "Can I do the exercises without signing up?",
    a: "Yes. Each day's exercise is available as a standalone page. Work through them at your own pace, with or without the email course.",
  },
  {
    q: "Is this for entrepreneurs only?",
    a: "No. It's for anyone who's crossed the threshold—who sees patterns others miss and can't find their people. You might be a founder, a researcher, an operator, or something that doesn't have a name yet.",
  },
];

export default function CoursePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          5-Day Email Course
        </h1>
        <p className="mt-6 text-2xl font-semibold text-[var(--foreground)]">
          The Games You&apos;re Actually Playing
        </p>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
          Five days to map your identity contradictions, audit your games, and
          design coordination infrastructure for people who&apos;ve crossed.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Course Architecture
        </h2>
        <h3 className="mt-6 text-lg font-medium text-[var(--foreground)]">
          Design principles
        </h3>
        <ul className="mt-3 space-y-2 text-[var(--muted)]">
          {designPrinciples.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]">•</span>
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-6 text-lg font-medium text-[var(--foreground)]">
          Proof-of-work structure
        </h3>
        <ul className="mt-3 space-y-2 text-[var(--muted)]">
          {proofOfWork.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The 5 days
        </h2>
        <ul className="mt-6 space-y-8">
          {days.map(({ day, title, description, deepDive, exercisePath }) => (
            <li key={day} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                  {day}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Link
                      href={`/deep-dives/${deepDive.slug}`}
                      className="text-sm font-medium text-[var(--foreground)] hover:underline"
                    >
                      Read: {deepDive.title} →
                    </Link>
                    <Link
                      href={exercisePath}
                      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:underline"
                    >
                      Do the exercise →
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Do the exercises on your own
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          No signup required. Each exercise is a standalone page you can work
          through at your own pace.
        </p>
        <ul className="mt-4 space-y-2">
          {days.map(({ day, title, exercisePath }) => (
            <li key={day}>
              <Link
                href={exercisePath}
                className="text-sm font-medium text-[var(--foreground)] hover:underline"
              >
                Day {day}: {title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/course/exercises"
          className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          View all exercises →
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Proof of work
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Complete all five exercises and submit them to get{" "}
          <strong className="text-[var(--foreground)]">50% off the live workshop</strong>.
          We don&apos;t want signups—we want Hitchhikers who did the work. Show
          your work, get the discount.
        </p>
        <Link
          href="/course/dashboard"
          className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          View submission metrics →
        </Link>
      </section>

      <section className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <EmailCapture variant="course" id="join" />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          FAQ
        </h2>
        <ul className="mt-6 space-y-8">
          {faq.map(({ q, a }) => (
            <li key={q}>
              <h3 className="font-medium text-[var(--foreground)]">{q}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{a}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
