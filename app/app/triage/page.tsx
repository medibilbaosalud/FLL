export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const triageHighlights = [
  {
    icon: "table" as const,
    title: "Lehentasun ordenatua",
    description: "PRI, presio humana eta azken eguneraketaren arabera auto-eguneratuko da zerrenda.",
    bullets: ["Filtru konbinatuak (materiala, herrialdea, arrisku tartea)", "Alertetan denbora errealeko badgeak"],
  },
  {
    icon: "report" as const,
    title: "Bulk ekintzak",
    description: "Ikuskapenak programatu, txostenak sortu eta CSV esportazioa klik bakarrean.",
    bullets: ["Esportazioak UTF-8 BOM eta dataren arabera", "Txantiloi pertsonalizagarriak PDFetarako"],
  },
  {
    icon: "settings" as const,
    title: "Workflow pertsonalizatua",
    description: "Zure taldeak markatutako egoerak eta etiketa koloreak gordeko dira.",
    bullets: ["Kanban ikuspegia azkar aktibatzeko prest", "API webhookak (betearazteko)"],
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
          <h3>Proben plangintza</h3>
          <p>
            Demoan ikusiko duzu nola aukeratu hainbat gune batera, ikuskapen data proposatu eta audit trail batean
            gordetzen diren oharrak gehitu.
          </p>
        </div>
        <div className="feature-card">
          <h3>Delta arriskuaren jarraipena</h3>
          <p>
            KPI txartel interaktiboek azken 14 egunetako joera erakusten dute, goranzko arriskuak lehenesten lagunduz.
          </p>
        </div>
      </div>
    </Section>
  );
}
