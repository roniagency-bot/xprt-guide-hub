import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-primary-foreground">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-background/10">
              <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl">XPRT Insurance</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Independent agency licensed in Nevada & Colorado. Personal, commercial, bonds,
            and dealership coverage — explained clearly, structured correctly.
          </p>
          <p className="mt-4 text-xs text-primary-foreground/50">
            Bilingual service · English & Español
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-gold">Coverage</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/services/$category" params={{ category: "personal" }} className="hover:text-gold">Personal</Link></li>
            <li><Link to="/services/$category" params={{ category: "commercial" }} className="hover:text-gold">Commercial</Link></li>
            <li><Link to="/services/$category" params={{ category: "bonds" }} className="hover:text-gold">Bonds</Link></li>
            <li><Link to="/services/$category" params={{ category: "dealership" }} className="hover:text-gold">Dealership (NV)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-gold">Agency</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/faq" className="hover:text-gold">Knowledge Base</Link></li>
            <li><Link to="/states/$state" params={{ state: "nevada" }} className="hover:text-gold">Nevada</Link></li>
            <li><Link to="/states/$state" params={{ state: "colorado" }} className="hover:text-gold">Colorado</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/book" className="hover:text-gold">Book a Review</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-6 text-xs text-primary-foreground/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} XPRT Insurance. All rights reserved.</p>
          <p>Licensed in Nevada & Colorado · Educational content, not legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
