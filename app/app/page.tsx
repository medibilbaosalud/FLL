import { KpiCard } from "components/ui/kpi-card";
import { Section } from "components/ui/section";
import { Skeleton } from "components/ui/skeleton";

const KPI_DATA = [
  { title: "Guneak", value: "28", hint: "+3 aste honetan" },
  { title: "Arrisku altua", value: "7", hint: "3 ↗ alerta" },
  { title: "Alerta aktiboak", value: "12", hint: "Azken 48 orduak" },
  { title: "Eguneraketak", value: "5", hint: "Lan taldearen jarduera" },
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Section desc="Egungo egoeraren laburpena eta erantzun azkarra" title="Hasiera-panela">
        <div className="kpi-grid">
          {KPI_DATA.map((item) => (
            <KpiCard hint={item.hint} key={item.title} title={item.title} value={item.value} />
          ))}
        </div>
      </Section>
      <div className="dashboard-grid">
        <Section desc="Mapa interaktiboa laster egongo da erabilgarri" title="Mapa operatiboa">
          <div className="map-placeholder" role="presentation">
            <div style={{ width: "100%", height: "100%" }}>
              <Skeleton className="map-skeleton" style={{ width: "100%", height: "100%" }} />
              <p style={{ marginTop: "16px" }}>Mapa prest egongo da demoaren hurrengo fasean.</p>
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
