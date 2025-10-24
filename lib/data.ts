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

type SiteFeatureCollection = FeatureCollection<SiteFeature["geometry"], SiteFeature["properties"]>;

export function getSitesWithRisk(): SiteWithRisk[] {
  const featureCollection = (sites as SiteFeatureCollection) || { type: "FeatureCollection", features: [] };
  const features = featureCollection.features ?? [];
  const mapSeries = new Map<string, SiteTimeSeries>();
  const timeSeriesEntries = (series as SiteTimeSeries[]) ?? [];
  timeSeriesEntries.forEach((entry) => {
    mapSeries.set(entry.id, entry);
  });
  return features.map((feature) => {
    const safeFeature = feature.properties.sentsiblea ? preparePublicFeature(feature) : feature;
    const timeSeries = mapSeries.get(feature.properties.id);
    const fallbackSeries: SiteTimeSeries = { id: safeFeature.properties.id, serie: [] };
    const risk = calculateRisk(safeFeature, timeSeries ?? fallbackSeries);
    return {
      feature: safeFeature,
      timeSeries: timeSeries ?? fallbackSeries,
      risk
    };
  });
}
