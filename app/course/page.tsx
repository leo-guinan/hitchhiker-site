import { EmailCapture } from "@/components/EmailCapture";

export const metadata = {
  title: "5-Day Course | The Hitchhiker's Guide to the Future",
  description:
    "Games You're Actually Playing. Five days to find out if you're a Hitchhiker. Five exercises. One cohort building coordination infrastructure.",
};

const faq = [
  {
    q: "How long does each day take?",
    a: "About 15–20 minutes of reading and one short exercise. Designed to fit around a full schedule.",
  },
  {
    q: "What if I don't complete the exercises?",
    a: "No guilt. The course is self-paced. But if you complete all five exercises, you get 50% off the live workshop—proof of work, not just signup.",
  },
  {
    q: "Is this for entrepreneurs only?",
    a: "No. It's for anyone who's crossed the threshold—who sees patterns others miss and can't find their people. You might be a founder, a researcher, an operator, or something that doesn't have a name yet.",
  },
];

const days = [
  { day: 1, title: "Which game are you in?", description: "Recognize the six games. Map your current commitments." },
  { day: 2, title: "What's your role?", description: "Identify the role you're playing—and whether it's bounded or unbounded." },
  { day: 3, title: "Where's the exit?", description: "Map clean exits. What would it take to leave without capture?" },
  { day: 4, title: "What do you see?", description: "Articulate the pattern you see that others miss. The Hitchhiker test." },
  { day: 5, title: "What's your waystation?", description: "Design a bounded commitment. One game, one season, one observable outcome." },
];

export default function CoursePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          You don&apos;t need to find yourself.
        </h1>
        <p className="mt-6 text-xl text-[var(--muted)] leading-relaxed">
          You need games you can play without being captured by them. The
          5-Day Course: <strong className="text-[var(--foreground)]">Games You&apos;re Actually Playing</strong>.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The problem
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Static identity was required for the old systems. &quot;What do you
          do?&quot; in one sentence. But you can&apos;t stay static anymore.
          You&apos;re iterating faster than the forms allow. The trap: maximum
          clarity, minimum coordination. You see the patterns—but you
          can&apos;t find the others who see them too.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The solution
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Games with roles. Bounded commitments. Observable outcomes. No
          identity capture—you play the game, and when the season ends, you
          leave. This course teaches you to recognize which game you&apos;re
          in and how to play without being captured.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The 5 days
        </h2>
        <ul className="mt-6 space-y-6">
          {days.map(({ day, title, description }) => (
            <li key={day} className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                {day}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Proof of work
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Complete all five exercises and you get <strong className="text-[var(--foreground)]">50% off the live workshop</strong>. We
          don&apos;t want signups—we want Hitchhikers who did the work. Show
          your work, get the discount.
        </p>
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
