import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GhlFormButton } from "@/components/site/GhlFormButton";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLang, UI, type Lang } from "@/lib/i18n";
import xprtLogo from "@/assets/xprt-logo.png";

type SubItem = { to: string; label: string; description?: string; external?: boolean };

type NavItem =
  | { kind: "static"; to: string; label: string }
  | { kind: "category"; category: string; label: string; subitems: SubItem[]; hubTo?: string };


function buildNav(lang: Lang): readonly NavItem[] {
  return [
    {
      kind: "category",
      category: "personal",
      label: UI.navPersonal[lang],
      subitems: [
        { to: "/personal/homeowners-insurance", label: UI.subHomeowners[lang], description: UI.subHomeownersDesc[lang] },
        { to: "/personal/auto-insurance", label: UI.subAuto[lang], description: UI.subAutoDesc[lang] },
        { to: "/personal/renters-insurance", label: UI.subRenters[lang], description: UI.subRentersDesc[lang] },
        { to: "/personal/landlord-insurance", label: UI.subLandlord[lang], description: UI.subLandlordDesc[lang] },
      ],
    },
    {
      kind: "category",
      category: "bonds",
      label: UI.navBonds[lang],
      subitems: [
        { to: lang === "es" ? "/es/bonds" : "/bonds", label: UI.subBondsHub[lang], description: UI.subBondsHubDesc[lang] },
        { to: "/services/bonds/surety-bonds", label: UI.subSurety[lang] },
        { to: "/services/bonds/license-permit-bonds", label: UI.subLicensePermit[lang] },
        { to: "/services/bonds/contractor-bonds", label: UI.subContractor[lang] },
        { to: "/services/bonds/court-bonds", label: UI.subCourt[lang] },
      ],
    },
    {
      kind: "category",
      category: "dealership",
      label: UI.navDealership[lang],
      subitems: [
        { to: "/services/dealership/garage-liability", label: UI.subGarage[lang] },
        { to: "/services/dealership/dealer-open-lot", label: UI.subOpenLot[lang] },
        { to: "/services/dealership/dealer-bonds", label: UI.subDealerBonds[lang] },
      ],
    },
    {
      kind: "category",
      category: "commercial",
      label: UI.navCommercial[lang],
      subitems: [
        { to: "/services/commercial/general-liability", label: UI.subGL[lang] },
        { to: "/services/commercial/workers-compensation", label: UI.subWC[lang] },
        { to: "/services/commercial/commercial-auto", label: UI.subCommAuto[lang] },
        { to: "/services/commercial/business-owners-policy", label: UI.subBOP[lang] },
      ],
    },
    { kind: "static", to: lang === "es" ? "/es/faq" : "/faq", label: UI.navKnowledgeBase[lang] },
    { kind: "static", to: lang === "es" ? "/es/about" : "/about", label: UI.navMeetTheXprts[lang] },
  ];
}

function CategoryDropdown({ item, lang }: { item: Extract<NavItem, { kind: "category" }>; lang: Lang }) {
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
                  {UI.navViewAll[lang]} {item.label} →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileCategory({
  item,
  lang,
  onNavigate,
}: {
  item: Extract<NavItem, { kind: "category" }>;
  lang: Lang;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {expanded && (
        <ul className="ml-3 border-l border-border pl-3">
          {item.subitems.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to as any}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {s.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/services/$category"
              params={{ category: item.category }}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold hover:bg-accent"
            >
              {UI.navViewAll[lang]} {item.label} →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const NAV = buildNav(lang);
  const bookHref = lang === "es" ? "/es/book" : "/book";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-prose flex h-24 items-center justify-between gap-8 md:h-28">
        <Link to={lang === "es" ? "/es" : "/"} className="-my-2 flex shrink-0 items-center" aria-label="XPRT Insurance — A Roni Rivers Agency">
          <img
            src={xprtLogo}
            alt="XPRT Insurance — A Roni Rivers Agency"
            className="block h-20 w-auto max-w-none md:h-24"
            width={160}
            height={112}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.kind === "category" ? (
              <CategoryDropdown key={item.label} item={item} lang={lang} />
            ) : (
              <Link
                key={item.label}
                to={item.to as any}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle current={lang} />
          <GhlFormButton form="contact" variant="ghost" size="sm">
            {UI.btnContactUs[lang]}
          </GhlFormButton>
          <Button asChild size="sm" className="btn-gold-shimmer bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to={bookHref}>{UI.btnBookAReview[lang]}</Link>
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
                <MobileCategory key={item.label} item={item} lang={lang} onNavigate={() => setOpen(false)} />
              ) : (
                <Link
                  key={item.label}
                  to={item.to as any}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <div className="flex justify-start">
                <LanguageToggle current={lang} />
              </div>
              <GhlFormButton form="contact" variant="outline">
                {UI.btnContactUs[lang]}
              </GhlFormButton>
              <Button asChild className="bg-primary text-primary-foreground">
                <Link to={bookHref} onClick={() => setOpen(false)}>{UI.btnBookAReview[lang]}</Link>
              </Button>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}
