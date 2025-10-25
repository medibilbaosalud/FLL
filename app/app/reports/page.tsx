export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const reportHighlights = [
  {
    icon: "report" as const,
    title: "PDF profesionalak",
    description: "Portada, KPI nagusiak, mapa laburpena eta eszenario gordeen eragina txertatuko ditugu automatikoki.",
    bullets: ["jsPDF + autoTable maketatzea", "Azken sinadura eta ohar pertsonalizatuak"],
  },
  {
    icon: "table" as const,
    title: "CSV adimendunak",
    description: "Filtratutako guneak eta euren PRI/ΔPRI balioak esportatuko dira analisirako prest.",
    bullets: ["UTF-8 BOM eta ; edo , aukerak", "Esportazio data + erabiltzailearen IDa"],
  },
  {
    icon: "settings" as const,
    title: "Txantiloi galeria",
    description: "Stakeholder bakoitzerako formatua gordeko dugu: hezkuntza, kudeatzaileak edo babesleak.",
    bullets: ["Branding koloreak eta logotipoak", "Txostenen historia kontsulta"],
  },
];

export default function ReportsPage() {
  return (
    <Section desc="Minutu batean partekatzeko prest" title="Txostenen zentroa">
      <div className="feature-grid">
        {reportHighlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="feature-card">
          <h3>PDF preview azkarra</h3>
          <p>
            Sortu aurretik, orri bakoitzaren miniatura ikusiko duzu, sinadura edo oharrak gehitu aurretik egiaztatzeko.
          </p>
        </div>
        <div className="feature-card">
          <h3>Deskarga + partekatze esteka</h3>
          <p>
            Deskargatu edo sortu esteka partekagarria 48 orduko balioarekin. Segurtasunagatik, esteka zaharrak
            automatikoki iraungiko dira.
          </p>
        </div>
      </div>
    </Section>
  );
}
