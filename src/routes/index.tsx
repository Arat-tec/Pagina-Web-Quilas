import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Carousel } from "@/components/Carousel";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { content, type Lang } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

const title = "Quilas — Hotel en la Huasteca Potosina, Huichihuayán SLP";
const description =
  "Hotel Quilas en Huichihuayán, San Luis Potosí: cabañas y habitaciones rodeadas de naturaleza, a 10 min del río El Nacimiento y cerca de Xilitla, Tamul y Tamasopo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("es");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar t={t} lang={lang} onToggleLang={() => setLang(lang === "es" ? "en" : "es")} />

      <main>
        <Hero t={t} />

        <Section
          id="habitaciones"
          eyebrow={t.rooms.eyebrow}
          title={t.rooms.title}
          intro={t.rooms.intro}
          tone="sand"
        >
          <Carousel slides={t.rooms.slides} labels={t.carousel} />
        </Section>

        <Section
          id="atractivos"
          eyebrow={t.near.eyebrow}
          title={t.near.title}
          intro={t.near.intro}
        >
          <Carousel slides={t.near.slides} labels={t.carousel} />
        </Section>

        <Section
          id="escapadas"
          eyebrow={t.far.eyebrow}
          title={t.far.title}
          intro={t.far.intro}
          tone="sand"
        >
          <Carousel slides={t.far.slides} labels={t.carousel} />
          <div className="mt-10 flex justify-center">
            <a
              href={whatsappUrl(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.far.cta}
            </a>
          </div>
        </Section>

        <About t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
      <WhatsAppFab t={t} />
    </div>
  );
}
