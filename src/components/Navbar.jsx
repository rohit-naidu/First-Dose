const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Drug classes", href: "#drug-classes" },
  { label: "Credibility", href: "#credibility" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          className="text-sm font-medium tracking-tight text-ink text-over-molecule"
        >
          First Dose <span className="text-ink-45">Health</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-45 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-[2px] border border-hairline bg-white/[0.03] px-4 py-2 text-[13px] text-ink backdrop-blur-sm transition-colors hover:border-clinical/40 hover:text-clinical"
        >
          Partner with us
        </a>
      </nav>
    </header>
  );
}
