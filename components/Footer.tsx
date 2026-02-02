import Link from "next/link";
import { social } from "@/lib/site";

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
  {
    href: social.speaking || "/network#book",
    label: "Speaking",
  },
];

const connectLinks = [
  { href: social.substack, label: "Substack" },
  { href: social.twitter, label: "Twitter" },
  { href: social.linkedIn, label: "LinkedIn" },
  { href: social.github, label: "GitHub (MetaSPN)" },
].filter(({ href }) => href);

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
              {connectLinks.length > 0 ? (
                connectLinks.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--foreground)] hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-[var(--muted-foreground)]">
                  Links coming soon
                </li>
              )}
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
          © 2026 The Hitchhiker&apos;s Guide to the Future · Built on MetaSPN
        </div>
      </div>
    </footer>
  );
}
