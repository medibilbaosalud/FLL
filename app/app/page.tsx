"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import dynamicImport from "next/dynamic";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { KpiCard } from "components/ui/kpi-card";
import { Section } from "components/ui/section";
import { Skeleton } from "components/ui/skeleton";
import { MapControls } from "components/map/controls";

const SiteMap = dynamicImport(() => import("components/map/site-map"), {
  ssr: false,
  loading: () => <Skeleton style={{ height: 420, width: "100%" }} />,
});

const KPI_DATA = [
  { title: "Guneak", value: "42", hint: "+3 aste honetan" },
  { title: "Arrisku altua", value: "7", hint: "3 ↗ alerta" },
  { title: "Alerta aktiboak", value: "3", hint: "Azken 48 orduak" },
  { title: "Azken eguneraketa", value: "Duela 2h", hint: "Lan taldearen jarduera" },
];

const ALERTS = [
  { id: 1, title: "Itsaslabarretako erorketak", meta: "Kostaldea · PRI 0.74 · Azkar ekin" },
  { id: 2, title: "Ibai ertzeko uholde arriskua", meta: "Ibarbidea · PRI 0.68 · Zaindu drainatzea" },
  { id: 3, title: "Turismo presioa igota", meta: "Hirigunea · PRI 0.63 · Bisita kontrola" },
  { id: 4, title: "Lur hezetasun anomalia", meta: "Basoa · PRI 0.52 · Monitorizazioa" },
  { id: 5, title: "Deformazio seinale berria", meta: "Gailurra · PRI 0.49 · Balioztatu InSAR" },
];

export default function AppHome() {
  return (
    <div className="dashboard-stack">
      <Section
        actions={<Badge tone="neutral">Demo fasea</Badge>}
        desc="Egungo egoeraren laburpena eta erantzun azkarra"
        title="Hasiera-panela"
      >
        <div className="kpi-grid">
          {KPI_DATA.map((item) => (
            <KpiCard hint={item.hint} key={item.title} title={item.title} value={item.value} />
          ))}
        </div>
      </Section>
      <div className="dashboard-grid">
        <Section
          actions={
            <Button onClick={() => console.log("[txostenak] esportatu egoera")} type="button" variant="ghost">
              Esportatu egoera
            </Button>
          }
          desc="Mapa interaktiboa eta arrisku iragazkiak"
          id="mapa"
          title="Mapa operatiboa"
        >
          <div className="map-layout">
            <div className="section-card glass hairline" style={{ padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1rem", fontWeight: 600 }}>Kontrolak</h3>
              <MapControls />
            </div>
            <div className="map-panel">
              <SiteMap />
            </div>
          </div>
        </Section>
        <Section desc="Azken mugimendu nabarmenen erregistroa" title="Azken alertak">
          <ul className="alert-list">
            {ALERTS.map((alert) => (
              <li className="alert-item" key={alert.id}>
                <p className="alert-title">{alert.title}</p>
                <p className="alert-meta">{alert.meta}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
