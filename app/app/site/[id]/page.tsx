import Link from "next/link";
import { notFound } from "next/navigation";

import { FeatureCard } from "components/ui/feature-card";

interface SitePageProps {
  params: { id: string };
}

const MOCK_SITES: Record<string, { name: string; summary: string; country: string }> = {
  "1": {
    name: "Kostaldeko aztarnategia",
    country: "Euskal Kostaldea",
    summary: "Demo gunea — olatu bortitzek eta itsasgora biziek eragina izan dezaketen aztarnategia.",
  },
};

const upcomingFeatures = [
  {
    icon: "map" as const,
    title: "Mapan kokapen zehatza",
    description: "Zoom murriztua eta ofuskazio adimenduna gune sentikorretarako, ikuspegi segurua eskainiz.",
    bullets: ["Mapa 3D geruzak", "Argazki historikoen overlay-a"],
  },
  {
    icon: "report" as const,
    title: "Top-Drivers eta ekintza plana",
    description: "Arriskua gorrian jartzen duten faktore nagusiak eta Δ-PRI kalkuluak.",
    bullets: ["Kostu/denbora etiketa argiak", "Jarraipen log automatikoa"],
  },
  {
    icon: "table" as const,
    title: "Historia eta ebidentziak",
    description: "Sparkline grafikoak (euri, NDVI, deformazioa) eta azken 8 asteko jardueren kronologia.",
    bullets: ["Event marker ikusgarriak", "PDF eta bideo laburpenetarako export"],
  },
];

export default function SitePage({ params }: SitePageProps) {
  const site = MOCK_SITES[params.id];

  if (!site) {
    notFound();
  }

  return (
    <section className="section-card" aria-labelledby="site-heading">
      <header className="section-header">
        <div>
          <h1 className="section-title" id="site-heading">
            {site.name}
          </h1>
          <p className="section-desc">{site.country} · beta bertsio bisuala</p>
        </div>
        <Link className="landing-secondary" href="/app">
          Itzuli mapara
        </Link>
      </header>
      <div className="feature-card mb-8">
        <h3>Laburpena</h3>
        <p>{site.summary}</p>
        <p>
          Laster ikusiko duzu PRIaren bilakaera, alerta log-a eta gomendatutako hurrengo ekintza zehatzen eragina. Fitxa
          honek mapa nagusiarekin sinkronizatuta egongo da.
        </p>
      </div>
      <div className="feature-grid">
        {upcomingFeatures.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
