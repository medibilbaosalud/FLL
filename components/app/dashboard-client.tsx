"use client";

import dynamicImport from "next/dynamic";
import { useCallback } from "react";

import { useLanguage } from "components/providers/language-context";
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

const COPY = {
  es: {
    statusBadge: "Modo demo",
    overviewDesc: "Resumen actual y próximas acciones prioritarias",
    overviewTitle: "Panel general",
    mapDesc: "Mapa interactivo y controles de riesgo",
    mapTitle: "Mapa operativo",
    exportLabel: "Exportar estado",
    alertsTitle: "Alertas recientes",
    alertsDesc: "Registro rápido de lo que ha cambiado en las últimas horas",
    kpis: [
      { title: "Sitios monitorizados", value: "42", hint: "+3 esta semana" },
      { title: "Riesgo alto", value: "7", hint: "3 ↗ en rojo" },
      { title: "Alertas activas", value: "3", hint: "Últimas 48 h" },
      { title: "Última revisión", value: "Hace 2 h", hint: "Equipo técnico" },
    ],
    alerts: [
      { id: 1, title: "Oleaje extremo", meta: "Costa · PRI 0.74 · Revisión urgente" },
      { id: 2, title: "Riesgo de inundación", meta: "Ribera · PRI 0.68 · Mejorar drenaje" },
      { id: 3, title: "Presión turística", meta: "Urbano · PRI 0.63 · Control de accesos" },
      { id: 4, title: "Anomalía de humedad", meta: "Bosque · PRI 0.52 · Monitorizar" },
      { id: 5, title: "Señal de deformación", meta: "Montaña · PRI 0.49 · Validar InSAR" },
    ],
  },
  eu: {
    statusBadge: "Demo modua",
    overviewDesc: "Egungo egoeraren laburpena eta hurrengo ekintzak",
    overviewTitle: "Panela",
    mapDesc: "Mapa interaktiboa eta arrisku kontrolak",
    mapTitle: "Mapa operatiboa",
    exportLabel: "Esportatu egoera",
    alertsTitle: "Azken alertak",
    alertsDesc: "Azken orduetan aldatu denaren erregistroa",
    kpis: [
      { title: "Gainbegiratutako guneak", value: "42", hint: "+3 aste honetan" },
      { title: "Arrisku handia", value: "7", hint: "3 ↗ gorrian" },
      { title: "Alerta aktiboak", value: "3", hint: "Azken 48 orduak" },
      { title: "Azken eguneraketa", value: "Duela 2h", hint: "Talde teknikoa" },
    ],
    alerts: [
      { id: 1, title: "Itsas olatua", meta: "Kostaldea · PRI 0.74 · Berehala ekin" },
      { id: 2, title: "Uholde arriskua", meta: "Ibarbidea · PRI 0.68 · Drainatzea hobetu" },
      { id: 3, title: "Turismo presioa", meta: "Hirigunea · PRI 0.63 · Sarrera kontrola" },
      { id: 4, title: "Hezetasun anomalia", meta: "Basoa · PRI 0.52 · Monitorizatu" },
      { id: 5, title: "Deformazio seinalea", meta: "Mendia · PRI 0.49 · InSAR balioztatu" },
    ],
  },
} as const;

export function DashboardClient() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const handleExport = useCallback(() => {
    console.log("[reports] export state");
  }, []);

  return (
    <div className="dashboard-stack">
      <Section actions={<Badge tone="neutral">{copy.statusBadge}</Badge>} desc={copy.overviewDesc} title={copy.overviewTitle}>
        <div className="kpi-grid">
          {copy.kpis.map((item) => (
            <KpiCard hint={item.hint} key={item.title} title={item.title} value={item.value} />
          ))}
        </div>
      </Section>
      <div className="dashboard-grid">
        <Section
          actions={
            <Button onClick={handleExport} type="button" variant="ghost">
              {copy.exportLabel}
            </Button>
          }
          desc={copy.mapDesc}
          id="mapa"
          title={copy.mapTitle}
        >
          <div className="map-layout">
            <div className="section-card glass hairline" style={{ padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1rem", fontWeight: 600 }}>
                {language === "es" ? "Controles" : "Kontrolak"}
              </h3>
              <MapControls />
            </div>
            <div className="map-panel">
              <SiteMap />
            </div>
          </div>
        </Section>
        <Section desc={copy.alertsDesc} title={copy.alertsTitle}>
          <ul className="alert-list">
            {copy.alerts.map((alert) => (
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

export default DashboardClient;
