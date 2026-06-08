"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Credibility", href: "/#credibility" },
  { label: "Drug classes", href: "/#drug-classes" },
  { label: "Vision", href: "/#trajectory" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? "border-hairline bg-bg/80"
          : "border-hairline/60 bg-bg/40"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-sm font-medium tracking-tight text-ink"
          >
            First Dose <span className="text-ink-45">Health</span>
          </Link>

          {/* desktop section links */}
          <div className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] text-ink-45 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="shrink-0 rounded-[2px] border border-hairline bg-white/[0.04] px-4 py-2 text-[13px] text-ink transition-colors hover:border-clinical/40 hover:text-clinical"
          >
            Partner with us
          </Link>
        </div>

        {/* mobile section links — scrollable strip so every section is one tap away */}
        <div className="flex gap-5 overflow-x-auto pb-3 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-[13px] text-ink-45 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
