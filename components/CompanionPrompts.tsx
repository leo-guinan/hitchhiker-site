"use client";

import { useState } from "react";
import type { CompanionPrompt } from "@/lib/prompts";

type Props = { prompts: CompanionPrompt[] };

export function CompanionPrompts({ prompts }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleCopy(prompt: string, index: number) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(null);
    }
  }

  return (
    <section className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-[var(--foreground)]">
        Explore with AI
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Use these prompts with ChatGPT, Claude, or similar tools to apply this
        essay in different domains.
      </p>
      <div className="mt-6 space-y-2">
        {prompts.map((item, index) => (
          <details
            key={index}
            className="group rounded-lg border border-[var(--border)] bg-[var(--background)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]/30 [&::-webkit-details-marker]:hidden">
              <span>{item.category}</span>
              <span className="flex-shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180">
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <div className="border-t border-[var(--border)] px-4 py-4">
              <p className="whitespace-pre-wrap text-sm text-[var(--muted)] leading-relaxed">
                {item.prompt}
              </p>
              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleCopy(item.prompt, index)}
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
                >
                  {copiedIndex === index ? (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy prompt
                    </>
                  )}
                </button>
                {item.whyItWorks && (
                  <details>
                    <summary className="cursor-pointer text-xs text-[var(--muted-foreground)] hover:text-[var(--muted)]">
                      Why this prompt
                    </summary>
                    <p className="mt-2 text-xs text-[var(--muted)] italic">
                      {item.whyItWorks}
                    </p>
                  </details>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
