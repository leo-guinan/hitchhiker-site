import Link from "next/link";
import { getAllGuides } from "@/lib/content";
import type { GuideFrontmatter } from "@/lib/content";

function GuideCard({
  slug,
  frontmatter,
  readingTime,
  featured = false,
}: {
  slug: string;
  frontmatter: GuideFrontmatter;
  readingTime: string;
  featured?: boolean;
}) {
  const href = `/guides/${slug}`;
  if (featured) {
    return (
      <Link
        href={href}
        className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-[var(--muted)] sm:p-10"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          Featured Guide
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)] group-hover:underline sm:text-3xl">
          {frontmatter.title}
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          {frontmatter.excerpt}
        </p>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          {frontmatter.date} · {readingTime}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] group-hover:underline">
          Read guide →
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={href}
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
  );
}

export const metadata = {
  title: "Guides | The Hitchhiker's Guide to the Future",
  description:
    "Deep dives on the future of specific domains. Where things are heading and why. For people who need to see the map.",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const [featured, ...rest] = guides;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          The Guides
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Deep dives on the future of specific domains. Where things are heading
          and why. For people who need to see the map.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-[var(--muted)]">
          No guides yet. The first one is coming soon.
        </p>
      ) : (
        <>
          {featured && (
            <section className="mb-12">
              <GuideCard
                slug={featured.slug}
                frontmatter={featured.frontmatter}
                readingTime={featured.readingTime}
                featured
              />
            </section>
          )}
          {rest.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
              All Guides
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((g) => (
                <GuideCard
                  key={g.slug}
                  slug={g.slug}
                  frontmatter={g.frontmatter}
                  readingTime={g.readingTime}
                />
              ))}
            </div>
          </section>
          )}
        </>
      )}
    </div>
  );
}
