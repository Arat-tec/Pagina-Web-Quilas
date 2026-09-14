import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Content } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsAppFab({ t }: { t: Content }) {
  // El Hero siempre está visible al cargar la página, así que el botón
  // arranca oculto — no debe tapar el CTA del Hero.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) {
      // Si el id cambió o no existe, no desaparece el botón para siempre.
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(!entry.isIntersecting);
      },
      { threshold: 0.4 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(t.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.waFab}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 sm:right-6 sm:bottom-6",
        "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
        visible ? "opacity-100 scale-100" : "pointer-events-none scale-75 opacity-0",
      )}
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
