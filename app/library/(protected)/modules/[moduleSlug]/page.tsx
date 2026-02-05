import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLibraryModuleBySlug,
  getLibraryModules,
} from "@/lib/library-content";

type Props = { params: Promise<{ moduleSlug: string }> };

export async function generateStaticParams() {
  return getLibraryModules().map((m) => ({ moduleSlug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = getLibraryModuleBySlug(moduleSlug);
  if (!mod) return { title: "Module Not Found" };
  return {
    title: `${mod.title} | Framework Library`,
    description: mod.excerpt,
  };
}

export default async function LibraryModulePage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = getLibraryModuleBySlug(moduleSlug);
  if (!mod) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {mod.title}
        </h1>
        {mod.excerpt && (
          <p className="mt-4 text-lg text-[var(--muted)]">{mod.excerpt}</p>
        )}
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Frameworks
        </h2>
        <ul className="mt-4 space-y-3">
          {mod.frameworks.map((fw) => (
            <li key={fw.slug}>
              <Link
                href={`/library/modules/${mod.slug}/${fw.slug}`}
                className="block rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 transition-colors hover:bg-[var(--border)]/30"
              >
                <span className="font-medium text-[var(--foreground)]">
                  {fw.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href="/library/dashboard"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← Your Library
        </Link>
      </footer>
    </div>
  );
}
