import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "cream" | "ink";
  id?: string;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-primary-foreground"
      : tone === "cream"
        ? "bg-cream-gradient"
        : "";
  return (
    <section id={id} className={cn("py-20 md:py-28", toneClass, className)}>
      <div className="container-prose">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <span className="inline-block h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "ink";
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow className={tone === "ink" ? "text-gold" : ""}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-balance text-3xl leading-[1.1] md:text-5xl",
          tone === "ink" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed md:text-lg",
            tone === "ink" ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
