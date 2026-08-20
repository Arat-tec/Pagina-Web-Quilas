import { Facebook, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { googleMapsUrl, mapEmbedUrl, site, wazeUrl, whatsappUrl } from "@/lib/site";

function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C7.6 2 4 5.6 4 10c0 5.7 6.6 11.4 7.3 12a1 1 0 0 0 1.4 0C13.4 21.4 20 15.7 20 10c0-4.4-3.6-8-8-8zm0 11.5A3.5 3.5 0 1 1 12 6.5a3.5 3.5 0 0 1 0 7z" />
    </svg>
  );
}

export function Contact({ t }: { t: Content }) {
  return (
    <section id="contacto" className="scroll-mt-20 bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.contact.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {t.contact.title}
          </h2>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-3xl bg-card p-6 shadow-sm sm:p-8">
            <ul className="space-y-5">
              <li className="flex min-w-0 items-start gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.contact.phone}</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-base break-words text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <MessageCircle className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.contact.whatsapp}</p>
                  <a
                    href={whatsappUrl(t.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base break-words text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <Facebook className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.contact.facebook}</p>
                  <a
                    href="https://m.me/lasquilashotel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base break-words text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Enviar mensaje por Messenger
                  </a>
                </div>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.contact.address}</p>
                  <p className="text-base text-muted-foreground">{site.addressLine}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={site.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FE385C] px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <AirbnbIcon className="size-5" />
                {t.contact.airbnb}
              </a>
              <a
                href={whatsappUrl(t.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#26D367] px-6 font-semibold text-[#26D367] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-5" aria-hidden />
                {t.contact.whatsapp}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Phone className="size-5" aria-hidden />
                {t.contact.call}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl bg-card shadow-sm">
              <div className="aspect-4/3 w-full sm:aspect-16/10">
                <iframe
                  title={t.contact.mapTitle}
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FFFFFF] px-5 font-semibold text-[#275DD1] transition-opacity hover:opacity-90"
              >
                <Navigation className="size-5" aria-hidden />
                {t.contact.openMaps}
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-[#33CCFE] px-5 font-semibold text-white transition-colors hover:bg-secondary"
              >
                <Navigation className="size-5" aria-hidden />
                {t.contact.openWaze}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
