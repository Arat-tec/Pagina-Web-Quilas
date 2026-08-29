import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Envuelve una sección para que aparezca con un fade-in + desplazamiento sutil
 * hacia arriba cuando entra en el viewport al hacer scroll.
 *
 * - El ocultado inicial lo hace CSS (`.js [data-reveal]` en styles.css), así que
 *   sin JavaScript el contenido se ve siempre.
 * - Respeta `prefers-reduced-motion`: si está activo, se muestra de inmediato sin
 *   animación.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={visible ? "visible" : ""} className={cn(className)}>
      {children}
    </div>
  );
}
