export const dynamic = "force-dynamic";

import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const reportHighlights = [
  {
    icon: "report" as const,
    title: "PDF ikusgarria",
    description: "Hemen sortuko da txosten bisuala: portada, KPI laburra eta mapa-irudi garbia.",
    bullets: ["jsPDF + autoTable maketatzea", "Sinadura eta ohar pertsonalizatuak"],
  },
  {
    icon: "table" as const,
    title: "CSV garbia",
    description: "Taulako ikuspegia klik bakarrean deskargatuko da, analisi gehiagorako prest.",
    bullets: ["UTF-8 BOM eta ; edo , aukerak", "Deskargaren data gehituta"],
  },
  {
    icon: "settings" as const,
    title: "Txantiloi egokituak",
    description: "Stakeholder bakoitzerako koloreak eta laburpenak gordeko ditugu.",
    bullets: ["Branding koloreak eta logotipoak", "Txostenen historia ikusgarria"],
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
          <h3>Nola ikusiko duzu</h3>
          <p>Sortu aurretik, orri bakoitzaren miniatura ikusiko duzu eta ohar azkarrak gehitzeko lekua izango duzu.</p>
        </div>
        <div className="feature-card">
          <h3>Deskargatu edo partekatu</h3>
          <p>
            Deskarga zuzena edo 48 orduko esteka partekagarria eskainiko dugu; esteka zaharrak automatikoki
            iraungiko dira.
          </p>
        </div>
      </div>
    </Section>
  );
}
