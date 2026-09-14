import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Slide } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Cada cuánto avanza el autoplay, en ms. También es la duración de la animación
 * de la barra de progreso del dot activo (ver `.carousel-progress` en styles.css). */
const AUTOPLAY_MS = 6000;
/** Duración fija de la animación de scroll entre slides (scrollTo y autoplay). */
const SCROLL_DURATION_MS = 750;

type CarouselProps = {
  slides: Slide[];
  labels: { prev: string; next: string; goTo: string; pause: string; play: string };
  priority?: boolean;
  /**
   * Saca el blurb y la descripción de la foto y los muestra en un bloque de
   * texto debajo de la imagen (badge y título siguen sobre la foto), en todos
   * los tamaños de pantalla. Úsalo en carruseles donde el texto bajo la foto
   * debe leerse aparte de la imagen — atractivos y habitaciones.
   */
  splitCaption?: boolean;
  /** Clase de aspect-ratio del contenedor de la foto en móvil (se conserva `sm:aspect-16/10` desde `sm:`). Por defecto `"aspect-4/3"`, igual que siempre. */
  mobileAspect?: string;
  /** Centra el título (y el badge) horizontalmente solo en móvil; desde `sm:` vuelve a la izquierda de siempre. */
  centerCaptionOnMobile?: boolean;
};

export function Carousel({
  slides,
  labels,
  priority = false,
  splitCaption = false,
  mobileAspect = "aspect-4/3",
  centerCaptionOnMobile = false,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimeout = useRef<number | undefined>(undefined);
  const scrollAnimationFrame = useRef<number | undefined>(undefined);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[index] as HTMLElement | undefined;
    if (!item) return;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    // "track" es position:relative y por lo tanto el offsetParent directo de
    // cada <li>: item.offsetLeft YA viene medido relativo al propio track (su
    // espacio de scroll), así que NO se resta track.offsetLeft — ese valor es
    // el "left" resuelto de la clase "left-1/2" (mitad del ancho del
    // contenedor), un artefacto de layout de la técnica full-bleed sin
    // relación con la posición de scroll.
    const target = item.offsetLeft - padLeft;

    // Navegación intencional: el dot se actualiza YA, no cuando el
    // scroll "confirme" pasivamente dónde terminó.
    programmaticScrollRef.current = true;
    setActive(index);

    cancelAnimationFrame(scrollAnimationFrame.current ?? 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sin animación: salta directo a la posición final, igual que el
      // resto del sitio con reduced-motion.
      track.scrollLeft = target;
    } else {
      // El scroll "smooth" nativo no tiene duración configurable (cada
      // navegador decide su propia velocidad) — se anima "scrollLeft" a
      // mano, frame a frame, con una duración fija y easing propios.
      const start = track.scrollLeft;
      const distance = target - start;
      const startTime = performance.now();
      // ease-in-out-quad: acelera al inicio, desacelera al final.
      const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / SCROLL_DURATION_MS, 1);
        track.scrollLeft = start + distance * easeInOutQuad(t);
        if (t < 1) {
          scrollAnimationFrame.current = requestAnimationFrame(step);
        }
      };
      scrollAnimationFrame.current = requestAnimationFrame(step);
    }

    // Red de seguridad si el navegador no dispara "scrollend" (Safari
    // viejo): suelta el flag tras un tiempo prudente para no dejar el
    // listener de scroll bloqueado para siempre. Un poco más que
    // SCROLL_DURATION_MS para darle margen a la animación de terminar.
    window.clearTimeout(programmaticScrollTimeout.current);
    programmaticScrollTimeout.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, SCROLL_DURATION_MS + 100);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        const center = track.scrollLeft + padLeft + 40;
        let best = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        items.forEach((item, i) => {
          // Mismo razonamiento que en scrollTo: item.offsetLeft ya es
          // relativo al propio track, no se resta track.offsetLeft.
          const itemStart = item.offsetLeft;
          const distance = Math.abs(itemStart - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive(best);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollAnimationFrame.current ?? 0);
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(programmaticScrollTimeout.current);
    };
  }, []);

  // En cuanto el navegador confirma que el scroll terminó de verdad, suelta el
  // flag — no hace falta esperar a la red de seguridad de SCROLL_DURATION_MS.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScrollEnd = () => {
      programmaticScrollRef.current = false;
    };
    track.addEventListener("scrollend", onScrollEnd);
    return () => track.removeEventListener("scrollend", onScrollEnd);
  }, []);

  // Con prefers-reduced-motion el autoplay nunca arranca solo: empieza en pausa,
  // igual que el resto de animaciones del sitio (ver Reveal.tsx).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  // El autoplay solo debe contar mientras el carrusel está de verdad visible
  // en pantalla — si no, los 3 carruseles de la página arrancarían su cuenta
  // regresiva apenas carga, y ya habrían avanzado antes de que el usuario
  // llegue a verlos.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Avanza al siguiente slide cada AUTOPLAY_MS mientras "playing" sea true y
  // el carrusel esté visible, en loop infinito. El efecto se reprograma solo
  // cada vez que "active" cambia (por autoplay, por clic manual o por swipe)
  // o "isVisible" cambia, así que el conteo de 6s —y la barra de progreso del
  // dot activo, que dura lo mismo— siempre arranca de cero en el slide
  // correcto y justo al entrar en pantalla (no intenta "recordar" cuánto
  // llevaba antes de salir de pantalla).
  useEffect(() => {
    if (!playing || !isVisible) return;
    const next = active >= slides.length - 1 ? 0 : active + 1;
    const timer = setTimeout(() => scrollTo(next), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, playing, isVisible, slides.length, scrollTo]);

  // Swipe/arrastre manual en el track (no el scroll programático que dispara
  // scrollTo) pausa el autoplay, igual que un clic en un dot o una flecha.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const takeOver = () => {
      setPlaying(false);
      // El dedo del usuario manda: si había un scroll automático en
      // curso (autoplay o clic en flecha/dot), se cancela para que el
      // listener de scroll vuelva a calcular "active" en vivo.
      programmaticScrollRef.current = false;
      window.clearTimeout(programmaticScrollTimeout.current);
    };
    track.addEventListener("pointerdown", takeOver, { passive: true });
    track.addEventListener("wheel", takeOver, { passive: true });
    return () => {
      track.removeEventListener("pointerdown", takeOver);
      track.removeEventListener("wheel", takeOver);
    };
  }, []);

  const goTo = (index: number) => {
    setPlaying(false);
    scrollTo(index);
  };

  const go = (delta: number) => {
    const next = Math.min(Math.max(active + delta, 0), slides.length - 1);
    goTo(next);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <ul
        ref={trackRef}
        className="no-scrollbar relative left-1/2 flex w-screen -translate-x-1/2 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
        style={{
          paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
        }}
      >
        {slides.map((slide, i) => (
          <li key={slide.title} className="w-[92%] shrink-0 snap-start sm:w-[70%] lg:w-[46%]">
            <figure className="group">
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-secondary shadow-sm",
                  "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
                  i !== active && "motion-safe:scale-[0.98]",
                )}
              >
                <div className={cn(mobileAspect, "w-full overflow-hidden sm:aspect-16/10")}>
                  {typeof slide.image === "string" ? (
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      width={1400}
                      height={933}
                      loading={priority && i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={
                        slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined
                      }
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <picture>
                      <source media="(min-width: 640px)" srcSet={slide.image.desktop} />
                      <img
                        src={slide.image.mobile}
                        alt={slide.alt}
                        width={1400}
                        height={933}
                        loading={priority && i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        style={
                          slide.objectPosition
                            ? { objectPosition: slide.objectPosition }
                            : undefined
                        }
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                  )}
                </div>
                {/* Scrim para asegurar legibilidad del texto sobre cualquier foto */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <figcaption
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-4 text-forest-foreground sm:p-6",
                    centerCaptionOnMobile && "text-center sm:text-left",
                  )}
                >
                  {slide.badge ? (
                    <span className="mb-2 inline-block rounded-full bg-terracotta px-3 py-1 text-xs font-semibold tracking-wide text-terracotta-foreground uppercase">
                      {slide.badge}
                    </span>
                  ) : null}
                  <h3 className="text-xl leading-tight font-semibold sm:text-2xl">{slide.title}</h3>
                  {slide.description ? (
                    <p
                      className={cn(
                        "mt-1 max-w-prose text-sm opacity-90 sm:text-base",
                        splitCaption && "hidden",
                      )}
                    >
                      {slide.description}
                    </p>
                  ) : null}
                </figcaption>
              </div>
              {splitCaption && (slide.blurb || slide.description) ? (
                // Padding en % del ancho de la FOTO (≈ ancho del <figure>): el texto
                // queda visiblemente más angosto que la imagen, con aire a ambos lados.
                <div className="mt-4 px-[6%]">
                  {slide.blurb ? (
                    <p className="text-lg font-semibold text-foreground sm:text-xl">
                      {slide.blurb}
                    </p>
                  ) : null}
                  {slide.description ? (
                    <p
                      className={
                        slide.blurb
                          ? // Con blurb (habitaciones) la description es la jerarquía baja:
                            // más chica y subrayada.
                            "mt-1 text-xs text-muted-foreground underline underline-offset-4 sm:text-sm"
                          : // Sin blurb (atractivos) se queda exactamente como siempre.
                            "text-sm leading-relaxed text-muted-foreground sm:text-base"
                      }
                    >
                      {slide.description}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-4 sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Fila de dots: nunca envuelve (flex-nowrap + botones shrink-0 de 32px);
              6 dots = 232px, cabe de sobra en cualquier móvil. overflow-x-clip es
              solo una red de seguridad. El dot activo es un pill con una barra de
              progreso interna (.carousel-progress) que se rellena en AUTOPLAY_MS;
              los inactivos se quedan como círculo chico sin relleno. */}
          <div className="flex flex-nowrap justify-center gap-2 overflow-x-clip sm:justify-start">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${labels.goTo} ${i + 1}`}
                aria-current={i === active}
                className="grid size-8 shrink-0 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    "relative block h-2 overflow-hidden rounded-full bg-border transition-[width]",
                    i === active ? "w-6" : "w-2",
                  )}
                >
                  {i === active ? (
                    <span
                      key={active}
                      data-paused={!playing || !isVisible}
                      className="carousel-progress absolute inset-0 block rounded-full bg-primary"
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          {/* Control esencial (no decorativo): visible en todos los tamaños, a
              diferencia de las flechas prev/next que solo aparecen desde sm:. */}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? labels.pause : labels.play}
            aria-pressed={playing}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            {playing ? (
              <Pause className="size-4" aria-hidden />
            ) : (
              <Play className="size-4" aria-hidden />
            )}
          </button>
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label={labels.prev}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === slides.length - 1}
            aria-label={labels.next}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
