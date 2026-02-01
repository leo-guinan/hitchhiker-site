"use client";

import { useState } from "react";

type Props = { url: string; title: string };

export function ShareBar({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[var(--muted)]">Share:</span>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-[var(--foreground)] hover:underline"
      >
        X
      </a>
      <span className="text-[var(--muted)]" aria-hidden>
        ·
      </span>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-[var(--foreground)] hover:underline"
      >
        LinkedIn
      </a>
      <span className="text-[var(--muted)]" aria-hidden>
        ·
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-sm font-medium text-[var(--foreground)] hover:underline"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
