"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { SiteMap } from "@/components/map/site-map";
import { useRiskStore } from "@/hooks/use-risk-store";
import { formatPriSentence } from "@/lib/utils";
import type { SiteWithRisk } from "@/lib/data";
import { ArrowUpRight, ArrowRight, ArrowDownRight } from "lucide-react";

interface MapDashboardProps {
  sites: SiteWithRisk[];
}

function getTrend(site: SiteWithRisk): "up" | "flat" | "down" {
  const serie = site.timeSeries.serie.slice(-7);
  if (serie.length < 2) return "flat";
  const first = serie[0];
  const last = serie[serie.length - 1];
  const diff = last.deformazio_proxy + last.euri_mm / 100 - (first.deformazio_proxy + first.euri_mm / 100);
  if (diff > 0.12) return "up";
  if (diff < -0.08) return "down";
  return "flat";
}

function TrendIcon({ trend }: { trend: ReturnType<typeof getTrend> }) {
  if (trend === "up") {
    return <ArrowUpRight className="h-4 w-4 text-red-400" aria-label="Joera goranzkoa" />;
  }
  if (trend === "down") {
    return <ArrowDownRight className="h-4 w-4 text-emerald-300" aria-label="Joera beheranzkoa" />;
  }
  return <ArrowRight className="h-4 w-4 text-white/60" aria-label="Joera egonkorra" />;
}

export function MapDashboard({ sites }: MapDashboardProps) {
  const { setResults, results, filters, updateFilters, timeWindow, setTimeWindow } = useRiskStore();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setResults(sites.map((site) => site.risk));
  }, [setResults, sites]);

  const getWindowPri = useCallback((site: SiteWithRisk) => {
    const base = results[site.feature.properties.id] ?? site.risk;
    const windowSerie = site.timeSeries.serie.slice(-timeWindow);
    if (!windowSerie.length) return base.pri;
    const windowRain = windowSerie.reduce((acc, point) => acc + point.euri_mm, 0) / windowSerie.length;
    const fullRain = site.timeSeries.serie.slice(-30).reduce((acc, point) => acc + point.euri_mm, 0) / Math.max(site.timeSeries.serie.slice(-30).length, 1);
    const adjustment = (windowRain - fullRain) / 180;
    return Math.min(1, Math.max(0, base.pri + adjustment));
  }, [results, timeWindow]);

  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const { properties } = site.feature;
      if (filters.hideSensitive && properties.sentsiblea) return false;
      if (filters.mota && properties.mota !== filters.mota) return false;
      if (filters.materiala && properties.materiala !== filters.materiala) return false;
      if (filters.bioma && properties.bioma !== filters.bioma) return false;
      const pri = getWindowPri(site);
      if (filters.priRange) {
        if (pri < filters.priRange[0] || pri > filters.priRange[1]) return false;
      }
      if (search && !properties.izena.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filters, getWindowPri, search, sites]);

  const sorted = useMemo(() => {
    return [...filteredSites].sort((a, b) => getWindowPri(b) - getWindowPri(a));
  }, [filteredSites, getWindowPri]);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:flex-row">
      <div className="flex-1 space-y-6">
        <div className="glass rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Mapa sentikorra</h1>
              <p className="text-sm text-white/70">{sites.length} gune monitorizatu — PRI eguneratua denbora errealean.</p>
            </div>
            <label className="flex flex-col text-xs uppercase tracking-wide text-white/60">
              Denbora leihoa
              <input
                type="range"
                min={7}
                max={30}
                value={timeWindow}
                onChange={(event) => setTimeWindow(Number(event.target.value) as 7 | 14 | 30)}
                className="mt-2"
                aria-valuemin={7}
                aria-valuemax={30}
              />
            </label>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="search">
                {t("filters.search")}
              </label>
              <input
                id="search"
                className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-ozeano-400 focus:outline-none"
                placeholder="Bilatu izenez edo motaz"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-white/60">{t("filters.material")}</label>
              <select
                className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/80"
                value={filters.materiala ?? ""}
                onChange={(event) =>
                  updateFilters({ materiala: event.target.value ? event.target.value : undefined })
                }
              >
                <option value="">Guztiak</option>
                <option value="piedra">Harria</option>
                <option value="adobe">Adobea</option>
                <option value="madera">Zura</option>
                <option value="metal">Metala</option>
                <option value="nahasia">Nahasia</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-white/60">{t("filters.sensitive")}</label>
              <button
                type="button"
                className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                onClick={() => updateFilters({ hideSensitive: !filters.hideSensitive })}
              >
                {filters.hideSensitive ? "Erakutsi" : "Ezkutatu"}
              </button>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-white/15 bg-white/5"
        >
          <SiteMap
            features={filteredSites.map((site) => site.feature)}
            priBySite={Object.fromEntries(
              filteredSites.map((site) => [site.feature.properties.id, getWindowPri(site)])
            )}
          />
        </motion.div>
      </div>
      <aside className="w-full max-w-md space-y-4">
        <div className="glass rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white">Lehentasun laburra</h2>
          <p className="text-sm text-white/70">PRI altuenak eta joerak, lehen ekintzetarako.</p>
          <ul className="mt-6 space-y-4">
            {sorted.slice(0, 6).map((site) => {
              const pri = getWindowPri(site);
              const trend = getTrend(site);
              return (
                <li key={site.feature.properties.id} className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                  <div>
                    <Link href={`/app/site/${site.feature.properties.id}`} className="text-sm font-semibold text-white hover:text-ozeano-200">
                      {site.feature.properties.izena}
                    </Link>
                    <p className="text-xs text-white/60">PRI {pri.toFixed(2)}</p>
                    <p className="mt-2 text-xs text-white/60">{formatPriSentence(pri)}</p>
                  </div>
                  <TrendIcon trend={trend} />
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
