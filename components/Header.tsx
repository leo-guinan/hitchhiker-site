import Link from "next/link";

const nav = [
  { href: "/guides", label: "Guides" },
  { href: "/podcast", label: "Podcast" },
  { href: "/network", label: "Network" },
  { href: "/course", label: "Course" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-16 max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
        >
          🧭 The Hitchhiker&apos;s Guide to the Future
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-4 sm:gap-6" aria-label="Main">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Join the Network
          </Link>
        </nav>
      </div>
    </header>
  );
}
