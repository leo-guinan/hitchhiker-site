"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type NavItem = { href: string; label: string };

export function HeaderNav({
  freeLinks,
  premiumLinks,
  isLoggedIn,
}: {
  freeLinks: NavItem[];
  premiumLinks: NavItem[];
  isLoggedIn: boolean;
}) {
  const [openMenu, setOpenMenu] = useState<"free" | "premium" | null>(null);
  const freeRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        openMenu &&
        freeRef.current &&
        !freeRef.current.contains(target) &&
        premiumRef.current &&
        !premiumRef.current.contains(target)
      ) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <nav
      className="flex flex-1 items-center justify-end gap-1 sm:gap-3"
      aria-label="Main"
    >
      {/* Free dropdown */}
      <div className="relative" ref={freeRef}>
        <button
          type="button"
          onClick={() => setOpenMenu(openMenu === "free" ? null : "free")}
          className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--border)]/30 hover:text-[var(--foreground)]"
          aria-expanded={openMenu === "free"}
          aria-haspopup="true"
        >
          Free
          <svg
            className={`h-4 w-4 transition-transform ${openMenu === "free" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openMenu === "free" && (
          <div
            className="absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-[var(--border)] bg-[var(--background)] py-1 shadow-lg"
            role="menu"
          >
            {freeLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--border)]/30"
                role="menuitem"
                onClick={() => setOpenMenu(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Premium dropdown */}
      <div className="relative" ref={premiumRef}>
        <button
          type="button"
          onClick={() => setOpenMenu(openMenu === "premium" ? null : "premium")}
          className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--border)]/30 hover:text-[var(--foreground)]"
          aria-expanded={openMenu === "premium"}
          aria-haspopup="true"
        >
          Premium
          <svg
            className={`h-4 w-4 transition-transform ${openMenu === "premium" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openMenu === "premium" && (
          <div
            className="absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-[var(--border)] bg-[var(--background)] py-1 shadow-lg"
            role="menu"
          >
            {premiumLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--border)]/30"
                role="menuitem"
                onClick={() => setOpenMenu(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sign in / My Library (top-level when logged in) */}
      {isLoggedIn ? (
        <Link
          href="/library/dashboard"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          My Library
        </Link>
      ) : (
        <Link
          href="/library/signin"
          className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Sign in
        </Link>
      )}

      {/* Join the Network CTA */}
      <Link
        href="/#join"
        className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
      >
        Join the Network
      </Link>
    </nav>
  );
}
