import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  to,
  badge,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  badge?: string;
}) {
  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-elegant transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        {badge && (
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold-foreground">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-2xl leading-tight text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        Explore coverage
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
