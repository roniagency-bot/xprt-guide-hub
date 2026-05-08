import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import xprtLogo from "@/assets/xprt-logo.png";

type SubItem = { to: string; label: string; description?: string };

type NavItem =
  | { kind: "static"; to: "/faq" | "/about" | "/contact"; label: string }
  | { kind: "category"; category: string; label: string; subitems: SubItem[] };

const NAV: readonly NavItem[] = [
  {
    kind: "category",
    category: "personal",
    label: "Personal",
    subitems: [
      { to: "/personal/homeowners-insurance", label: "Homeowners", description: "Dwelling, contents, liability" },
      { to: "/personal/auto-insurance", label: "Auto", description: "Liability, collision, UM/UIM" },
      { to: "/personal/renters-insurance", label: "Renters", description: "Contents and liability" },
      { to: "/personal/landlord-insurance", label: "Landlord", description: "Rental dwelling coverage" },
    ],
  },
  {
    kind: "category",
    category: "commercial",
    label: "Commercial",
    subitems: [
      { to: "/services/commercial/general-liability", label: "General Liability" },
      { to: "/services/commercial/workers-compensation", label: "Workers' Comp" },
      { to: "/services/commercial/commercial-auto", label: "Commercial Auto" },
      { to: "/services/commercial/business-owners-policy", label: "Business Owners Policy" },
    ],
  },
  {
    kind: "category",
    category: "bonds",
    label: "Bonds",
    subitems: [
      { to: "/business-insurance/bonds", label: "Bonds Hub", description: "Quote, purchase, and learn" },
      { to: "/services/bonds/surety-bonds", label: "Surety Bonds" },
      { to: "/services/bonds/license-permit-bonds", label: "License & Permit" },
      { to: "/services/bonds/contractor-bonds", label: "Contractor Bonds" },
      { to: "/services/bonds/court-bonds", label: "Court Bonds" },
    ],
  },
  {
    kind: "category",
    category: "dealership",
    label: "Dealership",
    subitems: [
      { to: "/services/dealership/garage-liability", label: "Garage Liability" },
      { to: "/services/dealership/dealer-open-lot", label: "Dealer Open Lot" },
      { to: "/services/dealership/dealer-bonds", label: "Dealer Bonds" },
    ],
  },
  { kind: "static", to: "/faq", label: "Knowledge Base" },
  { kind: "static", to: "/about", label: "About" },
  { kind: "static", to: "/contact", label: "Contact" },
] as const;

function CategoryDropdown({ item }: { item: Extract<NavItem, { kind: "category" }> }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to="/services/$category"
        params={{ category: item.category }}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        activeProps={{ className: "text-foreground bg-accent" }}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </Link>
      {open && (
        <div className="absolute left-0 top-full z-50 w-72 pt-2">
          <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-lift">
            <ul className="py-2">
              {item.subitems.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to as any}
                    className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <div className="font-medium">{s.label}</div>
                    {s.description && (
                      <div className="text-xs text-muted-foreground">{s.description}</div>
                    )}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-border">
                <Link
                  to="/services/$category"
                  params={{ category: item.category }}
                  className="block px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-gold hover:bg-accent"
                >
                  View all {item.label} →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-prose flex h-24 items-center justify-between gap-8 md:h-28">
        <Link to="/" className="-my-2 flex items-center" aria-label="XPRT Insurance — A Roni Rivers Agency">
          <img
            src={xprtLogo}
            alt="XPRT Insurance — A Roni Rivers Agency"
            className="block h-24 w-auto md:h-28"
            width={320}
            height={112}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.kind === "category" ? (
              <CategoryDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/services/$category" params={{ category: "personal" }}>Get Quote</Link>
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
            {NAV.map((item) =>
              item.kind === "category" ? (
                <MobileCategory key={item.label} item={item} onNavigate={() => setOpen(false)} />
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <Button asChild variant="outline">
                <Link to="/services/$category" params={{ category: "personal" }} onClick={() => setOpen(false)}>Get Quote</Link>
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
