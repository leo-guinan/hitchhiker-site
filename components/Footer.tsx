import Link from "next/link";

const content = [
  { href: "/guides", label: "Guides" },
  { href: "/podcast", label: "Podcast" },
  { href: "/essays", label: "Essays" },
  { href: "/waystations", label: "Waystations" },
];

const work = [
  { href: "/network", label: "Consulting Agency" },
  { href: "/course", label: "5-Day Course" },
  { href: "/course", label: "Workshop" },
  { href: "#", label: "Speaking" },
];

const connect = [
  { href: "#", label: "Substack" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub (MetaSPN)" },
];

const about = [
  { href: "/hitchhiker", label: "What is a Hitchhiker?" },
  { href: "/about", label: "About Leo" },
  { href: "/network#book", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Content
            </h3>
            <ul className="space-y-2">
              {content.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground)] hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Work With Us
            </h3>
            <ul className="space-y-2">
              {work.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground)] hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Connect
            </h3>
            <ul className="space-y-2">
              {connect.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground)] hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              About
            </h3>
            <ul className="space-y-2">
              {about.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground)] hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted)]">
          © 2026 MetaSPN · Built for people who&apos;ve crossed the threshold
        </div>
      </div>
    </footer>
  );
}
