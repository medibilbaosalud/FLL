export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const settingsHighlights = [
  {
    icon: "settings" as const,
    title: "Pisuen kontrola",
    description: "Hemen egokituko dituzu hazard, satelite, giza presio eta balioaren pisuak modu errazean.",
    bullets: ["Slider eta input zehatzak", "Kolore semaforo pertsonalizagarria"],
  },
  {
    icon: "map" as const,
    title: "Maparen hobespenak",
    description: "Layer lehenetsiak, cluster erradioa eta gune sentikorren babes maila hemen gordeko dira.",
    bullets: ["Gehien kontsultatutako layer ordena", "Zoom maximoa gune sentikorretarako"],
  },
  {
    icon: "table" as const,
    title: "Esportazio eta integrazioak",
    description: "Arches/EAMENA mapaketak eta API tokenak modu seguruan gordeko dituzu atal honetan.",
    bullets: ["Field mapping ikusgarriak", "API tokenen kudeaketa"],
  },
];

export default function SettingsPage() {
  return (
    <Section desc="Konfiguratu arrisku kalkulua eta esperientzia" title="Ezarpenak">
      <div className="feature-grid">
        {settingsHighlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 feature-card">
        <h3>Profil azkarrak</h3>
        <p>
          Kostaldea, ibar lehorra edo hiri gunea bezalako preset-ak gordeko dituzu eta klik bakarrean aplikatuko dira mapa
          eta triage mahaian.
        </p>
      </div>
    </Section>
  );
}
