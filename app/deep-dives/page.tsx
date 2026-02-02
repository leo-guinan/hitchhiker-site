import Link from "next/link";
import { getAllDeepDives } from "@/lib/content";

export const metadata = {
  title: "Deep Dives | The Hitchhiker's Guide to the Future",
  description:
    "Long-form essays on systems, platforms, and the structures that shape reality. Download as PDF for offline reading.",
};

export default function DeepDivesPage() {
  const deepDives = getAllDeepDives();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Deep Dives
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Long-form essays on systems, platforms, and the structures that shape
          reality. Each is available to read on the site or download as PDF for
          offline reading.
        </p>
      </header>

      {deepDives.length === 0 ? (
        <p className="text-[var(--muted)]">
          No deep dives yet. The first one is coming soon.
        </p>
      ) : (
        <ul className="space-y-6">
          {deepDives.map(({ slug, frontmatter, readingTime }) => (
            <li
              key={slug}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--muted)]"
            >
              <Link href={`/deep-dives/${slug}`} className="group block">
                <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:underline">
                  {frontmatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                  {frontmatter.excerpt}
                </p>
              </Link>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-xs text-[var(--muted-foreground)]">
                  {frontmatter.date} · {readingTime}
                </span>
                <Link
                  href={`/deep-dives/${slug}`}
                  className="text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Read online →
                </Link>
                <a
                  href={`/deep-dives/${slug}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:underline"
                >
                  Download PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
