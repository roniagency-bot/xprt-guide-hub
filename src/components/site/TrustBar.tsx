import { ShieldCheck, MapPin, Languages, GraduationCap } from "lucide-react";
import { useLang, UI } from "@/lib/i18n";

export function TrustBar() {
  const lang = useLang();
  const items = [
    { icon: MapPin, label: UI.trustLicensed[lang] },
    { icon: ShieldCheck, label: UI.trustIndependent[lang] },
    { icon: Languages, label: UI.trustBilingual[lang] },
    { icon: GraduationCap, label: UI.trustEducational[lang] },
  ];
  return (
    <div className="border-y border-border bg-card/50">
      <div className="container-prose grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-gold" strokeWidth={2} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
