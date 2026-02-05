import Link from "next/link";
import { SyncPurchaseOnMount } from "./SyncPurchaseOnMount";

export const metadata = {
  title: "Thank You | Framework Library",
  description: "Your purchase was successful.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function LibraryThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id ?? null;

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 sm:py-28">
      {sessionId ? <SyncPurchaseOnMount sessionId={sessionId} /> : null}
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Thank you
      </h1>
      <p className="mt-6 text-lg text-[var(--muted)]">
        Your purchase was successful. Create your account to access the library, or sign in if you already have one.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/library/create-account"
          className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          Create account
        </Link>
        <Link
          href="/library/signin"
          className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-6 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50"
        >
          Sign in
        </Link>
      </div>
      <p className="mt-8 text-sm text-[var(--muted)]">
        <Link href="/library" className="hover:underline">
          ← Back to Framework Library
        </Link>
      </p>
    </div>
  );
}
