'use client';

import { useEffect, useState } from 'react';

const sideEffects = [
  '🤮 Nausea',
  '😵 Dizziness',
  '😴 Fatigue',
  '😬 Anxiety',
  '🧠 Brain fog',
  '🫀 Heart rhythm',
  '🩺 Pancreatitis',
  '🌡️ Fever',
];

export function SideEffectRoulette() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rouletteTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = Math.floor(Math.random() * sideEffects.length);
        return nextIndex === currentIndex ? (nextIndex + 1) % sideEffects.length : nextIndex;
      });
    }, 950);

    return () => window.clearInterval(rouletteTimer);
  }, []);

  return (
    <div className="roulette-card" aria-label="Random side effect example">
      <span className="roulette-label">Prescription roulette</span>
      <div className="roulette-window" aria-live="polite">
        {sideEffects[activeIndex]}
      </div>
    </div>
  );
}
