import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

// Ruta real (no el fallback de __root.tsx): existe solo para que el build
// pueda prerenderizarla a /404.html — el prerender de TanStack Start no
// puede guardar una respuesta con status 404 real, así que esta ruta
// responde 200 OK con el mismo contenido, y vite.config.ts la guarda con
// prerender.outputPath como "/404.html" (la convención que reconocen
// Cloudflare Pages, Netlify y Vercel para servir un fallback en hosting
// estático). Nadie navega aquí directamente en la app.
export const Route = createFileRoute("/404")({
  component: NotFound,
});
