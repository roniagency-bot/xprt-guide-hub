import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  AGE_MULTIPLIER,
  QUALITY_MULTIPLIER,
  REBUILD_REGIONS,
  getRegion,
  type AgeBucket,
  type QualityTier,
} from "@/lib/rebuild-costs";

type Strings = {
  eyebrow: string;
  title: string;
  intro: string;
  sqftLabel: string;
  sqftPlaceholder: string;
  regionLabel: string;
  regionPlaceholder: string;
  ageLabel: string;
  ageLt10: string;
  age10to30: string;
  ageGt30: string;
  qualityLabel: string;
  qualityStandard: string;
  qualityCustom: string;
  qualityLuxury: string;
  contentsPctLabel: string;
  hasBasement: string;
  highNetWorth: string;
  resultsTitle: string;
  dwelling: string;
  otherStructures: string;
  personalProperty: string;
  lossOfUse: string;
  liability: string;
  umbrella: string;
  disclaimer: string;
  bookCta: string;
  cheatSheetCta: string;
  enterSqftHint: string;
};

const EN: Strings = {
  eyebrow: "Interactive tool",
  title: "Dwelling Coverage Calculator",
  intro:
    "Estimate the rebuild cost of your home and recommended coverage limits in about 60 seconds. Use this as a starting point — your final number should come from a carrier-grade replacement cost estimator.",
  sqftLabel: "Home square footage",
  sqftPlaceholder: "e.g. 2,200",
  regionLabel: "Location",
  regionPlaceholder: "Select your metro",
  ageLabel: "Home age",
  ageLt10: "Less than 10 years",
  age10to30: "10–30 years",
  ageGt30: "Over 30 years",
  qualityLabel: "Construction quality",
  qualityStandard: "Standard / tract build",
  qualityCustom: "Custom / upgraded finishes",
  qualityLuxury: "Luxury / high-end",
  contentsPctLabel: "Personal property as % of dwelling",
  hasBasement: "Has a finished basement",
  highNetWorth: "Significant assets or high income (consider umbrella)",
  resultsTitle: "Estimated coverage",
  dwelling: "Dwelling (Coverage A)",
  otherStructures: "Other structures (B) — 10%",
  personalProperty: "Personal property (C)",
  lossOfUse: "Loss of use (D) — 20%",
  liability: "Personal liability — suggested",
  umbrella: "Umbrella policy — suggested",
  disclaimer:
    "Estimates only. Actual rebuild cost depends on finishes, framing, mechanical systems, code upgrades, debris removal, and local labor. A licensed advisor uses a carrier-grade estimator (Verisk 360Value or e2Value) for the final number.",
  bookCta: "Book a Free Coverage Review",
  cheatSheetCta: "Get the Cheat Sheet",
  enterSqftHint: "Enter square footage and pick a location to see your estimate.",
};

const FORMAT_USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function DwellingCalculator({ strings = EN }: { strings?: Strings }) {
  const [sqft, setSqft] = useState<string>("");
  const [regionId, setRegionId] = useState<string>("");
  const [age, setAge] = useState<AgeBucket>("10to30");
  const [quality, setQuality] = useState<QualityTier>("standard");
  const [contentsPct, setContentsPct] = useState<number>(60);
  const [basement, setBasement] = useState(false);
  const [highNetWorth, setHighNetWorth] = useState(false);

  const sqftNum = Number(sqft.replace(/[,\s]/g, ""));
  const region = getRegion(regionId);

  const results = useMemo(() => {
    if (!sqftNum || sqftNum < 200 || !region) return null;
    const base = region.baseCostPerSqft;
    const dwellingRaw =
      sqftNum *
      base *
      QUALITY_MULTIPLIER[quality] *
      AGE_MULTIPLIER[age] *
      (basement ? 1.08 : 1);
    const dwelling = Math.round(dwellingRaw / 1000) * 1000;
    const otherStructures = Math.round((dwelling * 0.1) / 1000) * 1000;
    const personalProperty = Math.round((dwelling * (contentsPct / 100)) / 1000) * 1000;
    const lossOfUse = Math.round((dwelling * 0.2) / 1000) * 1000;
    const liability = dwelling > 750000 ? 500000 : 300000;
    const umbrella = highNetWorth ? (dwelling > 1000000 ? 2000000 : 1000000) : null;
    return { dwelling, otherStructures, personalProperty, lossOfUse, liability, umbrella };
  }, [sqftNum, region, age, quality, contentsPct, basement, highNetWorth]);

  return (
    <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 shadow-lift md:grid-cols-5 md:p-8">
      {/* INPUTS */}
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl leading-tight">{strings.title}</h3>
            <p className="text-xs text-muted-foreground">~60 seconds · no signup</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{strings.intro}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label htmlFor="dc-sqft">{strings.sqftLabel}</Label>
            <Input
              id="dc-sqft"
              inputMode="numeric"
              placeholder={strings.sqftPlaceholder}
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div className="sm:col-span-1">
            <Label htmlFor="dc-region">{strings.regionLabel}</Label>
            <Select value={regionId} onValueChange={setRegionId}>
              <SelectTrigger id="dc-region" className="mt-1.5">
                <SelectValue placeholder={strings.regionPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {REBUILD_REGIONS.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-1">
            <Label htmlFor="dc-age">{strings.ageLabel}</Label>
            <Select value={age} onValueChange={(v) => setAge(v as AgeBucket)}>
              <SelectTrigger id="dc-age" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lt10">{strings.ageLt10}</SelectItem>
                <SelectItem value="10to30">{strings.age10to30}</SelectItem>
                <SelectItem value="gt30">{strings.ageGt30}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-1">
            <Label htmlFor="dc-quality">{strings.qualityLabel}</Label>
            <Select value={quality} onValueChange={(v) => setQuality(v as QualityTier)}>
              <SelectTrigger id="dc-quality" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">{strings.qualityStandard}</SelectItem>
                <SelectItem value="custom">{strings.qualityCustom}</SelectItem>
                <SelectItem value="luxury">{strings.qualityLuxury}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <Label>{strings.contentsPctLabel}</Label>
              <span className="text-sm font-medium text-foreground">{contentsPct}%</span>
            </div>
            <Slider
              value={[contentsPct]}
              min={40}
              max={75}
              step={5}
              onValueChange={(v) => setContentsPct(v[0])}
              className="mt-3"
            />
          </div>

          <label className="flex items-start gap-2 text-sm sm:col-span-1">
            <Checkbox
              checked={basement}
              onCheckedChange={(v) => setBasement(v === true)}
              className="mt-0.5"
            />
            <span>{strings.hasBasement}</span>
          </label>

          <label className="flex items-start gap-2 text-sm sm:col-span-1">
            <Checkbox
              checked={highNetWorth}
              onCheckedChange={(v) => setHighNetWorth(v === true)}
              className="mt-0.5"
            />
            <span>{strings.highNetWorth}</span>
          </label>
        </div>
      </div>

      {/* RESULTS */}
      <div className="md:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-background p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{strings.resultsTitle}</p>

          {!results ? (
            <p className="mt-4 text-sm text-muted-foreground">{strings.enterSqftHint}</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                <span className="text-muted-foreground">{strings.dwelling}</span>
                <span className="font-display text-2xl text-foreground">
                  {FORMAT_USD.format(results.dwelling)}
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground">{strings.otherStructures}</span>
                <span className="font-medium text-foreground">
                  {FORMAT_USD.format(results.otherStructures)}
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground">{strings.personalProperty}</span>
                <span className="font-medium text-foreground">
                  {FORMAT_USD.format(results.personalProperty)}
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground">{strings.lossOfUse}</span>
                <span className="font-medium text-foreground">
                  {FORMAT_USD.format(results.lossOfUse)}
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-3 border-t border-border pt-3">
                <span className="text-muted-foreground">{strings.liability}</span>
                <span className="font-medium text-foreground">
                  {FORMAT_USD.format(results.liability)}
                </span>
              </li>
              {results.umbrella ? (
                <li className="flex items-baseline justify-between gap-3">
                  <span className="text-muted-foreground">{strings.umbrella}</span>
                  <span className="font-medium text-foreground">
                    {FORMAT_USD.format(results.umbrella)}
                  </span>
                </li>
              ) : null}
            </ul>
          )}

          <p className="mt-5 flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            <span>{strings.disclaimer}</span>
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/book">
                {strings.bookCta}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="#cheat-sheet">{strings.cheatSheetCta}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
