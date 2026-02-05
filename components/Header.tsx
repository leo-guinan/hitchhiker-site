import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { HeaderNav } from "@/components/HeaderNav";

const freeLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/deep-dives", label: "Deep Dives" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
];

const premiumLinks = [
  { href: "/network", label: "Network" },
  { href: "/course", label: "Course" },
  { href: "/library", label: "Framework Library" },
];

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-16 max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--foreground)]"
        >
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 object-contain"
          />
          The Hitchhiker&apos;s Guide to the Future
        </Link>
        <HeaderNav
          freeLinks={freeLinks}
          premiumLinks={premiumLinks}
          isLoggedIn={!!session}
        />
      </div>
    </header>
  );
}
