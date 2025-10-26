"use client";

export const dynamic = "force-dynamic";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const COPY = {
  es: {
    title: "Centro de informes",
    description: "Así se verá el módulo cuando esté activo.",
    highlights: [
      {
        icon: "report" as const,
        title: "PDF impecable",
        description: "Aquí aparecerá un informe visual con portada, KPIs y mapa listo para presentar.",
        bullets: ["Maquetación automática", "Notas y firmas personalizables"],
      },
      {
        icon: "table" as const,
        title: "CSV limpio",
        description: "La tabla visible se exportará en un clic para análisis adicionales.",
        bullets: ["Formato UTF-8 con separador configurable", "Marca temporal incluida"],
      },
      {
        icon: "settings" as const,
        title: "Plantillas adaptables",
        description: "Podrás guardar variantes para cada equipo o aliado.",
        bullets: ["Colores y logotipos propios", "Historial de informes"],
      },
    ],
    previewTitle: "Cómo lo usarás",
    previewBody:
      "Antes de descargar verás las páginas en miniatura y podrás añadir comentarios finales.",
    shareTitle: "Compartir",
    shareBody:
      "Ofreceremos descarga directa o enlace temporal que caduca automáticamente.",
  },
  eu: {
    title: "Txostenen zentroa",
    description: "Modulua aktibo dagoenean honela ikusiko duzu.",
    highlights: [
      {
        icon: "report" as const,
        title: "PDF bikaina",
        description: "Hemen agertuko da portada, KPI-ak eta mapa dituen txosten prest.",
        bullets: ["Maketazio automatikoa", "Oharrak eta sinadurak pertsonalizagarri"],
      },
      {
        icon: "table" as const,
        title: "CSV garbia",
        description: "Taula ikusgarria klik bakarrean esportatuko da azterketa gehiagorako.",
        bullets: ["UTF-8 formatuan, bereizle aukerarekin", "Data eta ordua gehituta"],
      },
      {
        icon: "settings" as const,
        title: "Txantiloi moldagarriak",
        description: "Stakeholder bakoitzarentzat bertsioak gordeko dituzu.",
        bullets: ["Kolore eta logotipo propioak", "Txostenen historia"],
      },
    ],
    previewTitle: "Nola erabiliko duzu",
    previewBody:
      "Deskargatu aurretik orri bakoitzaren miniatura ikusiko duzu eta azken oharrak idatzi ahal izango dituzu.",
    shareTitle: "Partekatu",
    shareBody:
      "Deskarga zuzena edo automatikoki iraungitzen den esteka eskainiko dugu.",
  },
} as const;

export default function ReportsPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <Section desc={copy.description} title={copy.title}>
      <div className="feature-grid">
        {copy.highlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="feature-card">
          <h3>{copy.previewTitle}</h3>
          <p>{copy.previewBody}</p>
        </div>
        <div className="feature-card">
          <h3>{copy.shareTitle}</h3>
          <p>{copy.shareBody}</p>
        </div>
      </div>
    </Section>
  );
}
