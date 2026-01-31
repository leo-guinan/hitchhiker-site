import Link from "next/link";

export const metadata = {
  title: "About | The Hitchhiker's Guide to the Future",
  description:
    "Leo Guinan's story: the threshold moment, five years of rejected networks, and building the infrastructure for people who've crossed.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
        About
      </h1>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The story
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          There was a threshold moment. After that, the old identities
          didn&apos;t fit. The old networks didn&apos;t hold. For five years,
          every institution and community that promised &quot;your people&quot;
          ended up rejecting the mismatch—too much clarity, not enough
          compliance. Too many patterns, not enough permission.
        </p>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          The realization: the infrastructure was broken, not me. The
          coordination systems we have were built for static identities and
          bounded roles. They weren&apos;t built for people who see what
          comes next and can&apos;t unsee it.
        </p>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          So I decided to build what&apos;s needed. A Hitchhiker to the Future
          is someone who&apos;s crossed that threshold and is building the
          infrastructure for what comes next—starting with this waystation.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          What I&apos;m building
        </h2>
        <ul className="mt-4 space-y-2 text-[var(--muted)] leading-relaxed">
          <li>→ Observable games for coordination</li>
          <li>→ Infrastructure for fluid identity</li>
          <li>→ A network for people who&apos;ve crossed</li>
          <li>→ The repricing thesis—what gets valued when the old systems break</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Why it matters
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          The window is closing. In 12–24 months, the old coordination
          infrastructure will be visibly obsolete for a critical mass. Someone
          has to build what replaces it. You can&apos;t find the people
          who&apos;ve crossed if there&apos;s no waystation. This is that
          waystation. I&apos;m the Hitchhiker-Guide—and I&apos;m building it
          with everyone who shows up ready.
        </p>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/network"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
          >
            Join the Network
          </Link>
          <Link
            href="/course"
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/50"
          >
            Take the 5-Day Course
          </Link>
          <Link
            href="/network#book"
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/50"
          >
            Hire Us
          </Link>
        </div>
      </section>
    </article>
  );
}
