import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuideBySlug, getGuideSlugs } from "@/lib/content";
import { EmailCapture } from "@/components/EmailCapture";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.frontmatter.title} | The Hitchhiker's Guide to the Future`,
    description: guide.frontmatter.excerpt,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { frontmatter, content, readingTime } = guide;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {frontmatter.title}
        </h1>
        {frontmatter.hook && (
          <p className="mt-4 text-xl text-[var(--muted)]">
            {frontmatter.hook}
          </p>
        )}
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          By Leo Guinan · {frontmatter.date} · {readingTime}
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/course"
            className="text-sm font-medium text-[var(--foreground)] hover:underline"
          >
            Download PDF
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-[var(--foreground)] hover:underline"
          >
            Share
          </Link>
        </div>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>

      <footer className="mt-16 border-t border-[var(--border)] pt-12">
        <p className="text-lg font-medium text-[var(--foreground)]">
          If this resonated, you might be a Hitchhiker.
        </p>
        <p className="mt-2 text-[var(--muted)]">
          The 5-Day Course helps you figure that out. Or join the consulting
          network when you&apos;re ready to build.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/course"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
          >
            Take the 5-Day Course
          </Link>
          <Link
            href="/network"
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/50"
          >
            Join the Network
          </Link>
        </div>
        <section className="mt-12">
          <EmailCapture variant="subscribe" />
        </section>
      </footer>
    </article>
  );
}
