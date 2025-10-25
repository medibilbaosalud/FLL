export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const scenarioHighlights = [
  {
    icon: "flask" as const,
    title: "Hemen ikusiko duzu",
    description: "Slider koloretsuekin eguraldia eta bisitariak aldatuko dituzu, eta mapak berehala erantzungo du.",
    bullets: ["Preset azkarrak: ekaitza, turismo puntakoa, uda lehorra", "Δ-PRI kalkulu ikusgarriak"],
  },
  {
    icon: "map" as const,
    title: "Mapa eguneratua",
    description: "Emaitzak zuzenean mapan margotuko dira: kolore semaforoak eta Top-Driver berriak segundo batean.",
    bullets: ["Layer bakoitzaren eragin puntuala", "Konfiantza semaforoaren eguneraketa"],
  },
  {
    icon: "report" as const,
    title: "Gorde eta partekatu",
    description: "Simulazio bakoitza izen batekin gordeko da eta txostenetan automatikoki agertuko da.",
    bullets: ["Timestamp eta sinadura digitala", "Stakeholder bakoitzerako txantiloiak"],
  },
];

export default function ScenarioPage() {
  return (
    <Section desc="Hipotesi eta shock ezberdinak simulatzeko tartea" title="Eszenario Laborategia">
      <div className="feature-grid">
        {scenarioHighlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 feature-card">
        <h3>Zer gertatuko da hemen?</h3>
        <p>
          Baselinea hautatu, sliderrekin hipotetikoak aplikatu eta Top-Driver berriak ikusiko dituzu animazio leunekin.
          Ondoren “Gorde eszenarioa” sakatzean, txostenetarako prest geratuko da.
        </p>
      </div>
    </Section>
  );
}
