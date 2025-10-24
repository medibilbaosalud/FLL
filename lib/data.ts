import sites from "@/data/sites.geojson" assert { type: "json" };
import series from "@/data/time_series.json" assert { type: "json" };
import { calculateRisk } from "@/lib/risk";
import { preparePublicFeature } from "@/lib/obfuscate";
import type { RiskResult, SiteFeature, SiteTimeSeries } from "@/lib/types";

export interface SiteWithRisk {
  feature: SiteFeature;
  timeSeries: SiteTimeSeries;
  risk: RiskResult;
}

export function getSitesWithRisk(): SiteWithRisk[] {
  const features = (sites.features as SiteFeature[]) || [];
  const mapSeries = new Map<string, SiteTimeSeries>();
  (series as SiteTimeSeries[]).forEach((entry) => {
    mapSeries.set(entry.id, entry);
  });
  return features.map((feature) => {
    const safeFeature = feature.properties.sentsiblea ? preparePublicFeature(feature) : feature;
    const timeSeries = mapSeries.get(feature.properties.id);
    const risk = calculateRisk(safeFeature, timeSeries ?? { id: safeFeature.properties.id, serie: [] });
    return {
      feature: safeFeature,
      timeSeries: timeSeries ?? { id: feature.properties.id, serie: [] },
      risk
    };
  });
}
