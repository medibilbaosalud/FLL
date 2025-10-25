export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const scenarioHighlights = [
  {
    icon: "flask" as const,
    title: "Slider eta preset bizkorrak",
    description: "Euri, tenperatura eta turismo aldaketek PRIari nola eragiten dioten ikusiko duzu unean bertan.",
    bullets: ["Preset nagusiak: ekaitza, turismo puntakoa, uda lehorra", "Δ-PRI kalkulu ikusgarriak"],
  },
  {
    icon: "map" as const,
    title: "Mapa interaktiboarekin sinkronizatua",
    description: "Simulatutako egoerak mapan bertan ikusiko dituzu kolore eguneratuekin eta Top-Driver berriekin.",
    bullets: ["Layer bakoitzaren eragin puntuala", "Arriskuaren konfiantza semaforoa"],
  },
  {
    icon: "report" as const,
    title: "Eszenario gordetako txostenak",
    description: "Konfigurazio bakoitza PDF eta CSVetan txertatzeko prestatuko dugu automatikoki.",
    bullets: ["Timestamp eta sinadura digitala", "Stakeholder ezberdinetarako txantiloiak"],
  },
];

export default function ScenarioPage() {
  return (
    <Section desc="Hipotesi eta shock ezberdinak simulatu" title="Eszenario Laborategia">
      <div className="feature-grid">
        {scenarioHighlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 feature-card">
        <h3>Simulazioaren workflow osoa</h3>
        <p>
          Baseline-a aukeratu → sliderrekin hipotesiak aplikatu → Top-Driver eta KPI berriak berrikusi →
          “Gorde eszenarioa” sakatu eta txostenetan gehitu. Guztia 60 segundo baino gutxiagoan.
        </p>
      </div>
    </Section>
  );
}
