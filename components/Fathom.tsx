"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

function captureUTM(searchParams: URLSearchParams | null) {
  if (!searchParams) return;
  const stored: Record<string, string> = {};
  UTM_PARAMS.forEach((key) => {
    const val = searchParams.get(key);
    if (val) stored[key] = val;
  });
  if (Object.keys(stored).length === 0) return;
  try {
    // Merge with existing stored UTM (first touch wins per key)
    const existing = JSON.parse(sessionStorage.getItem("hg_utm") || "{}");
    const merged = { ...stored, ...existing }; // existing wins → first touch
    sessionStorage.setItem("hg_utm", JSON.stringify(merged));
    // Also store ref shorthand for easy reading
    if (stored.ref) sessionStorage.setItem("hg_ref", stored.ref);
  } catch {}
}

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;
    if (!siteId) return;
    load(siteId, { auto: false });
  }, []);

  useEffect(() => {
    const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;
    if (!siteId || !pathname) return;
    // Capture UTM/ref on any page
    captureUTM(searchParams);
    // Strip UTM from the tracked URL so Fathom doesn't fragment stats
    const cleanUrl = pathname;
    trackPageview({ url: cleanUrl, referrer: document.referrer });
  }, [pathname, searchParams]);

  return null;
}

export function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}

// Helper for components to read attribution
export function getStoredRef(): string | null {
  try { return sessionStorage.getItem("hg_ref"); } catch { return null; }
}
export function getStoredUTM(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem("hg_utm") || "{}"); } catch { return {}; }
}
