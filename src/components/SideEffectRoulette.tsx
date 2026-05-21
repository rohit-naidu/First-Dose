'use client';

import { useEffect, useRef, useState } from 'react';

// Pool of possible side effects shown on the crate.
// Kept short and visually balanced so the reel reads cleanly.
const sideEffects = [
  '🤮 Nausea',
  '😵 Dizziness',
  '😴 Fatigue',
  '😬 Anxiety',
  '🧠 Brain fog',
  '🫀 Arrhythmia',
  '🩺 Pancreatitis',
  '🌡️ Fever',
  '🤕 Headache',
  '💊 Rash',
];

// We repeat the pool many times so the strip is long enough to "spin" past
// the viewport for the full deceleration duration without running out of items.
const REEL_REPEAT = 14;

// How long the deceleration animation runs before the item is "locked in".
const SPIN_DURATION_MS = 5200;

// How long to pause on the winning item before kicking off the next spin.
const PAUSE_AFTER_LAND_MS = 1400;

export function SideEffectRoulette() {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // The strip of items shown in the reel. Built once for stable keys.
  const [items] = useState<string[]>(() => {
    const repeated: string[] = [];
    for (let i = 0; i < REEL_REPEAT; i += 1) {
      repeated.push(...sideEffects);
    }
    return repeated;
  });

  // Index of the item currently sitting under the indicator after a spin.
  // null while the reel is mid-spin so the highlight only appears on landing.
  const [landedIndex, setLandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const reel = reelRef.current;
    const track = trackRef.current;
    if (!reel || !track) {
      return;
    }

    let nextSpinTimeoutId: number | undefined;
    let landTimeoutId: number | undefined;
    let cancelled = false;

    function spin() {
      if (cancelled || !reel || !track) {
        return;
      }

      // Clear the previous landed highlight as soon as a new spin starts.
      setLandedIndex(null);

      // Measure dynamically so the animation adapts to responsive widths.
      const firstChild = track.firstElementChild as HTMLElement | null;
      if (!firstChild) {
        return;
      }

      const itemWidth = firstChild.offsetWidth;
      const reelWidth = reel.offsetWidth;

      // Pick a winning index deep into the strip so we always have room to
      // spin for the full duration. Leave a small buffer at the end too.
      const minIndex = sideEffects.length * 8;
      const maxIndex = items.length - 2;
      const winningIndex = Math.floor(minIndex + Math.random() * (maxIndex - minIndex));

      // Center the winning item under the indicator, with a tiny random offset
      // so it doesn't perfectly center every time (feels more like a real crate).
      const itemCenter = winningIndex * itemWidth + itemWidth / 2;
      const reelCenter = reelWidth / 2;
      const jitter = (Math.random() - 0.5) * (itemWidth * 0.3);
      const targetTranslate = -(itemCenter - reelCenter + jitter);

      // Snap the track back to the start without any transition.
      track.style.transition = 'none';
      track.style.transform = 'translateX(0px)';

      // Force a reflow so the browser commits the reset before re-enabling
      // the transition. Without this, the next transform would not animate.
      void track.getBoundingClientRect();

      // Apply the deceleration spin. The cubic-bezier mimics the CSGO feel.
      track.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.05, 0.7, 0.1, 1)`;
      track.style.transform = `translateX(${targetTranslate}px)`;

      // When the spin finishes, highlight the item that landed under the indicator.
      landTimeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }
        setLandedIndex(winningIndex);
      }, SPIN_DURATION_MS);

      // Schedule the next spin after the animation finishes plus a brief pause.
      nextSpinTimeoutId = window.setTimeout(spin, SPIN_DURATION_MS + PAUSE_AFTER_LAND_MS);
    }

    spin();

    return () => {
      cancelled = true;
      if (nextSpinTimeoutId !== undefined) {
        window.clearTimeout(nextSpinTimeoutId);
      }
      if (landTimeoutId !== undefined) {
        window.clearTimeout(landTimeoutId);
      }
    };
  }, [items]);

  return (
    <div className="roulette-card" aria-label="Random side effect example">
      <div className="crate-reel" ref={reelRef}>
        <div className="crate-track" ref={trackRef}>
          {items.map((effect, index) => {
            const isLanded = index === landedIndex;
            return (
              <div
                className={isLanded ? 'crate-item crate-item--landed' : 'crate-item'}
                key={`${effect}-${index}`}
              >
                {effect}
              </div>
            );
          })}
        </div>
        <div className="crate-indicator" aria-hidden="true" />
        <div className="crate-fade crate-fade-left" aria-hidden="true" />
        <div className="crate-fade crate-fade-right" aria-hidden="true" />
      </div>
    </div>
  );
}
