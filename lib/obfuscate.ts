import type { SiteFeature } from "@/lib/types";

export interface ObfuscationOptions {
  jitterMeters?: number;
  maxZoom?: number;
}

const METERS_PER_DEGREE = 111_320;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function obfuscateCoordinate([
  lon,
  lat
]: [number, number], jitterMeters = 120): [number, number] {
  const jitterDegrees = jitterMeters / METERS_PER_DEGREE;
  const newLon = lon + randomBetween(-jitterDegrees, jitterDegrees);
  const newLat = lat + randomBetween(-jitterDegrees, jitterDegrees);
  return [Number(newLon.toFixed(6)), Number(newLat.toFixed(6))];
}

export function preparePublicFeature(
  feature: SiteFeature,
  options: ObfuscationOptions = {}
): SiteFeature & { maxZoom?: number } {
  if (!feature.properties.sentsiblea) {
    return feature;
  }
  const jitter = options.jitterMeters ?? 150;
  return {
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: obfuscateCoordinate(feature.geometry.coordinates, jitter)
    },
    properties: {
      ...feature.properties,
      izena: `${feature.properties.izena} (ikuspegi publikoa)`
    },
    maxZoom: options.maxZoom ?? 13
  };
}
