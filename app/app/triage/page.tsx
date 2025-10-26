"use client";

export const dynamic = "force-dynamic";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard } from "components/ui/feature-card";
import { Section } from "components/ui/section";

const COPY = {
  es: {
    title: "Triage",
    description: "Gestiona sitios críticos y asigna acciones prioritarias.",
    highlights: [
      {
        icon: "table" as const,
        title: "Tabla viva",
        description: "Aquí aparecerá la lista ordenada por PRI y presión humana.",
        bullets: ["Filtros combinados por material, país y rango de riesgo", "Alertas con iconos claros"],
      },
      {
        icon: "report" as const,
        title: "Actúa rápido",
        description: "Programarás inspecciones y descargarás CSV sin salir del panel.",
        bullets: ["Exportación directa a CSV/PDF", "Estado de inspección coloreado"],
      },
      {
        icon: "settings" as const,
        title: "Workflow flexible",
        description: "Podrás guardar etiquetas y estados según el ritmo de tu equipo.",
        bullets: ["Vista Kanban opcional", "Notas y webhooks"],
      },
    ],
    usageTitle: "Cómo funcionará",
    usageBody:
      "Selecciona varios sitios, asigna fecha de revisión y deja comentarios. Todo quedará en un historial auditable.",
    trendTitle: "Seguimiento",
    trendBody:
      "Mini KPI mostrarán el movimiento del riesgo en los últimos 14 días con un solo icono.",
  },
  eu: {
    title: "Triage mahaia",
    description: "Kudeatu gune kritikoak eta lehenetsi ekintzak.",
    highlights: [
      {
        icon: "table" as const,
        title: "Taula bizia",
        description: "PRI eta presio humanoaren arabera ordenatutako zerrenda agertuko da hemen.",
        bullets: ["Materiala, herrialdea eta arrisku tartearen araberako iragazkiak", "Alertak ikono argiekin"],
      },
      {
        icon: "report" as const,
        title: "Ekintza azkarrak",
        description: "Ikuskapenak programatu eta CSV deskargatuko dituzu panel berean.",
        bullets: ["CSV/PDF esportazio zuzena", "Ikuskapen egoerak kolorez"],
      },
      {
        icon: "settings" as const,
        title: "Workflow moldagarria",
        description: "Etiketak eta egoerak taldearen erritmora egokituko dira.",
        bullets: ["Kanban ikuspegia aukeran", "Oharrak eta webhook-ak"],
      },
    ],
    usageTitle: "Nola ibiliko da",
    usageBody:
      "Aukeratu guneak, ezarri ikuskapen data eta utzi oharrak. Guztia audit trail batean gordeko da.",
    trendTitle: "Mugimenduen jarraipena",
    trendBody:
      "Mini KPI-ek azken 14 egunetako joera erakutsiko dute gezi bakar batekin.",
  },
} as const;

export default function TriagePage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <Section desc={copy.description} title={copy.title}>
      <div className="feature-grid">
        {copy.highlights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="feature-card">
          <h3>{copy.usageTitle}</h3>
          <p>{copy.usageBody}</p>
        </div>
        <div className="feature-card">
          <h3>{copy.trendTitle}</h3>
          <p>{copy.trendBody}</p>
        </div>
      </div>
    </Section>
  );
}
