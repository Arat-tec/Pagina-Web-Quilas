import { Link } from "@tanstack/react-router";
import notFoundImage from "@/assets/404.jpg";

/**
 * UI de la página 404. Se usa en dos lugares:
 * - __root.tsx: notFoundComponent, el fallback que el router muestra
 *   client-side ante cualquier URL sin match.
 * - routes/404.tsx: una ruta real en "/404" que prerenderiza este mismo
 *   contenido a un archivo /404.html en el build estático (el prerender no
 *   puede guardar una respuesta con status 404 real, así que se prerenderiza
 *   como ruta normal — 200 OK — y el archivo resultante se renombra vía
 *   prerender.outputPath en vite.config.ts).
 */
export function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center px-4">
      <img
        src={notFoundImage}
        alt="Paisaje de la Huasteca Potosina con ganado pastando entre árboles"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/20" />

      <div className="max-w-md text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-forest-foreground/85 uppercase">
          Error 404
        </p>
        <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-forest-foreground italic sm:text-6xl">
          Parece que te perdiste en el camino
        </h1>
        <p className="mt-4 text-base text-forest-foreground/90 sm:text-lg">
          Esta página no existe, pero el resto de Quilas sigue aquí.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/15 px-7 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            Volver a inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
