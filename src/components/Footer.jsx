export default function Footer() {
  return (
    <footer className="relative border-t border-hairline px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-over-molecule sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-medium text-ink">First Dose Health</p>
          <p className="mt-2 text-[13px] leading-[1.6] text-ink-45">
            Built by researchers. Designed for clinicians. Backed by advisors
            from BMS, J&amp;J, and GSK.
          </p>
        </div>
        <div className="text-[13px] text-ink-45 sm:text-right">
          <a
            href="mailto:hello@firstdosehealth.com"
            className="text-clinical transition-colors hover:text-ink"
          >
            hello@firstdosehealth.com
          </a>
          <p className="mt-2 text-ink-35">© 2026 First Dose Health</p>
        </div>
      </div>
    </footer>
  );
}
