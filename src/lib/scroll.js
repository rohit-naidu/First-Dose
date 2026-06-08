// Lightweight shared state bridging the DOM scroll position and the R3F render
// loop, without triggering React re-renders.
export const scrollProgress = { value: 0 };

// Persistent-spine targets: which side the helix occupies and how dim it should
// be under the current section. Sections set these via IntersectionObserver;
// the helix lerps toward them every frame (UX brief §6 option B).
export const molecule = {
  targetX: 5.2,
  targetDim: 0,
};

if (typeof window !== "undefined") {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
