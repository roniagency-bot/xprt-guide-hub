import { Link, useLocation } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { toLangPath, type Lang, UI } from "@/lib/i18n";

export function LanguageToggle({ current }: { current: Lang }) {
  const { pathname } = useLocation();
  const enPath = toLangPath(pathname, "en");
  const esPath = toLangPath(pathname, "es");

  const baseClass = "rounded-full px-3 py-1 font-medium transition-colors";
  const activeClass = "bg-gold text-gold-foreground";
  const inactiveClass = "text-muted-foreground hover:text-foreground";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs"
      role="group"
      aria-label={UI.switchLanguage[current]}
    >
      <Languages className="ml-2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {current === "en" ? (
        <span className={`${baseClass} ${activeClass}`} aria-current="page">EN</span>
      ) : (
        <Link to={enPath as never} className={`${baseClass} ${inactiveClass}`}>EN</Link>
      )}
      {current === "es" ? (
        <span className={`${baseClass} ${activeClass}`} aria-current="page">ES</span>
      ) : (
        <Link to={esPath as never} className={`${baseClass} ${inactiveClass}`}>ES</Link>
      )}
    </div>
  );
}
