"use client";

import { useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SiteWithRisk } from "@/lib/data";
import { formatPriSentence } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const actions = [
  {
    id: "drenajea",
    izena: "Drenaje lineak garbitu",
    priDelta: -0.12,
    kostua: "ertain",
    denbora: "azkar",
    deskribapena: "Euri bolumenari aurre egiteko kanalak libre mantendu."
  },
  {
    id: "estaldura",
    izena: "Estaldura babeslea gehitu",
    priDelta: -0.08,
    kostua: "altu",
    denbora: "ertain",
    deskribapena: "Material higigarrien gaineko estalki iragazgaitza."
  },
  {
    id: "bisitariak",
    izena: "Bisitari-fluxua murriztu",
    priDelta: -0.05,
    kostua: "baxu",
    denbora: "azkar",
    deskribapena: "Ibilbide alternatiboak gomendatu eta ordutegi txandakatuak ezarri."
  }
];

export function SiteDetail({ site }: { site: SiteWithRisk }) {
  const [checked, setChecked] = useState<string[]>([]);

  const chartData = useMemo(() => {
    return site.timeSeries.serie.slice(-14).map((point) => ({
      name: point.data.slice(5),
      euri: point.euri_mm,
      tenperatura: point.tenperatura_c,
      ndvi: point.ndvi,
      deformazioa: point.deformazio_proxy
    }));
  }, [site.timeSeries.serie]);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold text-white">{site.feature.properties.izena}</h1>
          <p className="mt-2 text-sm text-white/70">{site.feature.properties.mota} · {site.feature.properties.materiala}</p>
          <p className="mt-4 text-lg text-white">
            PRI {site.risk.pri.toFixed(2)} — {formatPriSentence(site.risk.pri)}
          </p>
          <p className="text-sm text-white/60">Top-drivers:</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            {site.risk.topDrivers.map((driver) => (
              <li key={driver.key}>
                {driver.key}: {(driver.contribution * 100).toFixed(0)}%
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Evidentziak</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase text-white/60">Euri intentsitatea</p>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="euri" stroke="#3d8bff" strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={{ background: "#0b1b16", borderRadius: 12 }} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase text-white/60">NDVI</p>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="ndvi" stroke="#59a886" strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={{ background: "#0b1b16", borderRadius: 12 }} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Ekintza plana</h2>
          <ul className="mt-4 space-y-3">
            {actions.map((action) => (
              <li key={action.id} className="rounded-2xl bg-white/10 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-white/40 bg-white/10"
                    checked={checked.includes(action.id)}
                    onChange={() =>
                      setChecked((prev) =>
                        prev.includes(action.id)
                          ? prev.filter((item) => item !== action.id)
                          : [...prev, action.id]
                      )
                    }
                  />
                  <div>
                    <p className="font-semibold text-white">{action.izena}</p>
                    <p className="text-xs text-white/70">ΔPRI {action.priDelta.toFixed(2)} · Kostua {action.kostua} · Denbora {action.denbora}</p>
                    <p className="mt-1 text-xs text-white/60">{action.deskribapena}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Historia</h2>
          <p className="text-sm text-white/70">Azken 4 asteetako PRI bilakaera.</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart
              data={site.timeSeries.serie.slice(-28).map((point, index) => ({
                name: index,
                pri: site.risk.pri * 0.8 + index * 0.002
              }))}
            >
              <Line type="monotone" dataKey="pri" stroke="#ff6b6b" strokeWidth={2} dot={false} />
              <Tooltip contentStyle={{ background: "#0b1b16", borderRadius: 12 }} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {site.feature.properties.sentsiblea && (
          <p className="text-xs text-red-300">
            <CheckCircle2 className="mr-1 inline h-4 w-4" /> Gune sentsiblea — koordenatu publikoa ofuskatua eta zoom murriztua.
          </p>
        )}
      </aside>
    </div>
  );
}
