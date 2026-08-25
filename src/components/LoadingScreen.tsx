import { useEffect, useState } from "react";

export function LoadingScreen({ duration = 1400 }: { duration?: number }) {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), duration);
    const hideTimer = window.setTimeout(() => setHidden(true), duration + 500);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [duration]);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative grid size-[180px] place-items-center">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          className="absolute inset-0 text-forest"
        >
          <circle cx="90" cy="90" r="82" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
          <circle
            cx="90"
            cy="90"
            r="82"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="80 435"
            transform="rotate(-90 90 90)"
            className="origin-center animate-[spin_1.1s_linear_infinite]"
          />
        </svg>
        <img src="/logo-quilas.svg" alt="Quilas" className="h-auto w-[100px] object-contain" />
      </div>
    </div>
  );
}
