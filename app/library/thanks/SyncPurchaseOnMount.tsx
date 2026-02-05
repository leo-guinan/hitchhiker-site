"use client";

import { useEffect } from "react";

export function SyncPurchaseOnMount({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    fetch("/api/library/sync-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      // Non-blocking; create-account will show error if sync failed
    });
  }, [sessionId]);
  return null;
}
