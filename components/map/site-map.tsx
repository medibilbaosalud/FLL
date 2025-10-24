"use client";

import { useEffect, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { SiteFeature } from "@/lib/types";
import { formatPriLabel } from "@/lib/utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export interface SiteMapProps {
  features: SiteFeature[];
  priBySite: Record<string, number>;
}

export function SiteMap({ features, priBySite }: SiteMapProps) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const containerId = useMemo(() => `map-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    if (!map && typeof window !== "undefined") {
      const maxZoomLimit = features.reduce((acc, feature) => Math.min(acc, (feature as any).maxZoom ?? 22), 22);
      const created = new mapboxgl.Map({
        container: containerId,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-1.98, 43.1],
        zoom: 6.5,
        maxZoom: maxZoomLimit
      });
      created.addControl(new mapboxgl.NavigationControl());
      created.on("load", () => {
        created.addSource("sites", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: features.map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              pri: priBySite[feature.properties.id] ?? 0
            }
          }))
          }
        });
        created.addLayer({
          id: "sites-heat",
          type: "heatmap",
          source: "sites",
          paint: {
            "heatmap-weight": ["get", "pri"],
            "heatmap-radius": 30,
            "heatmap-opacity": 0.35
          }
        });
        created.addLayer({
          id: "sites-circle",
          type: "circle",
          source: "sites",
          paint: {
            "circle-radius": 8,
            "circle-color": [
              "case",
              ["<", ["get", "pri"], 0.3],
              "#3b8f6e",
              ["<", ["get", "pri"], 0.6],
              "#f3c969",
              "#ff6b6b"
            ],
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff"
          }
        });
      });
      setMap(created);
    }
  }, [containerId, features, map]);

  useEffect(() => {
    if (!map) return;
    const maxZoomLimit = features.reduce((acc, feature) => Math.min(acc, (feature as any).maxZoom ?? acc), 22);
    map.setMaxZoom(maxZoomLimit);
    const geojson = {
      type: "FeatureCollection" as const,
      features: features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          pri: priBySite[feature.properties.id] ?? 0
        }
      }))
    };
    const source = map.getSource("sites") as mapboxgl.GeoJSONSource | undefined;
    if (source) {
      source.setData(geojson as any);
    }
  }, [features, map, priBySite]);

  useEffect(() => {
    if (!map) return;
    const handler = (event: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
      const feature = event.features?.[0];
      if (!feature) return;
      const pri = feature.properties?.pri ?? 0;
      new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(
          `<div style="font-family:Inter,sans-serif;color:#0b1b16"><strong>${feature.properties?.izena}</strong><br/>PRI: ${pri.toFixed(
            2
          )} (${formatPriLabel(pri)})</div>`
        )
        .addTo(map);
    };
    map.on("click", "sites-circle", handler);
    return () => {
      map.off("click", "sites-circle", handler);
    };
  }, [map]);

  return <div id={containerId} className="h-[540px] w-full rounded-3xl border border-white/15" role="presentation" />;
}
