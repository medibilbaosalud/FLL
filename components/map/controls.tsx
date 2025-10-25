"use client";

import { Button } from "components/ui/button";
import { useRiskStore } from "hooks/use-risk-store";

export function MapControls() {
  const { riskMin, layers, setRiskMin, toggleLayer } = useRiskStore((state) => state);

  return (
    <div className="map-controls">
      <label htmlFor="risk-threshold">
        <span>Gutxieneko arrisku balioa: {riskMin}</span>
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
        <span>Cluster geruza</span>
        <input
          checked={layers.clusters}
          onChange={() => toggleLayer("clusters")}
          type="checkbox"
        />
      </label>
      <label className="toggle-row">
        <span>Puntu zehatzak</span>
        <input
          checked={layers.points}
          onChange={() => toggleLayer("points")}
          type="checkbox"
        />
      </label>
      <Button onClick={() => setRiskMin(0)} type="button" variant="soft">
        Berrezarri iragazkia
      </Button>
    </div>
  );
}
