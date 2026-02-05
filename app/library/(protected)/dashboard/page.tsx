import Link from "next/link";
import { getLibraryModules } from "@/lib/library-content";

export const metadata = {
  title: "Your Library",
  description: "Access your Framework Library modules.",
};

export default async function LibraryDashboardPage() {
  const modules = getLibraryModules();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Your Library
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Premium research frameworks for people who think in systems.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Modules</h2>
        <ul className="mt-4 space-y-3">
          {modules.map((mod) => (
            <li key={mod.slug}>
              <Link
                href={`/library/modules/${mod.slug}`}
                className="block rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-4 transition-colors hover:bg-[var(--border)]/30"
              >
                <span className="font-medium text-[var(--foreground)]">{mod.title}</span>
                {mod.excerpt && (
                  <p className="mt-1 text-sm text-[var(--muted)]">{mod.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-[var(--border)] pt-8">
        <Link
          href="/library"
          className="text-sm font-medium text-[var(--foreground)] hover:underline"
        >
          ← Framework Library home
        </Link>
      </footer>
    </div>
  );
}
