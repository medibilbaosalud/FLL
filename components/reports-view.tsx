"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { SiteWithRisk } from "@/lib/data";
import { formatPriSentence } from "@/lib/utils";
import { Download } from "lucide-react";

interface ReportsViewProps {
  sites: SiteWithRisk[];
}

export function ReportsView({ sites }: ReportsViewProps) {
  const [selected, setSelected] = useState(sites[0]?.feature.properties.id ?? "");

  const generatePdf = () => {
    const site = sites.find((item) => item.feature.properties.id === selected);
    if (!site) return;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`ArchéoSense txostena — ${site.feature.properties.izena}`, 40, 60);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`PRI: ${site.risk.pri.toFixed(2)} (${formatPriSentence(site.risk.pri)})`, 40, 90);
    doc.text(`Datu-konfiantza: ${site.risk.confidence}`, 40, 110);
    doc.text("Top-Drivers:", 40, 140);
    site.risk.topDrivers.forEach((driver, index) => {
      doc.text(`${index + 1}. ${driver.key} — ${(driver.contribution * 100).toFixed(0)}%`, 60, 160 + index * 18);
    });
    autoTable(doc, {
      startY: 220,
      head: [["Data", "Euri mm", "Tenperatura", "NDVI", "Deformazioa"]],
      body: site.timeSeries.serie.slice(-7).map((point) => [
        point.data,
        point.euri_mm,
        point.tenperatura_c,
        point.ndvi,
        point.deformazio_proxy
      ])
    });
    doc.save(`${site.feature.properties.id}_txostena.pdf`);
  };

  return (
    <div className="px-6 py-12">
      <div className="glass rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Txosten adimendunak</h1>
            <p className="text-sm text-white/70">Atera PDF poetiko eta zehatzak, mapa eta metrika nagusiekin.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-white/70">
              Aukeratu gunea
              <select
                className="mt-2 w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
              >
                {sites.map((site) => (
                  <option key={site.feature.properties.id} value={site.feature.properties.id}>
                    {site.feature.properties.izena}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={generatePdf}
              className="flex items-center gap-2 rounded-full bg-ozeano-500 px-4 py-2 text-sm font-semibold"
            >
              <Download className="h-4 w-4" /> Sortu PDFa
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {sites.map((site) => (
            <div key={site.feature.properties.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">{site.feature.properties.izena}</h2>
              <p className="text-sm text-white/70">PRI {site.risk.pri.toFixed(2)} — {formatPriSentence(site.risk.pri)}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {site.risk.topDrivers.map((driver) => (
                  <li key={driver.key}>
                    {driver.key}: {(driver.contribution * 100).toFixed(0)}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
