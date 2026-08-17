import { Facebook, MessageCircle, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";

export function Footer({ t }: { t: Content }) {
  const links = [
    { href: "#habitaciones", label: t.nav.rooms },
    { href: "#atractivos", label: t.nav.attractions },
    { href: "#nosotros", label: t.nav.about },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">Quilas</p>
          <p className="mt-2 text-sm opacity-80">{t.footer.tagline}</p>
          <p className="mt-1 text-sm opacity-80">{site.addressLine}</p>
        </div>

        <nav aria-label={t.footer.quickLinks}>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-70">
            {t.footer.quickLinks}
          </p>
          <ul className="mt-3 space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm opacity-90 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-3">
          <a
            href={whatsappUrl(t.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm opacity-90 underline-offset-4 hover:underline"
          >
            <MessageCircle className="size-5 shrink-0" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm opacity-90 underline-offset-4 hover:underline"
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm opacity-90 underline-offset-4 hover:underline"
          >
            <Facebook className="size-5 shrink-0" aria-hidden />
            Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-warm/15">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs opacity-70 md:px-6">
          &copy; {new Date().getFullYear()} Quilas. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
