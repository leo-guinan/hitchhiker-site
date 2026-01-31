import Link from "next/link";
import { getAllEssays } from "@/lib/content";
import type { EssayFrontmatter } from "@/lib/content";

export const metadata = {
  title: "Essays | The Hitchhiker's Guide to the Future",
  description:
    "Shorter explorations and framework pieces. Specific insights on identity, games, and coordination. 1000–2000 words.",
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Essays
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Shorter explorations and framework pieces. Specific insights on
          identity, games, and coordination. Different from the guides—these are
          1000–2000 words, not comprehensive deep dives.
        </p>
      </header>

      {essays.length === 0 ? (
        <p className="text-[var(--muted)]">
          No essays yet. Framework pieces and crossposts coming soon.
        </p>
      ) : (
        <ul className="space-y-6">
          {essays.map(({ slug, frontmatter, readingTime }) => (
            <li key={slug}>
              <Link
                href={`/essays/${slug}`}
                className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--muted)]"
              >
                <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:underline">
                  {frontmatter.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                  {frontmatter.excerpt}
                </p>
                <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                  {frontmatter.date} · {readingTime}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
