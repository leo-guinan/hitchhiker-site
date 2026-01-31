import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { getAllGuides } from "@/lib/content";
import { getEpisodes } from "@/lib/podcast";
import { getAllEssays } from "@/lib/content";

const valueStreams = [
  {
    title: "The Guides",
    description:
      "Deep dives on the future of specific domains. Where things are heading and why. For people who need to see the map.",
    href: "/guides",
    icon: "📖",
  },
  {
    title: "The Podcast",
    description:
      "Conversations with people who've crossed the threshold. Pattern recognition across domains. For people who think in systems.",
    href: "/podcast",
    icon: "🎙️",
  },
  {
    title: "The Network",
    description:
      "Infrastructure for post-ego-death coordination. Games, roles, seasons. The future of work. For people ready to build.",
    href: "/network",
    icon: "🏗️",
  },
];

export default function HomePage() {
  const guides = getAllGuides();
  const episodes = getEpisodes();
  const essays = getAllEssays();
  const latestGuide = guides[0];
  const latestEpisode = episodes[0];
  const latestEssay = essays[0];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
          The Hitchhiker&apos;s Guide to the Future
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          You&apos;ve crossed the threshold. You can see patterns others miss. You
          know the old coordination infrastructure is breaking.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          But you can&apos;t find your people. And you can&apos;t coordinate with
          the ones you do find.
        </p>
        <p className="mt-6 text-xl font-medium text-[var(--foreground)]">
          This is the infrastructure for people who&apos;ve crossed.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/hitchhiker"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Start Here
          </Link>
          <a
            href="#join"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-6 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
          >
            Join the Network
          </a>
        </div>
      </section>

      {/* Three value streams */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {valueStreams.map(({ title, description, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 transition-colors hover:border-[var(--muted)] hover:bg-[var(--background)]/80"
              >
                <span className="text-2xl" aria-hidden>
                  {icon}
                </span>
                <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)] group-hover:underline">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] group-hover:underline">
                  → {title === "The Guides" ? "Go to Guides" : title === "The Podcast" ? "Go to Podcast" : "Go to Network"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Current focus - latest content */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="mb-8 text-2xl font-semibold text-[var(--foreground)]">
          Current Focus
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Latest Guide
            </p>
            {latestGuide ? (
              <>
                <Link
                  href={`/guides/${latestGuide.slug}`}
                  className="mt-2 block text-lg font-semibold text-[var(--foreground)] hover:underline"
                >
                  {latestGuide.frontmatter.title}
                </Link>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {latestGuide.frontmatter.excerpt}
                </p>
                <Link
                  href={`/guides/${latestGuide.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Read guide →
                </Link>
              </>
            ) : (
              <>
                <span className="mt-2 block text-lg font-semibold text-[var(--muted)]">
                  Coming soon
                </span>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Deep dives on the future of specific domains.
                </p>
                <Link
                  href="/guides"
                  className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Go to guides →
                </Link>
              </>
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
                  className="mt-2 block text-lg font-semibold text-[var(--foreground)] hover:underline"
                >
                  #{String(latestEpisode.number).padStart(3, "0")}: {latestEpisode.title}
                </Link>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {latestEpisode.description}
                </p>
                <Link
                  href="/podcast"
                  className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Go to podcast →
                </Link>
              </>
            ) : (
              <>
                <span className="mt-2 block text-lg font-semibold text-[var(--muted)]">
                  Coming soon
                </span>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Conversations with people who&apos;ve crossed the threshold.
                </p>
                <Link
                  href="/podcast"
                  className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Go to podcast →
                </Link>
              </>
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
                  className="mt-2 block text-lg font-semibold text-[var(--foreground)] hover:underline"
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
                  Read essay →
                </Link>
              </>
            ) : (
              <>
                <span className="mt-2 block text-lg font-semibold text-[var(--muted)]">
                  Coming soon
                </span>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Framework pieces and shorter explorations.
                </p>
                <Link
                  href="/essays"
                  className="mt-4 inline-block text-sm font-medium text-[var(--foreground)] hover:underline"
                >
                  Go to essays →
                </Link>
              </>
            )}
          </article>
        </div>
      </section>

      {/* Email capture */}
      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
          <EmailCapture variant="course" id="join" />
          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            Or subscribe for updates when new guides and episodes drop:
          </p>
          <div className="mt-4">
            <EmailCapture variant="subscribe" />
          </div>
        </div>
      </section>
    </div>
  );
}
