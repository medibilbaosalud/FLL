export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const settingsHighlights = [
  {
    icon: "settings" as const,
    title: "Pisuak eta atalaseak",
    description: "Hazard, satelite, giza presio eta balioaren pisuak doitu eta 0-100 PRIra normalizatuko ditugu.",
    bullets: ["Slider eta input zehatzak", "Kolore semaforo pertsonalizatua"],
  },
  {
    icon: "map" as const,
    title: "Maparen hobespenak",
    description: "Layer lehenetsiak, cluster erradioa eta gune sentikorren ofuskazio maila hemen konfiguratuko dituzu.",
    bullets: ["Gehien kontsultatutako layer ordena", "Zoom maximoa gune sentikorretarako"],
  },
  {
    icon: "table" as const,
    title: "Esportazio & integrazioak",
    description: "Arches/EAMENA mapaketak gordeko ditugu CSV/GeoJSON esportazio koherenteetarako.",
    bullets: ["Field mapping ikusgarriak", "API tokenak segurtasunarekin"],
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
        <h3>Gordetako profilak</h3>
        <p>
          Gorde konbinazio ezberdinak (kostaldea, ibar lehorra, hiri gunea...) eta aplikatu klik bakarrean mapa eta
          triage mahaian.
        </p>
      </div>
    </Section>
  );
}
