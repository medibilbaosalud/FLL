"use client";

import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard, type FeatureCardProps } from "components/ui/feature-card";

interface LocalizedSiteCopy {
  name: string;
  country: string;
  summary: string;
}

interface SiteClientProps {
  site: { es: LocalizedSiteCopy; eu: LocalizedSiteCopy };
  upcoming: {
    es: FeatureCardProps[];
    eu: FeatureCardProps[];
  };
}

export function SiteClient({ site, upcoming }: SiteClientProps) {
  const { language } = useLanguage();
  const copy = site[language];
  const features = upcoming[language];
  const backLabel = language === "es" ? "Volver al mapa" : "Mapara itzuli";
  const summaryTitle = language === "es" ? "Resumen" : "Laburpena";
  const betaNote = language === "es" ? "versión demo" : "beta bertsioa";

  return (
    <section className="section-card" aria-labelledby="site-heading">
      <header className="section-header">
        <div>
          <h1 className="section-title" id="site-heading">
            {copy.name}
          </h1>
          <p className="section-desc">
            {copy.country} · {betaNote}
          </p>
        </div>
        <Link className="landing-secondary" href="/app">
          {backLabel}
        </Link>
      </header>
      <div className="feature-card mb-8">
        <h3>{summaryTitle}</h3>
        <p>{copy.summary}</p>
        <p>
          {language === "es"
            ? "Pronto verás la evolución del PRI, el registro de alertas y el impacto estimado de cada acción."
            : "Laster ikusiko dituzu PRIaren bilakaera, alerta log-a eta ekintza bakoitzaren eragina."}
        </p>
      </div>
      <div className="feature-grid">
        {features.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
