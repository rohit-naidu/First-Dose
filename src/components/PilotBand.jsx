import Reveal from "@/components/Reveal";

// Telehealth clinic pilot partners shown in the scrolling marquee.
// To use a real logo: drop the file in public/images/partners/ and set
// `logo` to its path. `h` optionally tunes that logo's height in px.
export const PARTNERS = [
  { name: "GoRocky", logo: "/images/partners/gorocky-clean.png", h: 40 },
  { name: "Saaya", logo: "/images/partners/saaya.png", h: 68 },
  { name: "MiDocOnline", logo: "/images/partners/midoconline.webp", h: 40 },
];

export default function PilotBand() {
  return (
    <section className="relative px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl text-over-molecule">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-45">
            Currently piloting with
          </p>
          <div className="marquee-mask relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <div className="marquee-track flex w-max items-center py-2">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <span
                  key={`${p.name}-${i}`}
                  className="mr-20 flex items-center whitespace-nowrap"
                >
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      style={{ height: p.h ? `${p.h}px` : "40px" }}
                      className="w-auto opacity-90 transition-opacity hover:opacity-100"
                    />
                  ) : (
                    <span className="text-2xl font-medium text-ink-60">
                      {p.name}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
