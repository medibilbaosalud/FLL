import type { FeatureCollection } from "geojson";
import sites from "@/data/sites.geojson";
import series from "@/data/time_series.json";
import { calculateRisk } from "@/lib/risk";
import { preparePublicFeature } from "@/lib/obfuscate";
import type { RiskResult, SiteFeature, SiteTimeSeries } from "@/lib/types";

export interface SiteWithRisk {
  feature: SiteFeature;
  timeSeries: SiteTimeSeries;
  risk: RiskResult;
}

type SiteFeatureCollection = FeatureCollection<
  SiteFeature["geometry"],
  SiteFeature["properties"]
>;

function toFeatureCollection(raw: unknown): SiteFeatureCollection {
  const fallback: SiteFeatureCollection = { type: "FeatureCollection", features: [] };
  if (!raw || typeof raw !== "object") {
    return fallback;
  }
  const candidate = raw as Partial<SiteFeatureCollection>;
  if (!Array.isArray(candidate.features)) {
    return fallback;
  }
  return candidate as SiteFeatureCollection;
}

function toTimeSeriesMap(entries: unknown): Map<string, SiteTimeSeries> {
  const map = new Map<string, SiteTimeSeries>();
  if (!Array.isArray(entries)) {
    return map;
  }
  (entries as SiteTimeSeries[]).forEach((entry) => {
    if (entry && typeof entry.id === "string") {
      map.set(entry.id, entry);
    }
  });
  return map;
}

export function getSitesWithRisk(): SiteWithRisk[] {
  const featureCollection = toFeatureCollection(sites);
  const features = featureCollection.features ?? [];
  const seriesMap = toTimeSeriesMap(series);

  return features.map((feature) => {
    const safeFeature = feature.properties.sentsiblea
      ? preparePublicFeature(feature)
      : feature;

    const timeSeries = seriesMap.get(feature.properties.id);
    const fallbackSeries: SiteTimeSeries = { id: feature.properties.id, serie: [] };
    const resolvedSeries = timeSeries ?? fallbackSeries;
    const risk = calculateRisk(safeFeature, resolvedSeries);

    return {
      feature: safeFeature,
      timeSeries: resolvedSeries,
      risk,
    };
  });
}
