import Link from "next/link";
import { getEpisodes } from "@/lib/podcast";
import { podcast } from "@/lib/site";

export const metadata = {
  title: "Podcast | The Hitchhiker's Guide to the Future",
  description:
    "Conversations with people who've crossed the threshold. Pattern recognition across domains. For people who think in systems. Hosted by Leo Guinan.",
};

const subscribeLinks = [
  { label: "Apple Podcasts", href: podcast.applePodcasts },
  { label: "Spotify", href: podcast.spotify },
  { label: "RSS", href: podcast.rss },
].filter(({ href }) => href);

export default function PodcastPage() {
  const episodes = getEpisodes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-12 text-center sm:mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          The Hitchhiker&apos;s Guide to the Future
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Conversations with people who&apos;ve crossed the threshold. Pattern
          recognition. Systems thinking. The future of coordination.
        </p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Hosted by Leo Guinan
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {subscribeLinks.length > 0 ? (
            subscribeLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
              >
                {label}
              </a>
            ))
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Subscribe links coming soon
            </p>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-8 text-2xl font-semibold text-[var(--foreground)]">
          Episodes
        </h2>
        {episodes.length === 0 ? (
          <p className="text-[var(--muted)]">
            No episodes yet. Coming soon—solo episodes first, then guest
            conversations.
          </p>
        ) : (
          <ul className="space-y-8">
            {episodes.map((ep) => (
              <li
                key={ep.number}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                      #{String(ep.number).padStart(3, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">
                      {ep.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {ep.duration} · {ep.date}
                    </p>
                    <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                      {ep.description}
                    </p>
                    {ep.embedUrl && (
                      <div className="mt-4">
                        <iframe
                          src={ep.embedUrl}
                          title={ep.title}
                          className="h-20 w-full rounded-md"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      {!ep.embedUrl && (
                        <span className="text-[var(--muted-foreground)]">
                          Episode coming soon
                        </span>
                      )}
                      {ep.showNotes && (
                        <button
                          type="button"
                          className="font-medium text-[var(--foreground)] hover:underline"
                        >
                          Show notes
                        </button>
                      )}
                      {ep.transcriptUrl && (
                        <a
                          href={ep.transcriptUrl}
                          className="font-medium text-[var(--foreground)] hover:underline"
                        >
                          Transcript
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
