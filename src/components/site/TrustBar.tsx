import { ShieldCheck, MapPin, Languages, GraduationCap } from "lucide-react";

const ITEMS = [
  { icon: MapPin, label: "Licensed in Nevada & Colorado" },
  { icon: ShieldCheck, label: "Independent — not captive" },
  { icon: Languages, label: "Bilingual · English & Español" },
  { icon: GraduationCap, label: "Educational, advisor-first" },
];

export function TrustBar() {
  return (
    <div className="border-y border-border bg-card/50">
      <div className="container-prose grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-gold" strokeWidth={2} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
