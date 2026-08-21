import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Slide } from "@/lib/content";
import { cn } from "@/lib/utils";

type CarouselProps = {
  slides: Slide[];
  labels: { prev: string; next: string; goTo: string };
  priority?: boolean;
};

export function Carousel({ slides, labels, priority = false }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[index] as HTMLElement | undefined;
    if (!item) return;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: item.offsetLeft - track.offsetLeft - padLeft,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        const center = track.scrollLeft + padLeft + 40;
        let best = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        items.forEach((item, i) => {
          const itemStart = item.offsetLeft - track.offsetLeft;
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
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (delta: number) => {
    const next = Math.min(Math.max(active + delta, 0), slides.length - 1);
    scrollTo(next);
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="no-scrollbar relative left-1/2 flex w-screen -translate-x-1/2 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
        style={{
          paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
        }}
      >
        {slides.map((slide, i) => (
          <li
            key={slide.title}
            className="w-[85%] shrink-0 snap-start sm:w-[70%] lg:w-[42%]"
          >

            <figure className="group relative overflow-hidden rounded-2xl bg-secondary shadow-sm">
              <div className="aspect-4/3 w-full overflow-hidden sm:aspect-16/10">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  width={1400}
                  height={933}
                  loading={priority && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Scrim para asegurar legibilidad del texto sobre cualquier foto */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-forest via-forest/70 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-forest-foreground sm:p-6">
                {slide.badge ? (
                  <span className="mb-2 inline-block rounded-full bg-terracotta px-3 py-1 text-xs font-semibold tracking-wide text-terracotta-foreground uppercase">
                    {slide.badge}
                  </span>
                ) : null}
                <h3 className="text-xl leading-tight font-semibold sm:text-2xl">
                  {slide.title}
                </h3>
                <p className="mt-1 max-w-prose text-sm opacity-90 sm:text-base">
                  {slide.description}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={i === active}
              className="grid size-11 place-items-center rounded-full"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  i === active ? "w-6 bg-primary" : "w-2 bg-border",
                )}
              />
            </button>
          ))}
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
