import { type MouseEvent, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Content, Lang } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import logoQuilas_negro from "@/assets/logo_quilas_negro.png";
import logoQuilas_blanco from "@/assets/logo_quilas_blanco.png";

// Color de la festividad actual — cambiar aquí en cada temporada.
const SEASONAL_LINK_COLOR = "#F97316";

type NavbarProps = {
  t: Content;
  lang: Lang;
  onToggleLang: () => void;
};

export function Navbar({ t, lang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { href: string; label: string; seasonal?: boolean }[] = [
    { href: "#temporada", label: t.nav.seasonal, seasonal: true },
    { href: "#habitaciones", label: t.nav.rooms },
    { href: "#atractivos", label: t.nav.attractions },
    { href: "#nosotros", label: t.nav.about },
    { href: "#contacto", label: t.nav.contact },
  ];

  const onSolid = scrolled || open;

  // Scroll a la sección de forma explícita: el router de TanStack con
  // scrollRestoration no siempre lleva a los anclas de la misma página.
  const goToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onSolid
          ? "border-b border-border bg-background/95 backdrop-blur"
          : "bg-linear-to-b from-black/50 to-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6">
        <a href="#inicio" onClick={(e) => goToSection(e, "#inicio")} className="flex items-center">
          <img
            src={onSolid ? logoQuilas_negro : logoQuilas_blanco}
            alt="Quilas Hotel"
            className="h-10 w-auto md:h-12"
          />
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => goToSection(e, link.href)}
                  style={link.seasonal ? { color: SEASONAL_LINK_COLOR } : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 transition-colors",
                    // Xantolo un paso más grande: la cursiva Garamond se ve más
                    // chica que la sans a igual tamaño en px.
                    link.seasonal
                      ? "font-display text-base font-medium italic"
                      : "text-sm font-medium",
                    onSolid
                      ? "text-foreground hover:bg-secondary"
                      : "text-forest-foreground hover:bg-warm/15",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.nav.langLabel}
            className={cn(
              "min-h-11 rounded-full border px-3 text-sm font-semibold transition-colors",
              onSolid
                ? "border-border text-foreground hover:bg-secondary"
                : "border-warm/40 text-forest-foreground hover:bg-warm/15",
            )}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a
            href={whatsappUrl(t.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden",
              onSolid
                ? "text-foreground hover:bg-secondary"
                : "text-forest-foreground hover:bg-warm/15",
            )}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 md:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => goToSection(e, link.href)}
                  style={link.seasonal ? { color: SEASONAL_LINK_COLOR } : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-lg px-2 hover:bg-secondary",
                    link.seasonal
                      ? "font-display text-lg italic"
                      : "text-base font-medium text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href="#contacto"
                onClick={(e) => goToSection(e, "#contacto")}
                className="flex min-h-12 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground"
              >
                {t.nav.book}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
