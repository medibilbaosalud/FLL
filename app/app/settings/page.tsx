"use client";

export const dynamic = "force-dynamic";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const COPY = {
  es: {
    title: "Ajustes",
    description: "Personaliza el cálculo de riesgo y la experiencia.",
    highlights: [
      {
        icon: "settings" as const,
        title: "Pesos del PRI",
        description: "Ajustarás los pesos de clima, satélite, presión humana y valor cultural.",
        bullets: ["Sliders e inputs precisos", "Semáforo configurable"],
      },
      {
        icon: "map" as const,
        title: "Preferencias del mapa",
        description: "Define capas iniciales, radio de clusters y protección para sitios sensibles.",
        bullets: ["Ordena las capas más usadas", "Límites de zoom por sensibilidad"],
      },
      {
        icon: "table" as const,
        title: "Integraciones",
        description: "Gestiona mapeos Arches/EAMENA y credenciales de API de forma segura.",
        bullets: ["Campos alineados", "Gestión de tokens"],
      },
    ],
    presetTitle: "Perfiles rápidos",
    presetBody:
      "Guardarás presets como costa, valle seco u entorno urbano y se aplicarán al mapa y triage al instante.",
  },
  eu: {
    title: "Ezarpenak",
    description: "Pertsonalizatu arrisku kalkulua eta esperientzia.",
    highlights: [
      {
        icon: "settings" as const,
        title: "PRI pisuak",
        description: "Hazard, satelite, giza presio eta balioaren pisuak erraz egokituko dituzu.",
        bullets: ["Slider eta input zehatzak", "Semaforo pertsonalizagarria"],
      },
      {
        icon: "map" as const,
        title: "Maparen hobespenak",
        description: "Layer lehenetsiak, cluster erradioa eta gune sentikorren babesa hemen kudeatuko dituzu.",
        bullets: ["Erabiliena den layer ordena", "Zoom muga gune sentikorretarako"],
      },
      {
        icon: "table" as const,
        title: "Integrazioak",
        description: "Arches/EAMENA mapaketak eta API tokenak modu seguruan gordeko dituzu.",
        bullets: ["Field mapping ikusgarriak", "API tokenen kudeaketa"],
      },
    ],
    presetTitle: "Profil azkarrak",
    presetBody:
      "Kostaldea, ibar lehorra edo hiri gunea bezalako preset-ak gordeko dira eta mapa zein triagean aplikatuko dira.",
  },
} as const;

export default function SettingsPage() {
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
        <h3>{copy.presetTitle}</h3>
        <p>{copy.presetBody}</p>
      </div>
    </Section>
  );
}
