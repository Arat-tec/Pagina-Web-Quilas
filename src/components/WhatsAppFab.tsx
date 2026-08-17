import { MessageCircle } from "lucide-react";
import type { Content } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFab({ t }: { t: Content }) {
  return (
    <a
      href={whatsappUrl(t.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.waFab}
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
