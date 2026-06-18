"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Drug Classes", href: "/#drug-classes" },
  { label: "Contact", href: "/#contact" },
];

const DRUG_CLASSES = [
  { name: "GLP-1s", href: "/glp-1", live: true },
  { name: "Antidepressants", href: "/antidepressants" },
  { name: "Cardiovascular", href: "/cardiovascular" },
  { name: "Oncology", href: "/oncology" },
];

function DrugClassesMenu() {
  return (
    <div className="group relative">
      <Link
        href="/#drug-classes"
        className="flex items-center gap-1 text-[13px] text-ink-45 transition-colors hover:text-ink"
      >
        Drug Classes
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="mt-px opacity-70"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* hover dropdown — pt-3 bridges the gap so hover doesn't drop */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[210px] rounded-md border border-hairline bg-bg/95 p-1.5 shadow-2xl shadow-black/50">
          {DRUG_CLASSES.map((dc) => (
            <Link
              key={dc.href}
              href={dc.href}
              className="flex items-center justify-between rounded-[3px] px-3 py-2 text-[13px] text-ink-55 transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {dc.name}
              {dc.live ? (
                <span className="rounded-full bg-clinical px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-bg">
                  Live
                </span>
              ) : (
                <span className="text-[9px] uppercase tracking-[0.1em] text-ink-35">
                  Soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-hairline bg-bg/95"
          : "border-hairline/60 bg-bg/85"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 text-sm font-medium tracking-tight text-ink"
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="7" fill="#0a0e14"/>
              <path d="M11 7c0 5 10 8 10 13M21 7c0 5-10 8-10 13" stroke="#7fb5c9" strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
              <path d="M11 19c0 4 10 6 10 6M21 19c0 4-10 6-10 6" stroke="#c97f7f" strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
              <circle cx="11" cy="9" r="2" fill="#7fb5c9"/>
              <circle cx="21" cy="9" r="2" fill="#c97f7f"/>
              <circle cx="11" cy="23" r="1.8" fill="#a99cc4"/>
              <circle cx="21" cy="23" r="1.8" fill="#c9b896"/>
            </svg>
            First Dose <span className="text-ink-45">Health</span>
          </Link>

          {/* desktop section links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/#how-it-works"
              className="text-[13px] text-ink-45 transition-colors hover:text-ink"
            >
              How it works
            </Link>
            <DrugClassesMenu />
            <Link
              href="/#contact"
              className="text-[13px] text-ink-45 transition-colors hover:text-ink"
            >
              Contact
            </Link>
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
