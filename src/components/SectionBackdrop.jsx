/**
 * Full-bleed scientific-photography texture for a section (UX brief §9).
 * The image sits at very low opacity behind a dark overlay so it reads as
 * material texture, not imagery — "felt, not seen." Layers over the persistent
 * molecule; renders nothing until a real image is supplied (see
 * public/images/science/README.md for sourcing + per-section settings).
 */
export default function SectionBackdrop({
  src,
  overlay = "rgba(10,14,20,0.9)",
  animation = "kenburns",
  opacity = 0.1,
}) {
  if (!src) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center anim-${animation}`}
        style={{ backgroundImage: `url(${src})`, opacity }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
