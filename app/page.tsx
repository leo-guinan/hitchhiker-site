import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { getAllGuides, getAllDeepDives } from "@/lib/content";
import { getEpisodes } from "@/lib/podcast";
import { getAllEssays } from "@/lib/content";

const entryPoints = [
  {
    label: "Speculation",
    headline: "Imagine a future that doesn't exist yet.",
    body: "Buy $MARVIN. Stake your belief before the story is written. Financial conviction is still conviction.",
    cta: "Buy $MARVIN →",
    href: "https://pump.fun/coin/91gCUo2EY9sXNCTioG2AbCCTyraNn9zXvX5HF9qnpump",
    external: true,
    accent: "border-t-2 border-t-amber-500",
    tag: "?ref=speculation",
  },
  {
    label: "Work",
    headline: "Build toward one that might.",
    body: "Take the 5-day course. Do the exercises. Apply the framework to your actual situation. Work is how you prove you mean it.",
    cta: "Take the course →",
    href: "/course",
    external: false,
    accent: "border-t-2 border-t-teal-500",
    tag: "?ref=work",
  },
  {
    label: "Conviction",
    headline: "Believe in one enough to stake your story on it.",
    body: "Access the framework library. The actual tools — entropy surfaces, validation distance, shipping velocity. For people who need the map, not the tour.",
    cta: "Access the framework →",
    href: "/library",
    external: false,
    accent: "border-t-2 border-t-violet-500",
    tag: "?ref=conviction",
  },
];

export default async function HomePage() {
  const guides = getAllGuides();
  const episodes = await getEpisodes();
  const essays = getAllEssays();
  const deepDives = getAllDeepDives();
  const latestGuide = guides[0];
  const latestEpisode = episodes[0];
  const latestEssay = essays[0];
  const latestDeepDive = deepDives[0];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
          The Hitchhiker&apos;s Guide to the Future
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
          There are three ways to accelerate time.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          Show us you&apos;re willing to imagine a future, work toward one, or believe in one —
          and we&apos;ll give you a crew.
        </p>
      </section>

      {/* Three entry points */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {entryPoints.map(({ label, headline, body, cta, href, external, accent }) => (
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-[var(--muted)] ${accent}`}
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                    {label}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)]">
                    {headline}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {body}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-[var(--foreground)] group-hover:underline">
                    {cta}
                  </span>
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-[var(--muted)] ${accent}`}
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                    {label}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)]">
                    {headline}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {body}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-[var(--foreground)] group-hover:underline">
                    {cta}
                  </span>
                </Link>
              )
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            All three paths lead to the same place:{" "}
            <span className="font-semibold text-[var(--foreground)]">Heart of Gold</span>
            {" "}— a crew of people who&apos;ve stopped waiting for the future to happen to them.
          </p>
        </div>
      </section>

      {/* Current focus - latest content */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
            Current Focus
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Latest Guide
              </p>
              {latestGuide ? (
                <>
                  <Link
                    href={`/guides/${latestGuide.slug}`}
                    className="mt-2 block text-base font-semibold text-[var(--foreground)] hover:underline"
                  >
                    {latestGuide.frontmatter.title}
                  </Link>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {latestGuide.frontmatter.excerpt}
                  </p>
                  <Link
                    href={`/guides/${latestGuide.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                  >
                    Read →
                  </Link>
                </>
              ) : (
                <span className="mt-2 block text-sm text-[var(--muted)]">Coming soon</span>
              )}
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Latest Episode
              </p>
              {latestEpisode ? (
                <>
                  <Link
                    href="/podcast"
                    className="mt-2 block text-base font-semibold text-[var(--foreground)] hover:underline"
                  >
                    #{String(latestEpisode.number).padStart(3, "0")}: {latestEpisode.title}
                  </Link>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {latestEpisode.description}
                  </p>
                  <Link
                    href="/podcast"
                    className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                  >
                    Listen →
                  </Link>
                </>
              ) : (
                <span className="mt-2 block text-sm text-[var(--muted)]">Coming soon</span>
              )}
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Latest Essay
              </p>
              {latestEssay ? (
                <>
                  <Link
                    href={`/essays/${latestEssay.slug}`}
                    className="mt-2 block text-base font-semibold text-[var(--foreground)] hover:underline"
                  >
                    {latestEssay.frontmatter.title}
                  </Link>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {latestEssay.frontmatter.excerpt}
                  </p>
                  <Link
                    href={`/essays/${latestEssay.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                  >
                    Read →
                  </Link>
                </>
              ) : (
                <span className="mt-2 block text-sm text-[var(--muted)]">Coming soon</span>
              )}
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Latest Deep Dive
              </p>
              {latestDeepDive ? (
                <>
                  <Link
                    href={`/deep-dives/${latestDeepDive.slug}`}
                    className="mt-2 block text-base font-semibold text-[var(--foreground)] hover:underline"
                  >
                    {latestDeepDive.frontmatter.title}
                  </Link>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {latestDeepDive.frontmatter.excerpt}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <Link
                      href={`/deep-dives/${latestDeepDive.slug}`}
                      className="text-sm font-medium text-[var(--foreground)] hover:underline"
                    >
                      Read →
                    </Link>
                    <a
                      href={`/deep-dives/${latestDeepDive.slug}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:underline"
                    >
                      PDF
                    </a>
                  </div>
                </>
              ) : (
                <span className="mt-2 block text-sm text-[var(--muted)]">Coming soon</span>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="mb-6 text-center text-sm text-[var(--muted)]">
            Not ready to board yet? Get new guides and episodes in your inbox.
          </p>
          <EmailCapture variant="subscribe" />
        </div>
      </section>
    </div>
  );
}
