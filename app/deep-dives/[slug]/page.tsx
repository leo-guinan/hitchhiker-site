import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDeepDiveBySlug, getDeepDiveSlugs } from "@/lib/content";
import { getPromptsForDeepDive } from "@/lib/prompts";
import { CompanionPrompts } from "@/components/CompanionPrompts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getDeepDiveSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const deepDive = getDeepDiveBySlug(slug);
  if (!deepDive) return { title: "Deep Dive Not Found" };
  return {
    title: `${deepDive.frontmatter.title} | The Hitchhiker's Guide to the Future`,
    description: deepDive.frontmatter.excerpt,
  };
}

export default async function DeepDivePage({ params }: Props) {
  const { slug } = await params;
  const deepDive = getDeepDiveBySlug(slug);
  if (!deepDive) notFound();

  const { frontmatter, content, readingTime } = deepDive;
  const prompts = getPromptsForDeepDive(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            {frontmatter.date} · {readingTime}
          </p>
          <a
            href={`/deep-dives/${slug}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </a>
        </div>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>

      {prompts && prompts.length > 0 && (
        <CompanionPrompts prompts={prompts} />
      )}

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/deep-dives"
            className="text-sm font-medium text-[var(--foreground)] hover:underline"
          >
            ← All deep dives
          </Link>
          <a
            href={`/deep-dives/${slug}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--foreground)] hover:underline"
          >
            Download PDF
          </a>
        </div>
      </footer>
    </article>
  );
}
