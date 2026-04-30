import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import xprtLogo from "@/assets/xprt-logo.png";

type NavItem =
  | { kind: "static"; to: "/faq" | "/about" | "/contact"; label: string }
  | { kind: "category"; category: string; label: string };

const NAV: readonly NavItem[] = [
  { kind: "category", category: "personal", label: "Personal" },
  { kind: "category", category: "commercial", label: "Commercial" },
  { kind: "category", category: "bonds", label: "Bonds" },
  { kind: "category", category: "dealership", label: "Dealership" },
  { kind: "static", to: "/faq", label: "Knowledge Base" },
  { kind: "static", to: "/about", label: "About" },
  { kind: "static", to: "/contact", label: "Contact" },
] as const;

function NavLinkItem({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}) {
  const activeProps = { className: "text-foreground bg-accent" };
  if (item.kind === "static") {
    return (
      <Link to={item.to} className={className} activeProps={activeProps} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link
      to="/services/$category"
      params={{ category: item.category }}
      className={className}
      activeProps={activeProps}
      onClick={onClick}
    >
      {item.label}
    </Link>
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
          {NAV.map((item) => (
            <NavLinkItem
              key={item.label}
              item={item}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            />
          ))}
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
            {NAV.map((item) => (
              <NavLinkItem
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-accent"
              />
            ))}
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
