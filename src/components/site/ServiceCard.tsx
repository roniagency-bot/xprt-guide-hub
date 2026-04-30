import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, type LucideIcon } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  to,
  badge,
  featured,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  badge?: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        featured
          ? "group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-gold/60 bg-gradient-to-br from-card via-card to-gold/5 p-7 shadow-lift ring-1 ring-gold/20 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:shadow-lift"
          : "group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-elegant transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
      }
    >
      {featured && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/15 blur-2xl"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={
            featured
              ? "grid h-12 w-12 place-items-center rounded-lg bg-gold text-gold-foreground shadow-elegant transition-transform group-hover:scale-105"
              : "grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-gold-foreground"
          }
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        {badge && (
          <span
            className={
              featured
                ? "inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-foreground shadow-elegant"
                : "rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold-foreground"
            }
          >
            {featured && <Sparkles className="h-3 w-3" strokeWidth={2.4} />}
            {badge}
          </span>
        )}
      </div>
      <h3 className="relative mt-6 font-display text-2xl leading-tight text-foreground">{title}</h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className={`relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${featured ? "text-foreground" : "text-foreground"}`}>
        {featured ? "Explore our specialty" : "Explore coverage"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
