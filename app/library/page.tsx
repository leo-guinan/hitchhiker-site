import Link from "next/link";
import { getLibraryModules } from "@/lib/library-content";
import { LibraryCheckoutButtons } from "./LibraryCheckoutButtons";

export const metadata = {
  title: "The Hitchhiker's Framework Library",
  description:
    "Premium research frameworks for people who think in systems. Lifetime access or monthly subscription.",
};

export default function LibrarySalesPage() {
  const modules = getLibraryModules();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
          You&apos;re not scattered. The infrastructure is broken.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          Premium research frameworks for people who see cross-domain patterns
          but can&apos;t make themselves legible to existing systems.
        </p>
        <div className="mt-10">
          <LibraryCheckoutButtons />
        </div>
      </section>

      {/* The Problem */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            The Problem
          </h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-[var(--muted)]">
            <li>You have capability that doesn&apos;t fit existing job categories.</li>
            <li>You see patterns across domains that specialists miss.</li>
            <li>Current platforms punish evolution and reward performance theater.</li>
          </ul>
        </div>
      </section>

      {/* The Solution */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          The Solution
        </h2>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Access to 24+ research frameworks organized into 5 modules:
        </p>
        <ul className="mt-6 space-y-2">
          {modules.map((mod) => (
            <li key={mod.slug} className="font-medium text-[var(--foreground)]">
              {mod.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Free for course completers */}
      <section className="border-t border-[var(--border)] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">Complete the free 5-day email course</strong> and submit all five exercises to get free access to the Framework Library—no payment required.
          </p>
          <Link
            href="/course"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Start the email course →
          </Link>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            What You Get
          </h2>
          <ul className="mt-6 space-y-3 text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              Complete framework documentation (100+ pages)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              Application examples and field manuals
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              Private discussion space
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              All future additions
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              Monthly development updates
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)]" aria-hidden>✓</span>
              Framework application templates
            </li>
          </ul>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Who This Is For
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--muted)]">
          <li>Polymaths who feel illegible despite being capable</li>
          <li>Researchers tired of unfalsifiable claims</li>
          <li>Consultants who need better positioning</li>
          <li>Builders designing coordination systems</li>
          <li>Anyone post-threshold (high G3, identity flux)</li>
        </ul>
      </section>

      {/* Proof */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Proof
          </h2>
          <blockquote className="mt-6 border-l-4 border-[var(--accent)] pl-4 italic text-[var(--muted)]">
            &ldquo;These frameworks gave me language for what I&apos;ve been experiencing. The Six Games alone was worth the price.&rdquo;
            <footer className="mt-2 not-italic text-sm">— Testimonial placeholder</footer>
          </blockquote>
          <blockquote className="mt-6 border-l-4 border-[var(--accent)] pl-4 italic text-[var(--muted)]">
            &ldquo;Finally, models that survive contact with reality.&rdquo;
            <footer className="mt-2 not-italic text-sm">— Testimonial placeholder</footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Pricing
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-[var(--accent)] bg-[var(--card)] p-6">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              Lifetime Access — $500
            </h3>
            <p className="mt-2 text-[var(--muted)]">One-time payment</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>All current + future frameworks</li>
              <li>Private community access</li>
              <li>Monthly updates</li>
            </ul>
            <div className="mt-6">
              <LibraryCheckoutButtons priceType="lifetime" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              Monthly — $50/month
            </h3>
            <p className="mt-2 text-[var(--muted)]">Cancel anytime</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>Same access as lifetime</li>
            </ul>
            <div className="mt-6">
              <LibraryCheckoutButtons priceType="monthly" />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="border-t border-[var(--border)] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center text-[var(--muted)]">
          <p className="font-medium">
            If the frameworks don&apos;t change how you see your work within 30 days, full refund.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">FAQ</h2>
          <dl className="mt-8 space-y-8">
            <div>
              <dt className="font-semibold text-[var(--foreground)]">
                How do I get free access?
              </dt>
              <dd className="mt-2 text-[var(--muted)]">
                Complete the free 5-day email course and submit all five exercises. Everyone who completes the course gets free access to the Framework Library—no payment required.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--foreground)]">
                Is this a course?
              </dt>
              <dd className="mt-2 text-[var(--muted)]">
                No. This is a research library. You get frameworks, not hand-holding.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--foreground)]">
                Will you add more frameworks?
              </dt>
              <dd className="mt-2 text-[var(--muted)]">
                Yes. Lifetime buyers get everything I build.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--foreground)]">
                Can I use these frameworks in my work?
              </dt>
              <dd className="mt-2 text-[var(--muted)]">
                Yes. Attribution appreciated but not required.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--foreground)]">
                Do I need technical background?
              </dt>
              <dd className="mt-2 text-[var(--muted)]">
                No. If you think in systems, you&apos;ll get value.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-4 py-8 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← Back to The Hitchhiker&apos;s Guide to the Future
        </Link>
      </footer>
    </div>
  );
}
