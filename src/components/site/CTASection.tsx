import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CTASection({
  title = "Ready for a clarity-first coverage review?",
  subtitle = "Book a free 20-minute call. No pressure, no jargon — just a structured walk-through of your current policy and where it can be improved.",
  primaryHref = "/book",
  primaryLabel = "Book a Review",
  secondaryHref = "/faq",
  secondaryLabel = "Browse the Knowledge Base",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-primary-foreground">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 60%, var(--gold) 0, transparent 35%)",
        }}
      />
      <div className="container-prose relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            <Calendar className="h-3.5 w-3.5" /> Free coverage review
          </span>
          <h2 className="mt-6 text-balance font-display text-4xl leading-tight md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/75 md:text-lg">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold"
            >
              <Link to={primaryHref}>
                {primaryLabel}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
