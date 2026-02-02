import { EmailCapture } from "@/components/EmailCapture";

export const metadata = {
  title: "The Network | Consulting | The Hitchhiker's Guide to the Future",
  description:
    "Mercenary Polymaths on Retainer. A network of Hitchhikers who've crossed the threshold. Observable games, bounded commitments, seasonal engagements.",
};

const steps = [
  { n: 1, title: "Book intro call (30 min)" },
  { n: 2, title: "We identify if and how we can help" },
  { n: 3, title: "Match you with the right Hitchhiker(s)" },
  { n: 4, title: "Start delivering value immediately" },
];

const tiers = [
  {
    name: "Feynman Drop-In",
    price: "$5k/month",
    points: ["One Hitchhiker", "4–6 hours/month", "One good suggestion", "Month-to-month"],
    cta: "Book Call",
  },
  {
    name: "Embedded Polymath",
    price: "$15k/month",
    points: ["One Hitchhiker embedded", "10–15 hours/week", "Weekly sessions", "3-month seasons"],
    cta: "Book Call",
  },
  {
    name: "Network Access",
    price: "$50k/month",
    points: ["Full network available", "30–40 hours/month", "Multiple perspectives", "6-month minimum"],
    cta: "Book Call",
  },
];

const whoFor = [
  "AI/ML companies figuring out what to build next",
  "VCs needing rapid deep-dives on emerging spaces",
  "Traditional companies facing disruption",
  "Anyone stuck in local maxima needing a perspective shift",
];

export default function NetworkPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Mercenary Polymaths on Retainer
        </h1>
        <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
          Richard Feynman did industrial consulting as a side hustle. Few hours.
          Talk to engineers. Look at stuff. Maybe one good suggestion that made
          the company way better off.
        </p>
        <p className="mt-4 text-xl font-medium text-[var(--foreground)]">
          There was only one Feynman. We&apos;re a network of them.
        </p>
        <a
          href="#book"
          id="book"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          Book Intro Call
        </a>
      </header>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The problem
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Traditional consulting is broken. Specialists miss cross-domain
          patterns. Polymaths can&apos;t fit traditional structures. You need
          fresh perspective, not methodology. You need people who&apos;ve seen
          what you haven&apos;t—and can say it in plain language.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The solution
        </h2>
        <ul className="mt-4 space-y-2 text-[var(--muted)] leading-relaxed">
          <li>→ A network of Hitchhikers who&apos;ve crossed the threshold</li>
          <li>→ Observable games with bounded commitments</li>
          <li>→ Rotating roles based on what you need</li>
          <li>→ Seasonal engagements with clean exits</li>
          <li>→ Observable outcomes—or you stop paying</li>
        </ul>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Built on MetaSPN infrastructure—observable games, bounded commitments, seasonal engagements.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          How it works
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, title }) => (
            <li key={n} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                {n}
              </span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                {title}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-[var(--muted)]">
          Observable outcome within 30 days or you cancel. No long-term lock-in.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Three tiers
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {tier.name}
              </h3>
              <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                {tier.price}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--muted)]">
                {tier.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <a
                href="#book"
                className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Who it&apos;s for
        </h2>
        <ul className="mt-4 space-y-2 text-[var(--muted)]">
          {whoFor.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Book your intro call
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          30 minutes. No pitch. We&apos;ll figure out if and how we can help.
        </p>
        <div className="mt-6 min-h-[400px] rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center text-sm text-[var(--muted)]">
          Calendly embed: set <code className="rounded bg-[var(--border)] px-1">NEXT_PUBLIC_CALENDLY_URL</code> to show your scheduling link or iframe here.
        </div>
      </section>

      <section className="mt-16">
        <EmailCapture variant="subscribe" />
      </section>
    </div>
  );
}
