"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { simulateScenario } from "@/lib/risk";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { SiteWithRisk } from "@/lib/data";
import { useRiskStore } from "@/hooks/use-risk-store";
import { BarChart2, Save } from "lucide-react";

const presets = [
  {
    id: "ekaitza",
    label: "7 eguneko ekaitza",
    adjustments: {
      hazard: 0.85,
      exposure: 0.6,
      vulnerability: 0.7
    }
  },
  {
    id: "turismoa",
    label: "Gailurreko turismoa",
    adjustments: {
      hazard: 0.55,
      exposure: 0.9
    }
  },
  {
    id: "uda-lehorra",
    label: "Uda lehorra",
    adjustments: {
      hazard: 0.3,
      vulnerability: 0.65
    }
  }
];

interface ScenarioLabProps {
  sites: SiteWithRisk[];
}

export function ScenarioLab({ sites }: ScenarioLabProps) {
  const { results } = useRiskStore();
  const [activeSite, setActiveSite] = useState(sites[0]?.feature.properties.id ?? "");
  const [customHazard, setCustomHazard] = useState(0);
  const [customVisitors, setCustomVisitors] = useState(0);
  const debouncedHazard = useDebouncedValue(customHazard, 150);
  const debouncedVisitors = useDebouncedValue(customVisitors, 150);
  const [messages, setMessages] = useState<string[]>([]);

  const current = useMemo(() => {
    const site = sites.find((item) => item.feature.properties.id === activeSite) ?? sites[0];
    if (!site) return undefined;
    const base = results[site.feature.properties.id] ?? site.risk;
    const adjusted = simulateScenario(base, {
      hazard: Math.min(1, Math.max(0, base.factors.hazard + debouncedHazard)),
      exposure: Math.min(1, Math.max(0, base.factors.exposure + debouncedVisitors * 0.1))
    });
    return {
      site,
      base,
      adjusted
    };
  }, [activeSite, debouncedHazard, debouncedVisitors, results, sites]);

  return (
    <div className="px-6 py-12">
      <div className="glass rounded-3xl p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Eszenario laborategia</h1>
            <p className="text-sm text-white/70">
              Aldatu euri intentsitatea, bisitari kopurua eta bestelako faktoreak 150 ms debounce batekin eragina ikusteko.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
                onClick={() => {
                  if (!current) return;
                  const scenario = simulateScenario(current.base, preset.adjustments);
                  setMessages((prev) => [
                    `"${current.site.feature.properties.izena}" gunean ${preset.label} aplikatuta PRI ${scenario.pri.toFixed(
                      2
                    )} da`,
                    ...prev
                  ]);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <label className="block text-sm text-white/70">
              Aukeratu gunea
              <select
                className="mt-2 w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm"
                value={activeSite}
                onChange={(event) => setActiveSite(event.target.value)}
              >
                {sites.map((site) => (
                  <option key={site.feature.properties.id} value={site.feature.properties.id}>
                    {site.feature.properties.izena}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">Doitu parametroak</h2>
              <div className="mt-4 space-y-4">
                <label className="block text-sm text-white/70">
                  Euria (%)
                  <input
                    type="range"
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    value={customHazard}
                    onChange={(event) => setCustomHazard(Number(event.target.value))}
                    className="mt-2 w-full"
                  />
                </label>
                <label className="block text-sm text-white/70">
                  Bisitariak (%)
                  <input
                    type="range"
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    value={customVisitors}
                    onChange={(event) => setCustomVisitors(Number(event.target.value))}
                    className="mt-2 w-full"
                  />
                </label>
              </div>
            </div>
          </div>
          {current && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/15 bg-white/5 p-6"
            >
              <h2 className="text-lg font-semibold text-white">Eszenarioaren eragina</h2>
              <p className="text-sm text-white/60">
                Oinarrizko PRI: {current.base.pri.toFixed(2)} → Eszenarioa: {current.adjusted.pri.toFixed(2)}
              </p>
              <div className="mt-6 space-y-4">
                {current.adjusted.topDrivers.map((driver) => (
                  <div key={driver.key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>{driver.key}</span>
                      <span>{(driver.contribution * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-ozeano-400"
                        style={{ width: `${driver.contribution * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 flex items-center gap-2 rounded-full bg-ozeano-500 px-4 py-2 text-sm font-semibold">
                <Save className="h-4 w-4" /> Gorde eszenarioa
              </button>
            </motion.div>
          )}
        </div>
        {messages.length > 0 && (
          <div className="mt-8 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Eszenarioen egunkaria
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {messages.map((message, index) => (
                <li key={index} className="rounded-full bg-white/10 px-4 py-2">
                  <BarChart2 className="mr-2 inline h-4 w-4" /> {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
