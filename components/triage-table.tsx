"use client";

import { useMemo, useState } from "react";
import { useRiskStore } from "@/hooks/use-risk-store";
import type { SiteWithRisk } from "@/lib/data";
import { formatPriSentence } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, ListTodo, FlaskConical } from "lucide-react";

interface TriageTableProps {
  sites: SiteWithRisk[];
}

const columns = ["Gunea", "PRI", "Denbora gorriz", "Datu-konfiantza", "Ekintzak"] as const;

export function TriageTable({ sites }: TriageTableProps) {
  const { results } = useRiskStore();
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    return sites.map((site) => {
      const risk = results[site.feature.properties.id] ?? site.risk;
      return {
        id: site.feature.properties.id,
        izena: site.feature.properties.izena,
        pri: risk.pri,
        confidence: risk.confidence,
        redWeeks: Math.round(risk.pri * 4),
        narrative: formatPriSentence(risk.pri)
      };
    });
  }, [results, sites]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="px-6 py-12">
      <div className="glass rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Lehentasun taula osoa</h1>
            <p className="text-sm text-white/70">Egin bulk-ekintzak eta planifikatu ikuskapenak.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-full bg-ozeano-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-ozeano-500/40">
              <ListTodo className="h-4 w-4" /> Zerrendatu ikuskapena
            </button>
            <button className="flex items-center gap-2 rounded-full bg-baso-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-baso-500/30">
              <Download className="h-4 w-4" /> Txostena sortu
            </button>
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <FlaskConical className="h-4 w-4" /> Eszenario Laborategia
            </button>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="w-14 p-3" aria-label="Aukeratu" />
                {columns.map((column) => (
                  <th key={column} className="p-3">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-white/5 bg-white/[0.04] text-white"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      aria-label={`${row.izena} aukeratu`}
                      checked={selected.includes(row.id)}
                      onChange={() => toggle(row.id)}
                      className="h-4 w-4 rounded border-white/30 bg-white/10"
                    />
                  </td>
                  <td className="p-3 text-sm font-semibold">{row.izena}</td>
                  <td className="p-3 text-sm">{row.pri.toFixed(2)}</td>
                  <td className="p-3 text-sm">{row.redWeeks} aste</td>
                  <td className="p-3 text-sm capitalize">{row.confidence}</td>
                  <td className="p-3 text-xs text-white/70">{row.narrative}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
