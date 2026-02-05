"use client";

import { useState } from "react";

type PriceType = "lifetime" | "monthly";

export function LibraryCheckoutButtons({
  priceType,
}: {
  priceType?: "lifetime" | "monthly";
}) {
  const [loading, setLoading] = useState<PriceType | null>(null);

  async function goToCheckout(type: "lifetime" | "monthly") {
    setLoading(type);
    try {
      const res = await fetch("/api/library/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType: type }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(null);
        alert(data.error || "Checkout failed");
      }
    } catch {
      setLoading(null);
      alert("Checkout failed");
    }
  }

  if (priceType === "monthly") {
    return (
      <button
        type="button"
        onClick={() => goToCheckout("monthly")}
        disabled={!!loading}
        className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-6 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)]/50 disabled:opacity-50"
      >
        {loading === "monthly" ? "Redirecting…" : "Subscribe — $50/month"}
      </button>
    );
  }

  if (priceType === "lifetime") {
    return (
      <button
        type="button"
        onClick={() => goToCheckout("lifetime")}
        disabled={!!loading}
        className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading === "lifetime" ? "Redirecting…" : "Get Lifetime Access — $500"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => goToCheckout("lifetime")}
      disabled={!!loading}
      className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {loading === "lifetime" ? "Redirecting…" : "Get Lifetime Access — $500"}
    </button>
  );
}
