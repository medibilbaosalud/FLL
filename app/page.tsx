"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { LanguageToggle } from "components/ui/language-toggle";

type CopySection = {
  title: string;
  description: string;
};

type ModulePreview = CopySection & {
  tag: string;
  pill: string;
};

type LandingCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  highlights: { title: string; description: string }[];
  flow: { title: string; description: string; icon: string }[];
  modules: ModulePreview[];
  impact: CopySection[];
  footer: { title: string; description: string; primary: string; secondary: string };
};

const COPY: Record<"es" | "eu", LandingCopy> = {
  es: {
    hero: {
      eyebrow: "ArchéoSense · Patrimonio vivo",
      title: "Convierte datos dispersos en prioridades claras.",
      description:
        "ArchéoSense reúne clima, satélite y observaciones de campo para decidir qué yacimiento atender primero, por qué y con qué acción concreta.",
      ctaPrimary: "Abrir espacio de trabajo",
      ctaSecondary: "Descubrir módulos",
    },
    highlights: [
      {
        title: "Un vistazo basta",
        description: "Semáforo de riesgo con contexto humano y ambiental resumido en tarjetas limpias.",
      },
      {
        title: "Explicación inmediata",
        description: "Mostramos qué factores empujan el riesgo y qué acción reduce el impacto.",
      },
      {
        title: "Modo sensible",
        description: "Las ubicaciones delicadas se ofuscan por defecto y sólo se revelan a equipos autorizados.",
      },
    ],
    flow: [
      {
        title: "Observa",
        description: "Aquí aparecerán alertas visuales y pequeñas historias que explican qué está cambiando.",
        icon: "👁️",
      },
      {
        title: "Prioriza",
        description: "El Índice de Prioridad de Riesgo (PRI) combina peligro, vulnerabilidad, exposición y valor.",
        icon: "🚦",
      },
      {
        title: "Actúa",
        description: "Cada ficha propondrá acciones con impacto estimado y esfuerzo asociado.",
        icon: "🛠️",
      },
    ],
    modules: [
      {
        tag: "Inicio",
        pill: "En construcción",
        title: "Panel general",
        description: "Aquí verás indicadores clave, alertas recientes y accesos directos al mapa y al triage.",
      },
      {
        tag: "Mapa",
        pill: "Demo visual",
        title: "Exploración geográfica",
        description: "En este espacio aparecerá el mapa interactivo con colores por riesgo, clusters y filtros por país.",
      },
      {
        tag: "Triage",
        pill: "Próximamente",
        title: "Lista accionable",
        description: "Aquí se mostrará la tabla priorizada para programar inspecciones y exportar CSV.",
      },
      {
        tag: "Escenarios",
        pill: "Próximamente",
        title: "Laboratorio",
        description: "Verás sliders de lluvia, temperatura y visitas para anticipar cómo cambia el PRI.",
      },
      {
        tag: "Informes",
        pill: "Próximamente",
        title: "Centro de reportes",
        description: "Se generarán PDFs listos para presentar con mapas, métricas y planes de acción.",
      },
      {
        tag: "Ajustes",
        pill: "Próximamente",
        title: "Personalización",
        description: "Podrás ajustar pesos, idioma y umbrales de color para adaptarlo a cada equipo.",
      },
    ],
    impact: [
      {
        title: "Del dato a la decisión",
        description: "Traducimos capas climáticas y humanas en un lenguaje que cualquier gestora entiende.",
      },
      {
        title: "Trabajo coordinado",
        description: "La app muestra qué equipo debe intervenir y qué documentación debe acompañar cada acción.",
      },
      {
        title: "Aprendizaje continuo",
        description: "Guardamos escenarios y resultados para mejorar el modelo conforme llegan nuevas evidencias.",
      },
    ],
    footer: {
      title: "Prueba ArchéoSense hoy mismo",
      description: "Explora la demo y ayúdanos a pulir los módulos con tus comentarios.",
      primary: "Ir al espacio /app",
      secondary: "Solicitar contacto",
    },
  },
  eu: {
    hero: {
      eyebrow: "ArchéoSense · Ondare bizia",
      title: "Datu sakabanatuak lehentasun bihurtu.",
      description:
        "ArchéoSensek klima, satelite eta lurralde behaketak uztartzen ditu zein aztarnategiri ekin lehenengo, zergatik eta zein ekintzarekin erabakitzeko.",
      ctaPrimary: "Ireki lan eremua",
      ctaSecondary: "Ezagutu moduluak",
    },
    highlights: [
      {
        title: "Begirada bakarrean",
        description: "Arrisku semaforoa testuinguru klimatiko eta humanoarekin, modu garbian.",
      },
      {
        title: "Azalpen zuzena",
        description: "Arriskua gora daramaten faktore nagusiak eta jaitsiera ekarriko duen ekintza adieraziko dira.",
      },
      {
        title: "Modu sentikorra",
        description: "Kokapen sentikorrak lehenetsiz ofuskatzen dira eta soilik baimendutako taldeek ikusiko dituzte.",
      },
    ],
    flow: [
      {
        title: "Behatu",
        description: "Hemen azalduko dira aldaketa nagusien abisu bisualak eta kontakizun laburrak.",
        icon: "👁️",
      },
      {
        title: "Lehentasunak ezarri",
        description: "PRI indizeak arriskua, ahultasuna, esposizioa eta balioa konbinatzen ditu.",
        icon: "🚦",
      },
      {
        title: "Ekin",
        description: "Fitxa bakoitzak neurriak proposatuko ditu, eraginaren eta esfortzuaren estimazioarekin.",
        icon: "🛠️",
      },
    ],
    modules: [
      {
        tag: "Hasiera",
        pill: "Eraikitzen",
        title: "Panel orokorra",
        description: "Hemen agertuko dira KPI nagusiak, azken alertak eta mapa zein triagera sarbide azkarrak.",
      },
      {
        tag: "Mapa",
        pill: "Demo bisuala",
        title: "Esplorazioa",
        description: "Eremu honetan arriskuaren arabera koloreztatutako mapa interaktiboa ikusiko duzu, herrialdearen araberako filtroekin.",
      },
      {
        tag: "Triage",
        pill: "Laster",
        title: "Ekintza zerrenda",
        description: "Taula lehentasunduna hemen azalduko da, esportazio eta iragazki aurreratuekin.",
      },
      {
        tag: "Eszenarioak",
        pill: "Laster",
        title: "Laborategia",
        description: "Euri, tenperatura eta bisitari sliderrekin PRI nola mugitzen den aurreikusiko duzu.",
      },
      {
        tag: "Txostenak",
        pill: "Laster",
        title: "Txosten zentroa",
        description: "Mapa, metrika eta ekintza planez hornitutako PDF dotoreak sortuko dira hemen.",
      },
      {
        tag: "Ezarpenak",
        pill: "Laster",
        title: "Pertsonalizazioa",
        description: "Pisuen, hizkuntzaren eta kolore atalaseen moldaketa erraza izango duzu.",
      },
    ],
    impact: [
      {
        title: "Datuetatik erabakietara",
        description: "Klima eta giza datuak hizkera arruntera ekartzen ditugu erabakiak arintzeko.",
      },
      {
        title: "Talde lana",
        description: "Aplikazioak zein taldek jardun behar duen eta zein dokumentazio erantsi behar den azalduko du.",
      },
      {
        title: "Ikasketa etengabea",
        description: "Eszenarioak eta emaitzak gordeko ditugu eredua etengabe fintzeko.",
      },
    ],
    footer: {
      title: "Probatu ArchéoSense gaur",
      description: "Sartu demoan eta bidali zure iruzkinak moduluak fintzeko.",
      primary: "Joan /app gunera",
      secondary: "Jarri gurekin harremanetan",
    },
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <main className="landing" id="inicio">
      <div className="landing-hero glass hairline">
        <div className="landing-hero-content">
          <header>
            <div className="landing-hero-top">
              <span className="landing-eyebrow">{copy.hero.eyebrow}</span>
              <LanguageToggle />
            </div>
            <h1>{copy.hero.title}</h1>
            <p>{copy.hero.description}</p>
          </header>
          <div className="landing-actions">
            <Link className="landing-primary" href="/app">
              {copy.hero.ctaPrimary}
            </Link>
            <a className="landing-secondary" href="#modules">
              {copy.hero.ctaSecondary}
            </a>
          </div>
          <div className="landing-highlight-grid">
            {copy.highlights.map((item) => (
              <div className="landing-highlight" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="landing-hero-visual">
          <Image
            alt="ArchéoSense overview"
            height={420}
            priority
            src="/images/landing-hero.svg"
            width={560}
          />
        </div>
      </div>

      <section className="landing-flow" id="reto">
        <h2>{language === "es" ? "Cómo funciona ArchéoSense" : "Nola dabil ArchéoSense"}</h2>
        <p>
          {language === "es"
            ? "Observa el estado del sitio, entiende el PRI y actúa con un plan sencillo."
            : "Ikusi aztarnategiaren egoera, ulertu PRI eta ekin plan erraz batekin."}
        </p>
        <div className="flow-grid">
          {copy.flow.map((step) => (
            <article className="flow-card" key={step.title}>
              <span className="flow-icon" aria-hidden>{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-modules" id="modules">
        <header>
          <h2>{language === "es" ? "Próximos módulos" : "Datoak eta moduluak"}</h2>
          <p>
            {language === "es"
              ? "Cada bloque mostrará exactamente qué verás cuando pulamos la demo final."
              : "Bloke bakoitzean azken demoan ikusiko duzuna azaltzen dugu."}
          </p>
        </header>
        <div className="module-grid">
          {copy.modules.map((module) => (
            <article className="module-card glass hairline" key={module.title}>
              <div className="module-card-top">
                <span className="module-tag">{module.tag}</span>
                <span className="module-pill">{module.pill}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-impact" id="impacto">
        <h2>{language === "es" ? "Impacto" : "Eragina"}</h2>
        <div className="impact-grid">
          {copy.impact.map((card) => (
            <article className="impact-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-footer">
        <div className="landing-footer-card glass hairline">
          <h2>{copy.footer.title}</h2>
          <p>{copy.footer.description}</p>
          <div className="landing-actions">
            <Link className="landing-primary" href="/app">
              {copy.footer.primary}
            </Link>
            <a className="landing-secondary" href="mailto:hola@archeosense.org">
              {copy.footer.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

