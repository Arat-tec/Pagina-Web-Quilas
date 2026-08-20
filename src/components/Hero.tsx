import heroImage from "@/assets/hero.jpg";
import type { Content } from "@/lib/content";

export function Hero({ t }: { t: Content }) {
  return (
    <section id="inicio" className="relative isolate flex min-h-[92svh] items-end">
      <img
        src={heroImage}
        alt={t.hero.alt}
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest via-forest/50 to-forest/25" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-16 md:px-6 sm:pb-24">
        <p className="text-xs font-semibold tracking-[0.25em] text-forest-foreground/85 uppercase">
          {t.hero.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-none font-semibold text-forest-foreground sm:text-7xl lg:text-8xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-forest-foreground/90 sm:text-xl">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contacto"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.hero.primary}
          </a>
        </div>
      </div>
    </section>
  );
}
