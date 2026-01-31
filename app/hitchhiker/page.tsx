import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata = {
  title: "What is a Hitchhiker? | The Hitchhiker's Guide to the Future",
  description:
    "Someone who's crossed the event horizon of the Singularity. The problem, the trap, and the infrastructure for fluid identity.",
};

const recognitionMarkers = [
  "You see patterns in systems that others call 'chaos'.",
  "You've outgrown every identity you've tried on.",
  "You can't explain what you do in one sentence—and you've stopped trying.",
  "Networks that promise 'community' feel like cages.",
  "You've been rejected by institutions for being 'too much' or 'not a fit'.",
  "You're building something that doesn't have a name yet.",
];

export default function HitchhikerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
        What is a Hitchhiker?
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
        Someone who&apos;s crossed the event horizon of the Singularity. Not in
        the sci-fi sense—in the coordination sense. You can see what&apos;s
        coming. You can&apos;t unsee it. And the old infrastructure wasn&apos;t
        built for people like you.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The problem
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Static identity was required for the old systems. Job titles. LinkedIn
          narratives. &quot;What do you do?&quot; in one sentence. But you
          can&apos;t stay static anymore. You&apos;re iterating faster than
          the forms allow. The people who get it are scattered. The ones who
          don&apos;t think you&apos;re lost.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The trap
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Maximum clarity, minimum coordination. You know what you see. You
          can&apos;t find the others who see it too. Or you find them and
          there&apos;s no game to play together—no bounded commitment, no
          observable outcome, no way to build without burning out.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The solution
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          New infrastructure for fluid identity. Observable games with bounded
          commitments. Roles you can try on and take off. Seasons with clean
          exits. A network of people who&apos;ve crossed the threshold and are
          building what comes next—together, without the old cages.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          You might be a Hitchhiker if…
        </h2>
        <ul className="mt-6 space-y-3">
          {recognitionMarkers.map((marker) => (
            <li
              key={marker}
              className="flex gap-3 text-[var(--muted)] leading-relaxed"
            >
              <span className="text-[var(--foreground)]" aria-hidden>
                →
              </span>
              {marker}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          The invitation
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          If you recognize yourself, welcome. This is your waystation. Take the
          5-day course to prove you can see what we see. Explore the guides to
          see the map. Join the network when you&apos;re ready to build.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/course"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
          >
            Take the 5-Day Course
          </Link>
          <Link
            href="/guides"
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/50"
          >
            Explore the Guides
          </Link>
        </div>
      </section>

      <section className="mt-16 border-t border-[var(--border)] pt-12">
        <EmailCapture variant="course" />
      </section>
    </article>
  );
}
