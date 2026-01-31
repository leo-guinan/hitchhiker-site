import Link from "next/link";

export const metadata = {
  title: "Waystations | The Hitchhiker's Guide to the Future",
  description:
    "Small gatherings of Hitchhikers. Bounded duration. Safe to explore identity without capture. Offline integration.",
};

export default function WaystationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Waystations
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Small gatherings of Hitchhikers. Bounded duration. Safe to explore
          identity without capture.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          What&apos;s a waystation?
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          A waystation is a bounded space—in person or online—where
          Hitchhikers can meet without the usual capture. No algorithm watching.
          No unbounded commitment. You show up for a defined time, explore what
          you see with others who&apos;ve crossed the threshold, and leave when
          it&apos;s over. Think of it as rest and resupply between networks.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Upcoming waystations
        </h2>
        <p className="mt-4 text-[var(--muted)]">
          No upcoming events yet. When we schedule the first waystation—likely
          a small cohort in a single city—it&apos;ll be listed here with
          location, theme, and how to RSVP.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Past waystations
        </h2>
        <p className="mt-4 text-[var(--muted)]">
          Brief recaps, key insights, and artifacts from past gatherings will
          appear here once we have them.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Host a waystation
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          If you want to host a small gathering of Hitchhikers in your city or
          online: keep it bounded (one evening or one day), keep it safe (no
          capture, no obligation), and keep it focused (a theme or question to
          explore). To get your waystation listed here, complete the 5-day
          course and reach out—we&apos;ll add you to the list and share
          guidelines for what makes a good waystation.
        </p>
        <Link
          href="/course"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
        >
          Take the 5-Day Course
        </Link>
      </section>
    </div>
  );
}
