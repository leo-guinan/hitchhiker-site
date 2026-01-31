import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getEssayBySlug, getEssaySlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getEssaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return { title: "Essay Not Found" };
  return {
    title: `${essay.frontmatter.title} | The Hitchhiker's Guide to the Future`,
    description: essay.frontmatter.excerpt,
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const { frontmatter, content, readingTime } = essay;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          {frontmatter.date} · {readingTime}
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href="/essays"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← All essays
        </Link>
      </footer>
    </article>
  );
}
