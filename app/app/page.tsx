import Hero from "components/landing/Hero";
import KpiStrip from "components/landing/KpiStrip";
import Vision from "components/landing/Vision";
import Roadmap from "components/landing/Roadmap";
import CTA from "components/landing/CTA";
import type { LocalizedString } from "lib/landing";
import { getLandingCopy } from "lib/landing";

const makeLocalized = (es: string, eu: string): LocalizedString => ({ es, eu });

export default function AppLanding() {
  const copy = getLandingCopy();

  const metrics = [
    { value: makeLocalized("12", "12"), label: makeLocalized(copy.es.kpiSites, copy.eu.kpiSites) },
    { value: makeLocalized("3", "3"), label: makeLocalized(copy.es.kpiCritical, copy.eu.kpiCritical) },
    { value: makeLocalized("12 min", "12 min"), label: makeLocalized(copy.es.kpiUpdate, copy.eu.kpiUpdate) },
    {
      value: makeLocalized("Costa · Riberas · Urbano", "Kosta · Ibarriak · Hiriak"),
      label: makeLocalized(copy.es.kpiCoverage, copy.eu.kpiCoverage),
    },
  ];

  const heroHighlights: LocalizedString[] = [
    makeLocalized("Demo viva muy pronto", "Demo bizia oso laster"),
    makeLocalized("Alertas comprensibles", "Alerta ulergarriak"),
    makeLocalized("Plan de acción incluido", "Ekintza plana barne"),
  ];

  const mapPreview = {
    badge: makeLocalized("Vista conceptual", "Ikuspegi kontzeptuala"),
    caption: makeLocalized(
      "Así se verán los focos de riesgo durante el piloto demo.",
      "Horrela ikusiko dira arriskuaren fokuak demo pilotuan."
    ),
    notes: [
      makeLocalized("Cluster demo · 6 sitios", "Demo cluster-a · 6 gune"),
      makeLocalized("Itálica 0.68 PRI", "Italica 0.68 PRI"),
      makeLocalized("Acciones rápidas a un clic", "Ekintza azkarrak klik bakarrean"),
    ],
  };

  return (
    <main>
      <Hero
        badge={makeLocalized("Demo viva muy pronto", "Demo bizia oso laster")}
        title={makeLocalized(copy.es.heroTitle, copy.eu.heroTitle)}
        lead={makeLocalized(copy.es.heroLead, copy.eu.heroLead)}
        primaryCta={{ label: makeLocalized(copy.es.heroPrimary, copy.eu.heroPrimary), href: "/app#mapa" }}
        secondaryCta={{ label: makeLocalized(copy.es.heroSecondary, copy.eu.heroSecondary), href: "/app/site/1" }}
        highlights={heroHighlights}
      />
      <KpiStrip items={metrics} />
      <Vision
        title={makeLocalized(copy.es.visionTitle, copy.eu.visionTitle)}
        lead={makeLocalized(copy.es.visionLead, copy.eu.visionLead)}
        items={[
          {
            icon: "map" as const,
            title: makeLocalized(copy.es.visionItem1Title, copy.eu.visionItem1Title),
            body: makeLocalized(copy.es.visionItem1Body, copy.eu.visionItem1Body),
          },
          {
            icon: "filter" as const,
            title: makeLocalized(copy.es.visionItem2Title, copy.eu.visionItem2Title),
            body: makeLocalized(copy.es.visionItem2Body, copy.eu.visionItem2Body),
          },
          {
            icon: "bolt" as const,
            title: makeLocalized(copy.es.visionItem3Title, copy.eu.visionItem3Title),
            body: makeLocalized(copy.es.visionItem3Body, copy.eu.visionItem3Body),
          },
        ]}
        preview={mapPreview}
      />
      <Roadmap
        title={makeLocalized(copy.es.roadmapTitle, copy.eu.roadmapTitle)}
        items={[
          makeLocalized(copy.es.roadmap1, copy.eu.roadmap1),
          makeLocalized(copy.es.roadmap2, copy.eu.roadmap2),
          makeLocalized(copy.es.roadmap3, copy.eu.roadmap3),
          makeLocalized(copy.es.roadmap4, copy.eu.roadmap4),
        ]}
      />
        <CTA
          title={makeLocalized(copy.es.ctaTitle, copy.eu.ctaTitle)}
          lead={makeLocalized(copy.es.ctaLead, copy.eu.ctaLead)}
          primary={{ label: makeLocalized(copy.es.ctaPrimary, copy.eu.ctaPrimary), href: "/app#mapa" }}
          secondary={{ label: makeLocalized(copy.es.ctaSecondary, copy.eu.ctaSecondary), href: "/app/site/1" }}
        />
    </main>
  );
}
