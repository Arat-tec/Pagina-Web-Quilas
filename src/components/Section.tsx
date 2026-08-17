import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "default" | "sand";
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 sm:py-24",
        tone === "sand" ? "bg-secondary" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{intro}</p>
          ) : null}
        </header>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
