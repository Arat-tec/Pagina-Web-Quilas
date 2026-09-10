import type { Content } from "@/lib/content";
import seasonalImage from "@/assets/temporada.jpg";

/**
 * Sección de temporada (Xantolo, Navidad, etc.). Mismo patrón apilado que
 * About.tsx: texto centrado arriba, foto a todo el ancho abajo.
 *
 * PARA CAMBIAR DE FESTIVIDAD:
 *   - Texto (eyebrow, título, párrafos, fechas): edítalo en content.ts → `seasonal`.
 *   - Foto: reemplaza src/assets/temporada.jpg por la nueva (mismo nombre), o
 *     cambia el import de arriba. Se recorta con object-cover: en móvil el marco
 *     es vertical (4/5) y en sm+ vuelve a 16/9.
 *   - El id ("temporada") es fijo para no romper el ancla del navbar.
 */
export function Seasonal({ t }: { t: Content }) {
  return (
    <section id="temporada" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.seasonal.eyebrow}
          </p>
          {/* h2 ya hereda font-display italic del @layer base */}
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {t.seasonal.title}
          </h2>
          {t.seasonal.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base text-muted-foreground sm:text-lg">
              {paragraph}
            </p>
          ))}
          {/* Fechas: texto informativo con apariencia de link destacado (no es un link). */}
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-foreground uppercase underline underline-offset-4">
            {t.seasonal.dates}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-secondary sm:mt-14">
          {/* Marco de la foto: vertical (4/5) en móvil, 16/9 en sm+. */}
          <div className="aspect-[4/5] w-full sm:aspect-16/9">
            <img
              src={seasonalImage}
              alt={t.seasonal.alt}
              width={1920}
              height={1080}
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
