// Sitio 100% estático (una sola ruta, sin server functions): el build prerenderiza
// todo en HTML/CSS/JS planos, sin necesidad de un servidor Node corriendo. Se
// deploya a cualquier hosting estático (Cloudflare Pages, Netlify, Vercel, etc.)
// apuntando al directorio dist/client — dist/server no hace falta en el
// hosting final, solo lo usa el propio build para prerenderizar cada ruta.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(({ command, isPreview }) => {
  // El prerender de @tanstack/start-plugin-core lanza internamente su propio
  // "vite preview" (mismo proceso Node, config resuelta de nuevo) para servir
  // cada ruta y capturar el HTML — por eso NO alcanza con mirar "command":
  // ese preview interno reporta command==="serve", igual que "npm run dev".
  // La señal que sí los distingue es "isPreview" (confirmado con
  // console.log temporal): solo es true en ese preview interno del build,
  // nunca en un "npm run dev" real. nitro (y su output a dist/) necesita
  // estar activo en el build principal Y en ese preview interno, pero NO en
  // dev — ahí dist/ todavía no existe y nitro truena sirviendo assets.
  const needsNitro = command === "build" || isPreview;

  return {
    css: { transformer: "lightningcss" },
    resolve: {
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Genera HTML estático para todas las rutas en build (auto-descubiertas;
        // crawlLinks sigue enlaces internos para encontrar cualquier página extra).
        prerender: {
          enabled: true,
          crawlLinks: true,
          failOnError: true,
        },
        // src/routes/404.tsx es una ruta real (200 OK) que renderiza el mismo
        // <NotFound/> que usa notFoundComponent — el prerender no puede
        // guardar una respuesta con status 404 real (trata cualquier !res.ok
        // como error fatal), así que se prerenderiza esta ruta normal y se
        // guarda como /404.html vía outputPath: la convención que reconocen
        // Cloudflare Pages, Netlify y Vercel para servir un fallback 404 en
        // hosting estático.
        pages: [{ path: "/404", prerender: { outputPath: "/404.html" } }],
      }),
      // Busca el bundle SSR en <build.outDir>/server/server.js por
      // convención propia del framework (ver getServerOutputDirectory en su
      // código fuente), así que se le da esa misma salida a nitro — pero
      // solo cuando hace falta (build real o el preview interno del
      // prerender), nunca en dev.
      needsNitro &&
        nitro({
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
        }),
      viteReact(),
    ],
  };
});
