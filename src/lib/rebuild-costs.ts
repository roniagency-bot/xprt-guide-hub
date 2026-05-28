// 2025 estimated rebuild cost per square foot by metro area.
// Source: blended RSMeans / Craftsman / Verisk 360Value ranges, rounded.
// These are EDUCATIONAL ESTIMATES. A real replacement cost calculation
// requires a carrier-grade estimator (Verisk 360Value, e2Value) that
// accounts for finishes, framing, mechanical systems, and code upgrades.

export type RebuildRegion = {
  id: string;
  label: string;
  state: "NV" | "CO";
  // $/sqft for STANDARD construction, single-family detached.
  baseCostPerSqft: number;
};

export const REBUILD_REGIONS: RebuildRegion[] = [
  // Nevada
  { id: "nv-las-vegas", label: "Las Vegas / Henderson, NV", state: "NV", baseCostPerSqft: 215 },
  { id: "nv-north-vegas", label: "North Las Vegas, NV", state: "NV", baseCostPerSqft: 205 },
  { id: "nv-reno", label: "Reno / Sparks, NV", state: "NV", baseCostPerSqft: 235 },
  { id: "nv-rural", label: "Rural Nevada", state: "NV", baseCostPerSqft: 195 },
  // Colorado
  { id: "co-denver", label: "Denver / Aurora, CO", state: "CO", baseCostPerSqft: 245 },
  { id: "co-springs", label: "Colorado Springs, CO", state: "CO", baseCostPerSqft: 230 },
  { id: "co-boulder", label: "Boulder, CO", state: "CO", baseCostPerSqft: 275 },
  { id: "co-mountain", label: "Mountain Colorado (Vail, Aspen, Summit)", state: "CO", baseCostPerSqft: 365 },
  { id: "co-front-range", label: "Front Range / suburbs, CO", state: "CO", baseCostPerSqft: 240 },
];

export type QualityTier = "standard" | "custom" | "luxury";

export const QUALITY_MULTIPLIER: Record<QualityTier, number> = {
  standard: 1.0,
  custom: 1.3,
  luxury: 1.75,
};

export type AgeBucket = "lt10" | "10to30" | "gt30";

// Older homes often have original materials (plaster, hardwood, custom millwork)
// that cost more to replicate authentically.
export const AGE_MULTIPLIER: Record<AgeBucket, number> = {
  lt10: 1.0,
  "10to30": 1.05,
  gt30: 1.1,
};

export function getRegion(id: string) {
  return REBUILD_REGIONS.find((r) => r.id === id);
}
