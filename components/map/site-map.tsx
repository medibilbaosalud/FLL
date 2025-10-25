"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type {
  GeoJSONSource,
  Map as MapLibreMap,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  StyleSpecification,
} from "maplibre-gl";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Sheet } from "components/ui/sheet";
import { useRiskStore } from "hooks/use-risk-store";

interface SiteProperties {
  id: string;
  name: string;
  risk?: number;
  biome?: string;
  description?: string;
}

interface TooltipState {
  x: number;
  y: number;
  name: string;
  risk: number;
}

const defaultStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap ekarpenak",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

const mapStyle = (() => {
  const style = process.env.NEXT_PUBLIC_MAP_STYLE;
  if (!style) {
    return defaultStyle;
  }
  try {
    return style.trim().startsWith("{") ? (JSON.parse(style) as StyleSpecification) : style;
  } catch (error) {
    console.warn("[map] Ezin izan da estilo pertsonalizatua irakurri", error);
    return defaultStyle;
  }
})();

function featureToSite(feature?: MapGeoJSONFeature): SiteProperties | null {
  if (!feature) {
    return null;
  }
  const props = feature.properties ?? {};
  const risk = Number(props.risk ?? props.PRI ?? 0);
  return {
    id: String(props.id ?? ""),
    name: String(props.name ?? props.izena ?? "Kokapena"),
    risk: Number.isFinite(risk) ? risk : 0,
    biome: typeof props.biome === "string" ? props.biome : undefined,
    description: typeof props.description === "string" ? props.description : undefined,
  };
}

function riskTone(risk: number) {
  if (risk >= 66) return "danger" as const;
  if (risk >= 33) return "warning" as const;
  return "success" as const;
}

export default function SiteMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [selected, setSelected] = useState<SiteProperties | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { riskMin, layers } = useRiskStore((state) => ({ riskMin: state.riskMin, layers: state.layers }));
  const filtersRef = useRef({ riskMin, layers });

  useEffect(() => {
    filtersRef.current = { riskMin, layers };
  }, [layers, riskMin]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || mapRef.current) {
      return;
    }

    let cancelled = false;
    let map: MapLibreMap | null = null;

    let loadHandler: (() => void) | null = null;
    let clusterClick: ((event: MapLayerMouseEvent) => void) | null = null;
    let pointClick: ((event: MapLayerMouseEvent) => void) | null = null;
    let pointEnter: ((event: MapLayerMouseEvent) => void) | null = null;
    let pointMove: ((event: MapLayerMouseEvent) => void) | null = null;
    let pointLeave: (() => void) | null = null;
    let errorListener: ((evt: { error?: Error }) => void) | null = null;

    (async () => {
      try {
        const maplibre = await import("maplibre-gl");
        const { Map, NavigationControl } = maplibre;

        map = new Map({
          container: containerRef.current as HTMLDivElement,
          style: mapStyle as StyleSpecification | string,
          center: [-2.2, 43.1],
          zoom: 4.5,
          attributionControl: true,
        }) as MapLibreMap;

        mapRef.current = map;
        setError(null);

        map.addControl(new NavigationControl({ visualizePitch: true }), "top-right");

        loadHandler = async () => {
          try {
            const response = await fetch("/data/sites.geojson");
            if (!response.ok) {
              throw new Error(`GeoJSON kargak ${response.status} kodea itzuli du`);
            }
            const geojson = await response.json();

            const { riskMin: initialRisk, layers: initialLayers } = filtersRef.current;

            if (!map?.getSource("sites")) {
              map?.addSource("sites", {
                type: "geojson",
                data: geojson,
                cluster: true,
                clusterRadius: 40,
              });
            } else {
              (map.getSource("sites") as GeoJSONSource).setData(geojson);
            }

            if (!map?.getLayer("site-clusters")) {
              map?.addLayer({
                id: "site-clusters",
                type: "circle",
                source: "sites",
                filter: ["has", "point_count"],
                paint: {
                  "circle-color": "#6366f1",
                  "circle-radius": ["step", ["get", "point_count"], 20, 10, 28, 25, 34],
                  "circle-opacity": 0.82,
                },
              });
            }

            if (!map?.getLayer("site-cluster-count")) {
              map?.addLayer({
                id: "site-cluster-count",
                type: "symbol",
                source: "sites",
                filter: ["has", "point_count"],
                layout: {
                  "text-field": ["get", "point_count_abbreviated"],
                  "text-size": 14,
                },
                paint: { "text-color": "#1e1b4b" },
              });
            }

            if (!map?.getLayer("site-points")) {
              map?.addLayer({
                id: "site-points",
                type: "circle",
                source: "sites",
                filter: ["!", ["has", "point_count"]],
                paint: {
                  "circle-color": [
                    "case",
                    ["<", ["coalesce", ["get", "risk"], 0], 33],
                    "#16a34a",
                    ["<", ["coalesce", ["get", "risk"], 0], 66],
                    "#f59e0b",
                    "#dc2626",
                  ],
                  "circle-radius": 10,
                  "circle-stroke-width": 1.5,
                  "circle-stroke-color": "white",
                  "circle-opacity": 0.92,
                },
              });
            }

            const clusterVisibility = initialLayers.clusters ? "visible" : "none";
            map?.setLayoutProperty("site-clusters", "visibility", clusterVisibility);
            map?.setLayoutProperty("site-cluster-count", "visibility", clusterVisibility);
            map?.setLayoutProperty("site-points", "visibility", initialLayers.points ? "visible" : "none");
            map?.setFilter("site-points", [
              "all",
              ["!", ["has", "point_count"]],
              [">=", ["coalesce", ["get", "risk"], 0], initialRisk],
            ]);
          } catch (loadError) {
            console.error("[map] Ezin izan da GeoJSON kargatu", loadError);
            if (!cancelled) {
              setError(loadError instanceof Error ? loadError.message : "GeoJSON kargak huts egin du");
            }
          }
        };

        map.on("load", loadHandler);

        clusterClick = (event: MapLayerMouseEvent) => {
          const features = map?.queryRenderedFeatures(event.point, { layers: ["site-clusters"] }) ?? [];
          const clusterFeature = features[0];
          if (!map || !clusterFeature) return;
          const source = map.getSource("sites") as GeoJSONSource;
          const clusterId = clusterFeature.properties?.cluster_id;
          if (!source || typeof clusterId !== "number") return;
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || typeof zoom !== "number") return;
            const coords =
              clusterFeature.geometry?.type === "Point"
                ? (clusterFeature.geometry.coordinates as [number, number])
                : undefined;
            map.easeTo({ center: coords ?? event.lngLat, zoom });
          });
        };

        pointClick = (event: MapLayerMouseEvent) => {
          const feature = event.features?.[0];
          const site = featureToSite(feature as MapGeoJSONFeature);
          if (!site) return;
          setSelected(site);
        };

        pointEnter = (event: MapLayerMouseEvent) => {
          if (!map) return;
          map.getCanvas().style.cursor = "pointer";
          const feature = event.features?.[0];
          const site = featureToSite(feature as MapGeoJSONFeature);
          if (!site) {
            setTooltip(null);
            return;
          }
          setTooltip({ x: event.point.x, y: event.point.y, name: site.name, risk: site.risk ?? 0 });
        };

        pointMove = (event: MapLayerMouseEvent) => {
          const feature = event.features?.[0];
          if (!feature) return;
          const site = featureToSite(feature as MapGeoJSONFeature);
          if (!site) return;
          setTooltip({ x: event.point.x, y: event.point.y, name: site.name, risk: site.risk ?? 0 });
        };

        pointLeave = () => {
          if (map) {
            map.getCanvas().style.cursor = "";
          }
          setTooltip(null);
        };

        map.on("click", "site-clusters", clusterClick);
        map.on("click", "site-points", pointClick);
        map.on("mouseenter", "site-points", pointEnter);
        map.on("mousemove", "site-points", pointMove);
        map.on("mouseleave", "site-points", pointLeave);

        errorListener = (evt: { error?: Error }) => {
          if (!cancelled && evt?.error) {
            console.error("[map] runtime error", evt.error);
            setError(evt.error.message ?? "Maparen errore ezezaguna");
          }
        };

        map.on("error", errorListener as () => void);
      } catch (initError) {
        console.error("[map] inicializazioak huts egin du", initError);
        if (!cancelled) {
          setError(initError instanceof Error ? initError.message : "Mapa ezin izan da abiarazi");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (map) {
        if (loadHandler) {
          map.off("load", loadHandler);
        }
        if (clusterClick) {
          map.off("click", "site-clusters", clusterClick);
        }
        if (pointClick) {
          map.off("click", "site-points", pointClick);
        }
        if (pointEnter) {
          map.off("mouseenter", "site-points", pointEnter);
        }
        if (pointMove) {
          map.off("mousemove", "site-points", pointMove);
        }
        if (pointLeave) {
          map.off("mouseleave", "site-points", pointLeave);
        }
        if (errorListener) {
          map.off("error", errorListener as () => void);
        }
        map.remove();
      }
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const applyLayers = () => {
      const visibility = layers.clusters ? "visible" : "none";
      if (map.getLayer("site-clusters")) {
        map.setLayoutProperty("site-clusters", "visibility", visibility);
      }
      if (map.getLayer("site-cluster-count")) {
        map.setLayoutProperty("site-cluster-count", "visibility", visibility);
      }
      if (map.getLayer("site-points")) {
        map.setLayoutProperty("site-points", "visibility", layers.points ? "visible" : "none");
        map.setFilter("site-points", [
          "all",
          ["!", ["has", "point_count"]],
          [">=", ["coalesce", ["get", "risk"], 0], riskMin],
        ]);
      }
    };

    if (map.isStyleLoaded()) {
      applyLayers();
      return;
    }

    const applyOnce = () => {
      applyLayers();
      map.off("load", applyOnce);
    };

    map.on("load", applyOnce);
    return () => {
      map.off("load", applyOnce);
    };
  }, [layers, riskMin]);

  const tooltipStyle = tooltip
    ? {
        left: tooltip.x,
        top: tooltip.y,
      }
    : undefined;

  const badgeTone = riskTone(selected?.risk ?? 0);

  if (error) {
    return (
      <div className="map-wrapper card" role="alert" style={{ minHeight: "420px", padding: "1.5rem" }}>
        <h3 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Mapa ezin da kargatu</h3>
        <p style={{ margin: 0, color: "#334155" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="map-wrapper" style={{ minHeight: "420px" }}>
      <div className="map-container" ref={containerRef} role="img" aria-label="Arrisku mapa interaktiboa" />
      {tooltip ? (
        <div className="map-tooltip" style={tooltipStyle}>
          <strong>{tooltip.name}</strong>
          <div>PRI: {tooltip.risk}</div>
        </div>
      ) : null}
      <Sheet
        onClose={() => setSelected(null)}
        open={Boolean(selected)}
        title={selected?.name ?? "Gunea"}
      >
        {selected ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Badge tone={badgeTone}>Arrisku maila: {selected.risk}</Badge>
            {selected.biome ? <p style={{ margin: 0 }}>Bioma: {selected.biome}</p> : null}
            {selected.description ? <p style={{ margin: 0 }}>{selected.description}</p> : null}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href={`/app/site/${selected.id}`}>
                <Button type="button" variant="primary">
                  Ireki fitxa
                </Button>
              </Link>
              <Button onClick={() => console.log("[triage]", selected.id)} type="button" variant="ghost">
                Markatu Triage
              </Button>
            </div>
          </div>
        ) : null}
      </Sheet>
    </div>
  );
}
