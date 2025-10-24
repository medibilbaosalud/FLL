"use client";

import { useState } from "react";
import { defaultRiskConfig } from "@/lib/risk";
import { Upload, FileDown } from "lucide-react";

export function SettingsPanel() {
  const [warning, setWarning] = useState(defaultRiskConfig.thresholds.warning);
  const [danger, setDanger] = useState(defaultRiskConfig.thresholds.danger);

  const exportConfig = () => {
    const data = {
      thresholds: { warning, danger },
      presets: defaultRiskConfig.presets
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "archeosense-konfigurazioa.json";
    link.click();
  };

  return (
    <div className="px-6 py-12">
      <div className="glass rounded-3xl p-8 space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Ezarpen aurreratuak</h1>
          <p className="text-sm text-white/70">Tolerantziak, presetak eta datu trukeak kudeatu.</p>
        </header>
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Atalaseak</h2>
            <label className="mt-4 block text-sm text-white/70">
              Abisu maila (horia)
              <input
                type="number"
                step="0.05"
                min={0}
                max={1}
                value={warning}
                onChange={(event) => setWarning(Number(event.target.value))}
                className="mt-2 w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm"
              />
            </label>
            <label className="mt-4 block text-sm text-white/70">
              Arrisku gorria
              <input
                type="number"
                step="0.05"
                min={0}
                max={1}
                value={danger}
                onChange={(event) => setDanger(Number(event.target.value))}
                className="mt-2 w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Import / Export</h2>
            <button className="flex items-center gap-2 rounded-full bg-ozeano-500 px-4 py-2 text-sm font-semibold" onClick={exportConfig}>
              <FileDown className="h-4 w-4" /> Exportatu presetak
            </button>
            <label className="flex items-center gap-2 text-sm text-white/80">
              <Upload className="h-4 w-4" />
              <input type="file" accept=".json,.csv,.geojson" className="hidden" />
              <span>Inportatu CSV/GeoJSON (Arches bateragarritasuna)</span>
            </label>
            <p className="text-xs text-white/60">
              Oinarrizko field mapping: name → izena, type → mota, material → materiala, sensitive → sentsiblea, value → balioa, geometry → kokalekua.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
