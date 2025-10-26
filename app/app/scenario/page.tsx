"use client";

export const dynamic = "force-dynamic";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const COPY = {
  es: {
    title: "Laboratorio de escenarios",
    description: "Aquí podrás experimentar con variaciones de clima y visitas.",
    highlights: [
      {
        icon: "flask" as const,
        title: "Simula en segundos",
        description: "Moverás sliders de lluvia, temperatura y turismo y el mapa responderá al instante.",
        bullets: ["Presets: temporal, pico turístico, verano seco", "Δ-PRI actualizado en tiempo real"],
      },
      {
        icon: "map" as const,
        title: "Mapa reactivo",
        description: "Los resultados colorearán el mapa y recalcularán los Top-Drivers.",
        bullets: ["Impacto por capa", "Semáforo de confianza actualizado"],
      },
      {
        icon: "report" as const,
        title: "Guarda y comparte",
        description: "Cada simulación guardada aparecerá lista para los informes.",
        bullets: ["Fecha y autor", "Notas personalizadas"],
      },
    ],
    previewTitle: "Qué verás",
    previewBody:
      "Selecciona el escenario base, ajusta sliders suaves y guarda la versión que necesites para coordinar al equipo.",
  },
  eu: {
    title: "Eszenario Laborategia",
    description: "Hemen klimatiko eta bisitari aldaketak probatuko dituzu.",
    highlights: [
      {
        icon: "flask" as const,
        title: "Simulatu segundoetan",
        description: "Euri, tenperatura eta turismo sliderrekin jolastuko duzu eta mapak berehala erantzungo du.",
        bullets: ["Preset-ak: ekaitza, turismo puntakoa, uda lehorra", "Δ-PRI eguneratuta denbora errealean"],
      },
      {
        icon: "map" as const,
        title: "Mapa erreaktiboa",
        description: "Emaitzek mapa koloreztatuko dute eta Top-Driver berriak kalkulatuko dira.",
        bullets: ["Layer bakoitzaren eragina", "Konfiantza semaforoa eguneratuta"],
      },
      {
        icon: "report" as const,
        title: "Gorde eta partekatu",
        description: "Simulazio gordetako bakoitza txostenetan prest agertuko da.",
        bullets: ["Data eta egilea", "Oharrak pertsonalizatuak"],
      },
    ],
    previewTitle: "Zer ikusiko duzu",
    previewBody:
      "Baselinea aukeratu, slider leunekin aldaketak egin eta taldearekin partekatzeko bertsioak gordeko dituzu.",
  },
} as const;

export default function ScenarioPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <Section desc={copy.description} title={copy.title}>
      <div className="feature-grid">
        {copy.highlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 feature-card">
        <h3>{copy.previewTitle}</h3>
        <p>{copy.previewBody}</p>
      </div>
    </Section>
  );
}
