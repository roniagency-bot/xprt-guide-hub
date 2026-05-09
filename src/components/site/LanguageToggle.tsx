import { Link, useLocation } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { toLangPath, type Lang, UI } from "@/lib/i18n";

export function LanguageToggle({ current }: { current: Lang }) {
  const { pathname } = useLocation();
  const otherLang: Lang = current === "en" ? "es" : "en";
  const otherPath = toLangPath(pathname, otherLang);

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs"
      role="group"
      aria-label={UI.switchLanguage[current]}
    >
      <Languages className="ml-2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      <Link
        to={current === "en" ? pathname : otherPath as never}
        aria-current={current === "en" ? "page" : undefined}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          current === "en"
            ? "bg-gold text-gold-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Link>
      <Link
        to={current === "es" ? pathname : otherPath as never}
        aria-current={current === "es" ? "page" : undefined}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          current === "es"
            ? "bg-gold text-gold-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ES
      </Link>
    </div>
  );
}
