"use client";

import { Button } from "components/ui/button";
import { useLanguage } from "components/providers/language-context";
import { useRiskStore } from "hooks/use-risk-store";

export function MapControls() {
  const { riskMin, layers, setRiskMin, toggleLayer } = useRiskStore((state) => state);
  const { language } = useLanguage();

  const labels = language === "es"
    ? {
        threshold: "Mínimo de riesgo",
        clusters: "Clusters",
        points: "Puntos individuales",
        reset: "Restablecer filtro",
      }
    : {
        threshold: "Gutxieneko arriskua",
        clusters: "Cluster geruza",
        points: "Puntu zehatzak",
        reset: "Iragazkia berrezarri",
      };

  return (
    <div className="map-controls">
      <label htmlFor="risk-threshold">
        <span>
          {labels.threshold}: {riskMin}
        </span>
        <input
          id="risk-threshold"
          max={100}
          min={0}
          onChange={(event) => setRiskMin(Number(event.target.value))}
          step={1}
          type="range"
          value={riskMin}
        />
      </label>
      <label className="toggle-row">
        <span>{labels.clusters}</span>
        <input checked={layers.clusters} onChange={() => toggleLayer("clusters")} type="checkbox" />
      </label>
      <label className="toggle-row">
        <span>{labels.points}</span>
        <input checked={layers.points} onChange={() => toggleLayer("points")} type="checkbox" />
      </label>
      <Button onClick={() => setRiskMin(0)} type="button" variant="soft">
        {labels.reset}
      </Button>
    </div>
  );
}
