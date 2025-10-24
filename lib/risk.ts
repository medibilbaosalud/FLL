import type {
  RiskFactors,
  RiskResult,
  SiteFeature,
  SiteTimeSeries,
  TimeSeriesPoint
} from "@/lib/types";

export type BiomePreset = "kostaldea" | "ibarbidea" | "basamortua" | "hirigunea" | "default";

export interface RiskConfig {
  weights: Record<keyof RiskFactors, number>;
  presets: Record<BiomePreset, Partial<Record<keyof RiskFactors, number>>>;
  thresholds: {
    warning: number;
    danger: number;
  };
}

export const defaultRiskConfig: RiskConfig = {
  weights: {
    hazard: 0.4,
    vulnerability: 0.25,
    exposure: 0.2,
    value: 0.15
  },
  presets: {
    kostaldea: { hazard: 0.45, exposure: 0.25 },
    ibarbidea: { hazard: 0.42, vulnerability: 0.28 },
    basamortua: { hazard: 0.35, vulnerability: 0.3 },
    hirigunea: { exposure: 0.28, value: 0.2 },
    default: {}
  },
  thresholds: {
    warning: 0.3,
    danger: 0.6
  }
};

function normalizeValue(value: number, min: number, max: number): number {
  if (max - min === 0) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function evaluateHazard(points: TimeSeriesPoint[]): number {
  const recent = points.slice(-7);
  const totalRain = mean(recent.map((d) => d.euri_mm));
  const temp = mean(recent.map((d) => d.tenperatura_c));
  const deform = mean(recent.map((d) => d.deformazio_proxy));
  const soil = mean(recent.map((d) => d.lur_hezetasuna));
  return Math.min(1, (totalRain / 80) * 0.4 + normalizeValue(temp, -5, 40) * 0.15 + deform * 0.25 + soil * 0.2);
}

function evaluateVulnerability(site: SiteFeature, points: TimeSeriesPoint[]): number {
  const material = site.properties.materiala;
  const conservationFactor = material === "adobe" ? 0.75 : material === "madera" ? 0.65 : material === "piedra" ? 0.45 : 0.55;
  const ndviTrend = mean(points.slice(-7).map((d) => d.ndvi));
  return Math.min(1, conservationFactor + (0.5 - ndviTrend) * 0.3);
}

function evaluateExposure(site: SiteFeature, points: TimeSeriesPoint[]): number {
  const visitors = mean(points.slice(-7).map((d) => d.bisitari_indizea));
  const deform = mean(points.map((d) => d.deformazio_proxy));
  return Math.min(1, visitors * 0.3 + deform * 0.25 + (site.properties.bioma === "kostaldea" ? 0.3 : 0.15));
}

function evaluateValue(site: SiteFeature): number {
  switch (site.properties.balioa) {
    case "unesco":
      return 1;
    case "nazionala":
      return 0.7;
    default:
      return 0.45;
  }
}

function computeConfidence(points: TimeSeriesPoint[]): "altu" | "ertain" | "baxu" {
  const completeness = [
    points.every((p) => typeof p.euri_mm === "number"),
    points.every((p) => typeof p.deformazio_proxy === "number"),
    points.every((p) => typeof p.ndvi === "number")
  ].filter(Boolean).length;

  if (completeness === 3) return "altu";
  if (completeness === 2) return "ertain";
  return "baxu";
}

export function applyPreset(config: RiskConfig, biome: string): RiskConfig {
  const preset = config.presets[(biome as BiomePreset) || "default"] || {};
  const weights = { ...config.weights, ...preset };
  const total = Object.values(weights).reduce((acc, w) => acc + w, 0);
  const normalized = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value / total])
  ) as Record<keyof RiskFactors, number>;
  return { ...config, weights: normalized };
}

export function calculateRisk(
  site: SiteFeature,
  series: SiteTimeSeries,
  config: RiskConfig = defaultRiskConfig
): RiskResult {
  const adjustedConfig = applyPreset(config, site.properties.bioma);
  const hazard = evaluateHazard(series.serie);
  const vulnerability = evaluateVulnerability(site, series.serie);
  const exposure = evaluateExposure(site, series.serie);
  const value = evaluateValue(site);

  const weightedPri =
    hazard * adjustedConfig.weights.hazard +
    vulnerability * adjustedConfig.weights.vulnerability +
    exposure * adjustedConfig.weights.exposure +
    value * adjustedConfig.weights.value;

  const pri = Math.min(1, Math.max(0, weightedPri));
  const priLabel = pri > adjustedConfig.thresholds.danger ? "gorria" : pri > adjustedConfig.thresholds.warning ? "horia" : "berdea";

  const contributions: Array<[keyof RiskFactors, number]> = [
    ["hazard", hazard * adjustedConfig.weights.hazard],
    ["vulnerability", vulnerability * adjustedConfig.weights.vulnerability],
    ["exposure", exposure * adjustedConfig.weights.exposure],
    ["value", value * adjustedConfig.weights.value]
  ];

  const sumContrib = contributions.reduce((acc, [, value]) => acc + value, 0) || 1;
  const topDrivers = contributions
    .map(([key, value]) => ({ key, contribution: value / sumContrib }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);

  return {
    siteId: site.properties.id,
    pri,
    priLabel,
    factors: { hazard, vulnerability, exposure, value },
    topDrivers,
    confidence: computeConfidence(series.serie)
  };
}

export function simulateScenario(
  result: RiskResult,
  scenario: Partial<{
    hazard: number;
    vulnerability: number;
    exposure: number;
    value: number;
  }>
): RiskResult {
  const factors: RiskFactors = {
    ...result.factors,
    ...scenario
  };
  const config = defaultRiskConfig;
  const pri =
    factors.hazard * config.weights.hazard +
    factors.vulnerability * config.weights.vulnerability +
    factors.exposure * config.weights.exposure +
    factors.value * config.weights.value;
  const priLabel = pri > config.thresholds.danger ? "gorria" : pri > config.thresholds.warning ? "horia" : "berdea";
  const contributions: Array<[keyof RiskFactors, number]> = [
    ["hazard", factors.hazard * config.weights.hazard],
    ["vulnerability", factors.vulnerability * config.weights.vulnerability],
    ["exposure", factors.exposure * config.weights.exposure],
    ["value", factors.value * config.weights.value]
  ];
  const total = contributions.reduce((acc, [, value]) => acc + value, 0) || 1;
  const topDrivers = contributions
    .map(([key, value]) => ({ key, contribution: value / total }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);
  return {
    ...result,
    pri: Math.min(1, Math.max(0, pri)),
    priLabel,
    factors,
    topDrivers
  };
}
