// Lightweight shared scroll state (0 → 1 over the whole page).
// A single passive listener feeds the R3F render loop without React re-renders.
export const scrollProgress = { value: 0 };

if (typeof window !== "undefined") {
  const update = () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
