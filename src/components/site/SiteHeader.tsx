import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/services/personal", label: "Personal" },
  { to: "/services/commercial", label: "Commercial" },
  { to: "/services/bonds", label: "Bonds" },
  { to: "/services/dealership", label: "Dealership" },
  { to: "/faq", label: "Knowledge Base" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-prose flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="XPRT Insurance home">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground shadow-elegant">
            <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl tracking-tight md:text-2xl">
            XPRT <span className="text-muted-foreground">Insurance</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground bg-accent" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/services/personal">Get Quote</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/book">Book a Review</Link>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-prose flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <Button asChild variant="outline">
                <Link to="/services/personal" onClick={() => setOpen(false)}>Get Quote</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground">
                <Link to="/book" onClick={() => setOpen(false)}>Book a Review</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
