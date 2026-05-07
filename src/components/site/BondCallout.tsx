import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROPELLER_QUOTE_URL } from "@/lib/bonds-faqs";

/**
 * Subtle, premium "Related Bond Requirement" callout.
 * Used wherever dealer/surety bond requirements are discussed so users can
 * learn about bonds internally or quote & purchase online directly.
 */
export function BondCallout({
  variant = "default",
  title = "Related: Nevada dealer bond requirement",
  body = "Nevada dealers are typically required to maintain a $100,000 surety bond before licensing approval. We help you secure the right bond and coordinate it with your dealership insurance.",
}: {
  variant?: "default" | "compact";
  title?: string;
  body?: string;
}) {
  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/5 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                to="/business-insurance/bonds"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold"
              >
                Learn About Dealer Bonds
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={PROPELLER_QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-gold hover:text-gold/80"
              >
                Quote & Purchase Online
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold/5 p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-background">
          <ShieldCheck className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Related Bond Requirement</p>
          <h3 className="mt-2 font-display text-xl leading-tight md:text-2xl">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{body}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/business-insurance/bonds">Learn About Dealer Bonds</Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={PROPELLER_QUOTE_URL} target="_blank" rel="noopener noreferrer">
                Quote & Purchase Online
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
