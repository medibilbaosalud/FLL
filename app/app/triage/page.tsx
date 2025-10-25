export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const triageHighlights = [
  {
    icon: "table" as const,
    title: "Hemen agertuko da",
    description: "PRI eta presioaren arabera ordenatutako taula bizia, lehen begiratuan ulertzeko modukoa.",
    bullets: ["Filtru konbinatuak materiala, herrialdea eta arrisku tartearekin", "Alertetan kolore eta ikono argiak"],
  },
  {
    icon: "report" as const,
    title: "Ekiteko prest",
    description: "Ikuskapenak programatzeko eta CSV esportatzeko botoiak hemen kokatuko ditugu modu intuitiboan.",
    bullets: ["Deskarga zuzena CSV eta PDF formatuan", "Ikuskapen egoerak kolorez"],
  },
  {
    icon: "settings" as const,
    title: "Workflow argia",
    description: "Talde bakoitzak bere etiketak eta egoerak gorde ahal izango ditu, lan erritmoari egokituta.",
    bullets: ["Kanban ikuspegia aukera", "Webhojak eta oharrak integratzeko atea"],
  },
];

export default function TriagePage() {
  return (
    <Section desc="Kudeatu gune kritikoak eta esleitu ekintzak" title="Triage mahaia">
      <div className="feature-grid">
        {triageHighlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="feature-card">
          <h3>Nola erabiliko dugu</h3>
          <p>
            Aukeratu hainbat gune batera, ezarri ikuskapen data eta utzi oharrak, guztiak audit trail batean gordeta.
          </p>
        </div>
        <div className="feature-card">
          <h3>Arriskuaren mugimendua</h3>
          <p>
            KPI mini-grafikoek azken 14 egunetako gorabeherak erakutsiko dituzte, norabidea gezi bakar batekin.
          </p>
        </div>
      </div>
    </Section>
  );
}
