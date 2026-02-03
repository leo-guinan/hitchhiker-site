"use client";

import { useEffect } from "react";
import { trackEvent } from "fathom-client";

const CAL_URL =
  process.env.NEXT_PUBLIC_CAL_COM_URL ||
  "https://cal.com/ideanexus/hitchhiker-intro";

const REDIRECT_URL = `${CAL_URL}${CAL_URL.includes("?") ? "&" : "?"}utm_source=hitchhiker&utm_medium=book_intro`;

export default function BookIntroPage() {
  useEffect(() => {
    trackEvent("Book Intro Click");
    const t = setTimeout(() => {
      window.location.replace(REDIRECT_URL);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-4">
      <p className="text-[var(--muted)]">Redirecting...</p>
    </div>
  );
}
