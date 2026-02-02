"use client";

import { useState } from "react";

type Props = {
  exerciseDay: number;
  exerciseTitle: string;
};

export function ExerciseSubmitForm({ exerciseDay, exerciseTitle }: Props) {
  const [email, setEmail] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          exerciseDay,
          submissionUrl: submissionUrl.trim(),
          summary: summary.trim() || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(data.error || "Submission failed");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setSubmissionUrl("");
      setSummary("");
    } catch {
      setErrorMessage("Submission failed");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Submit your work
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Submitted. You&apos;ll get workshop discount credit when all 5 are in.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Submit your work
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Link to your completed exercise (Google Doc, Notion, Dropbox, etc.).
        Required for workshop discount.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="submit-email"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Email <span className="text-[var(--muted)]">(required)</span>
          </label>
          <input
            id="submit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="submit-url"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Submission URL <span className="text-[var(--muted)]">(required)</span>
          </label>
          <input
            id="submit-url"
            type="url"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            required
            disabled={status === "loading"}
            placeholder="https://docs.google.com/..."
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="submit-summary"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Summary <span className="text-[var(--muted)]">(optional)</span>
          </label>
          <textarea
            id="submit-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={status === "loading"}
            rows={3}
            placeholder="1-2 sentence summary of your work"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
