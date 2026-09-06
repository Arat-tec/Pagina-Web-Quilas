import aboutImage from "@/assets/nosotros.jpg";
import type { Content } from "@/lib/content";

export function About({ t }: { t: Content }) {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {t.about.title}
          </h2>
          {t.about.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base text-muted-foreground sm:text-lg">
              {paragraph}
            </p>
          ))}
          
        </div>

        <div className="overflow-hidden rounded-3xl bg-secondary">
          <div className="aspect-4/3 w-full">
            <img
              src={aboutImage}
              alt={t.about.alt}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
