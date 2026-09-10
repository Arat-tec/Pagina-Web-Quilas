import { useState } from "react";
import { Plus } from "lucide-react";
import type { Content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Preguntas frecuentes con diseño editorial (no un acordeón de cajas):
 * en desktop, columna izquierda con el título fijo (sticky) mientras la lista
 * de la derecha hace scroll; en móvil se apila. Solo una pregunta abierta a la
 * vez; la respuesta se revela con grid-template-rows 0fr → 1fr (sin medir
 * alturas en JS). Todas las transiciones van bajo motion-safe.
 *
 * El texto vive en content.ts → `faq`. Cuando una respuesta es un array se
 * muestra como nube de etiquetas en vez de texto corrido.
 */
export function Faq({ t }: { t: Content }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="dudas" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.faq.eyebrow}
          </p>
          {/* h2 hereda font-display italic del @layer base */}
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {t.faq.title}
          </h2>
        </div>

        <ul className="mt-10 border-t border-border lg:mt-0">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            const num = String(i + 1).padStart(2, "0");
            const answerId = `faq-answer-${i}`;
            return (
              <li key={item.question} className="relative border-b border-border">
                {/* Indicador de "activo": línea vertical terracota pegada al borde. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 h-full w-0.5 bg-terracotta motion-safe:transition-opacity motion-safe:duration-300",
                    open ? "opacity-100" : "opacity-0",
                  )}
                />
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={answerId}
                    className="grid w-full grid-cols-[2rem_1fr_auto] items-start gap-x-2 py-3 pr-1 pl-4 text-left sm:grid-cols-[3.25rem_1fr_auto] sm:gap-x-5 sm:py-5 sm:pl-6"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-display text-2xl leading-none italic tabular-nums motion-safe:transition-colors motion-safe:duration-300 sm:text-4xl",
                        open ? "text-foreground" : "text-foreground/15",
                      )}
                    >
                      {num}
                    </span>
                    <span
                      className={cn(
                        // font-sans / not-italic: el <h3> hereda font-display italic del base.
                        "mt-1 font-sans text-base font-medium not-italic motion-safe:transition-colors motion-safe:duration-300 sm:mt-1.5 sm:text-lg",
                        open ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {item.question}
                    </span>
                    <Plus
                      aria-hidden
                      className={cn(
                        "mt-1 size-5 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-300 sm:mt-2",
                        open && "rotate-45",
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={answerId}
                  className={cn(
                    "grid pr-1 pl-4 motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out sm:pl-6",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-[2rem_1fr] gap-x-2 pb-5 sm:grid-cols-[3.25rem_1fr] sm:gap-x-5 sm:pb-6">
                      <span aria-hidden />
                      {typeof item.answer === "string" ? (
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.answer}
                        </p>
                      ) : (
                        <ul className="flex flex-wrap gap-2">
                          {item.answer.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
