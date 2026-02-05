import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getLibraryFrameworkBySlug,
  getLibraryModuleBySlug,
} from "@/lib/library-content";

type Props = {
  params: Promise<{ moduleSlug: string; frameworkSlug: string }>;
};

export async function generateStaticParams() {
  const modules = await import("@/lib/library-content").then((m) =>
    m.getLibraryModules()
  );
  const params: { moduleSlug: string; frameworkSlug: string }[] = [];
  for (const mod of modules) {
    for (const fw of mod.frameworks) {
      params.push({ moduleSlug: mod.slug, frameworkSlug: fw.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { moduleSlug, frameworkSlug } = await params;
  const fw = getLibraryFrameworkBySlug(moduleSlug, frameworkSlug);
  const mod = getLibraryModuleBySlug(moduleSlug);
  if (!fw || !mod) return { title: "Not Found" };
  return {
    title: `${fw.frontmatter.title} | ${mod.title} | Framework Library`,
    description: fw.frontmatter.excerpt ?? mod.excerpt,
  };
}

export default async function LibraryFrameworkPage({ params }: Props) {
  const { moduleSlug, frameworkSlug } = await params;
  const fw = getLibraryFrameworkBySlug(moduleSlug, frameworkSlug);
  const mod = getLibraryModuleBySlug(moduleSlug);
  if (!fw || !mod) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {fw.frontmatter.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          {mod.title} · {fw.readingTime}
        </p>
      </header>

      <div className="prose prose-neutral mt-12 dark:prose-invert max-w-none">
        <MDXRemote source={fw.content} />
      </div>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href={`/library/modules/${moduleSlug}`}
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← {mod.title}
        </Link>
      </footer>
    </article>
  );
}
