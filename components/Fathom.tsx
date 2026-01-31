"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageview({ url, referrer: document.referrer });
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
