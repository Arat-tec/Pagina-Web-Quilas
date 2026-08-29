import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Pantalla de carga con salida por fases, controlada por TIEMPO TRANSCURRIDO
 * (no por una cadena de setTimeout que se puede atrasar/atascar si la pestaña
 * pasa a segundo plano):
 *
 *  0 = cargando   → fondo opaco + logo/anillo visibles
 *  1 = sale el logo → fade rápido del logo; el fondo SIGUE opaco (el hero queda
 *                     tapado, nunca se ve el logo encima de él)
 *  2 = sale el fondo → el logo YA se quitó del DOM; el fondo se desvanece y
 *                      revela el hero, sin ningún elemento de logo presente
 *  3 = fuera       → el componente se desmonta
 *
 * Un bucle de requestAnimationFrame calcula la fase a partir de
 * `performance.now() - inicio`. Si la pestaña estuvo en segundo plano, al volver
 * el primer frame ya calcula la fase correcta (incluida "fuera"), así que el
 * loader nunca se queda pegado sobre el contenido.
 */
const LOGO_FADE_MS = 200;
const BG_FADE_MS = 450;
const T_LOGO_OUT = (d: number) => d;
const T_BG_OUT = (d: number) => d + LOGO_FADE_MS + 90;
const T_GONE = (d: number) => T_BG_OUT(d) + BG_FADE_MS + 120;

export function LoadingScreen({ duration = 1400 }: { duration?: number }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let cancelled = false;

    const resolve = () => {
      const elapsed = performance.now() - start;
      const next: 0 | 1 | 2 | 3 =
        elapsed >= T_GONE(duration)
          ? 3
          : elapsed >= T_BG_OUT(duration)
            ? 2
            : elapsed >= T_LOGO_OUT(duration)
              ? 1
              : 0;
      // monotónico: nunca retrocede
      setPhase((p) => (next > p ? next : p));
      if (!cancelled && next < 3) raf = requestAnimationFrame(resolve);
    };

    raf = requestAnimationFrame(resolve);
    // Red de seguridad si rAF no se reanuda: forzar el desmontaje.
    const hardStop = window.setTimeout(
      () => setPhase(3),
      T_GONE(duration) + 2000,
    );
    const onVisible = () => {
      if (document.visibilityState === "visible") resolve();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(hardStop);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [duration]);

  if (phase === 3) return null;

  const bgFading = phase >= 2;

  return (
    <div
      aria-hidden
      onTransitionEnd={(e) => {
        if (bgFading && e.target === e.currentTarget) setPhase(3);
      }}
      // Estilos críticos en línea: el overlay queda bien posicionado/centrado
      // aunque el CSS de utilidades aún no haya cargado.
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        transitionDuration: `${BG_FADE_MS}ms`,
      }}
      className={cn(
        "z-[100] bg-background transition-opacity ease-out",
        bgFading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {phase < 2 && (
        <div
          style={{ transitionDuration: `${LOGO_FADE_MS}ms` }}
          className={cn(
            "relative grid size-[120px] place-items-center transition-opacity sm:size-[180px]",
            phase >= 1 ? "opacity-0" : "opacity-100",
          )}
        >
          <svg viewBox="0 0 180 180" className="absolute inset-0 size-full text-forest">
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
          <img
            src="/logo-quilas.svg"
            alt="Quilas"
            className="h-auto w-[68px] object-contain sm:w-[100px]"
          />
        </div>
      )}
    </div>
  );
}
