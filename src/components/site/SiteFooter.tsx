import { Link } from "@tanstack/react-router";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import xprtLogo from "@/assets/xprt-logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-primary-foreground">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <img
            src={xprtLogo}
            alt="XPRT Insurance — A Roni Rivers Agency"
            className="h-24 w-auto"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Independent agency licensed in Nevada & Colorado. Personal, commercial, bonds,
            and dealership coverage — explained clearly, structured correctly.
          </p>
          <p className="mt-4 text-xs text-primary-foreground/50">
            Bilingual service · English & Español
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <GhlFormButton
              form="contact"
              size="sm"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              Contact Us
            </GhlFormButton>
            <GhlFormButton
              form="personal_quote"
              size="sm"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Get a Quote
            </GhlFormButton>
          </div>
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

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-gold">Offices</h4>
          <address className="mt-4 space-y-4 text-sm not-italic text-primary-foreground/80">
            <div>
              <p className="font-semibold text-primary-foreground">Las Vegas, NV</p>
              <p className="mt-1">2525 S Bruce St</p>
              <p>Las Vegas, NV 89169</p>
              <a href="tel:+17027663394" className="mt-1 inline-block text-gold hover:underline">(702) 766-3394</a>
            </div>
            <div>
              <p className="font-semibold text-primary-foreground">Denver, CO</p>
              <p className="mt-1">1350 40th St</p>
              <p>Denver, CO 80205</p>
              <a href="tel:+17253442211" className="mt-1 inline-block text-gold hover:underline">(725) 344-2211</a>
            </div>
          </address>
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
