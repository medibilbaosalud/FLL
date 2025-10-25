"use client";

import Image from "next/image";
import Link from "next/link";

import { LanguageToggle } from "components/ui/language-toggle";
import { Icon } from "components/ui/icon";
import { useLanguage } from "components/providers/language-context";

type HeroStat = { label: string; value: string };
type SimpleCard = { title: string; description: string; icon?: keyof typeof IconMap };

type LandingCopy = {
  nav: { href: string; label: string }[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: HeroStat[];
  };
  challenge: { title: string; description: string; cards: SimpleCard[] };
  solution: { title: string; description: string; cards: SimpleCard[] };
  pri: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
    noteTitle: string;
    noteSubtitle: string;
  };
  previews: { title: string; description: string; label: string }[];
  impact: { title: string; cards: SimpleCard[] };
  cta: { title: string; description: string; primary: string; secondary: string };
};

type IconName =
  | "map"
  | "table"
  | "flask"
  | "report"
  | "settings"
  | "home"
  | "spark"
  | "shield";

const IconMap: Record<IconName, IconName> = {
  map: "map",
  table: "table",
  flask: "flask",
  report: "report",
  settings: "settings",
  home: "home",
  spark: "spark",
  shield: "shield",
};

const COPY: Record<"es" | "eu", LandingCopy> = {
  es: {
    nav: [
      { href: "#inicio", label: "Inicio" },
      { href: "#reto", label: "Reto" },
      { href: "#solucion", label: "Solución" },
      { href: "#pri", label: "PRI" },
      { href: "#app", label: "La app" },
      { href: "#impacto", label: "Impacto" },
    ],
    hero: {
      eyebrow: "ArchéoSense · Clima · Patrimonio",
      title: "Protege el pasado con decisiones claras.",
      description:
        "Unimos clima, satélite y actividad humana para convertirlos en un semáforo comprensible y en planes de acción listos para actuar.",
      ctaPrimary: "Entrar a la demo",
      ctaSecondary: "Ver cómo funciona",
      stats: [
        { label: "Sitios vigilados", value: "10" },
        { label: "Alertas al mes", value: "15" },
        { label: "Escenarios guardados", value: "28" },
      ],
    },
    challenge: {
      title: "Por qué hace falta",
      description:
        "Clima extremo, saturación turística y datos dispersos. ArchéoSense resume la urgencia en un vistazo.",
      cards: [
        {
          title: "Clima impredecible",
          description: "Inundaciones, olas de calor y incendios dañan el patrimonio antes de poder reaccionar.",
          icon: "shield",
        },
        {
          title: "Demasiados datos sueltos",
          description: "Sensores, satélite y visitas generan ruido. Necesitamos priorizar con criterio.",
          icon: "table",
        },
        {
          title: "Decisiones lentas",
          description: "Sin un semáforo claro, el presupuesto se diluye y llegan tarde las acciones preventivas.",
          icon: "spark",
        },
      ],
    },
    solution: {
      title: "Qué ofrece la plataforma",
      description: "Cinco módulos que conectan alerta temprana, explicación y respuesta.",
      cards: [
        { title: "Mapa vivo", description: "Clusters, colores por riesgo y capas temáticas en segundos.", icon: "map" },
        {
          title: "Triage inteligente",
          description: "Ordena inspecciones y exporta CSV con lo urgente primero.",
          icon: "table",
        },
        {
          title: "Laboratorio de escenarios",
          description: "Simula lluvia, calor o picos de turismo y ve cómo cambia el riesgo.",
          icon: "flask",
        },
        {
          title: "Informes listos",
          description: "PDF y CSV con mapas, drivers y acciones recomendadas.",
          icon: "report",
        },
        {
          title: "Preferencias",
          description: "Ajusta pesos y umbrales para adaptarlo a tu realidad.",
          icon: "settings",
        },
      ],
    },
    pri: {
      title: "Así calculamos el PRI",
      description: "Un flujo corto explica de dónde sale cada color del semáforo.",
      steps: [
        { title: "Reunimos datos", description: "Clima, deformación, visitas y estado del sitio." },
        { title: "Calculamos el índice", description: "Combinamos peligro, vulnerabilidad, exposición y valor." },
        { title: "Explicamos el porqué", description: "Mostramos los tres factores que más empujan el riesgo." },
        { title: "Sugerimos acciones", description: "Cada medida indica cuánto reduce el riesgo y su coste." },
      ],
      noteTitle: "PRI (0-100)",
      noteSubtitle: "Normalizamos la fórmula y coloreamos según umbrales configurables.",
    },
    previews: [
      {
        label: "Inicio",
        title: "Panel de salud",
        description: "KPIs rápidos, alertas recientes y acceso directo al mapa vivo.",
      },
      {
        label: "Mapa",
        title: "Explora y filtra",
        description: "Verás cada sitio por riesgo, podrás filtrar por país y abrir la ficha instantánea.",
      },
      {
        label: "Triage",
        title: "Prioriza",
        description: "Aquí aparecerá la tabla con acciones masivas, filtros por material y exportación.",
      },
      {
        label: "Escenarios",
        title: "Simula",
        description: "Controla sliders de lluvia, temperatura y turismo para prever qué pasará.",
      },
      {
        label: "Informes",
        title: "Comparte",
        description: "Genera PDFs estilizados y CSV para tu equipo o aliados.",
      },
      {
        label: "Ezarpenak",
        title: "Configura",
        description: "Define pesos del PRI, idioma y límites de color sin salir de la app.",
      },
    ],
    impact: {
      title: "Qué conseguimos",
      cards: [
        { title: "Actuar antes", description: "Alertas y escenarios en menos de un minuto para evitar daños." },
        { title: "Explicar fácil", description: "El semáforo muestra riesgo y motivos con lenguaje claro." },
        { title: "Compartir seguro", description: "Datos sensibles ofuscados por defecto y exportables cuando toca." },
      ],
    },
    cta: {
      title: "¿Listo para probar ArchéoSense?",
      description: "Explora la demo y descubre cómo priorizar la protección del patrimonio con datos claros.",
      primary: "Abrir demo",
      secondary: "Escríbenos",
    },
  },
  eu: {
    nav: [
      { href: "#inicio", label: "Hasiera" },
      { href: "#reto", label: "Erronka" },
      { href: "#solucion", label: "Konponbidea" },
      { href: "#pri", label: "PRI" },
      { href: "#app", label: "Aplikazioa" },
      { href: "#impacto", label: "Eragina" },
    ],
    hero: {
      eyebrow: "ArchéoSense · Klima · Ondarea",
      title: "Babestu aztarnategiak erabaki gardenekin.",
      description:
        "Klimako, sateliteko eta jarduera humanoaren datuak uztartzen ditugu semaforo ulerterrazean eta ekintza-planean.",
      ctaPrimary: "Demoan sartu",
      ctaSecondary: "Ikusi nola dabilen",
      stats: [
        { label: "Gainbegiratutako guneak", value: "10" },
        { label: "Alertak hilabetean", value: "15" },
        { label: "Gordetako eszenarioak", value: "28" },
      ],
    },
    challenge: {
      title: "Zergatik behar da",
      description: "Klima muturrekoa, turismoa eta datu sakabanatuak. ArchéoSensek egoera kolpe batez laburbiltzen du.",
      cards: [
        {
          title: "Klima aldakorra",
          description: "Uholdeak, bero-boladak eta suteak kalteak eragiten dituzte garaiz erreakzionatu aurretik.",
          icon: "shield",
        },
        {
          title: "Datu gehiegi",
          description: "Sentsore, satelite eta bisitarien informazioa irizpide argiz ordenatu behar da.",
          icon: "table",
        },
        {
          title: "Erabaki motelak",
          description: "Semaforo argirik gabe, aurrekontua sakabanatu egiten da eta prebentzioa berandu heltzen da.",
          icon: "spark",
        },
      ],
    },
    solution: {
      title: "Zer eskaintzen du",
      description: "Bost moduluk lotzen dute alerta goiztiarra, azalpena eta erantzuna.",
      cards: [
        { title: "Mapa bizia", description: "Cluster eta arrisku koloreak segundotan.", icon: "map" },
        { title: "Triage adimentsua", description: "Inspekzioak ordenatu eta CSV esportatu lehentasunarekin.", icon: "table" },
        { title: "Eszenario laborategia", description: "Euria, beroa edo turismoa aldatuz ikusi nola mugitzen den PRI.", icon: "flask" },
        { title: "Txosten prest", description: "PDF eta CSV mapekin, driverrekin eta gomendioekin.", icon: "report" },
        { title: "Hobespenak", description: "Pisuen eta atalaseen kontrol erraza.", icon: "settings" },
      ],
    },
    pri: {
      title: "PRI nola kalkulatzen da",
      description: "Lau pausu labur, semaforoaren atzean dagoen logika ulertzeko.",
      steps: [
        { title: "Datuak batzen ditugu", description: "Klima, deformazioa, bisitariak eta gune egoera." },
        { title: "Indizea kalkulatzen dugu", description: "Arriskua × ahultasuna × esposizioa × balioa." },
        { title: "Zergatia azaltzen dugu", description: "Top 3 driverrek arriskua zergatik igo den erakusten dute." },
        { title: "Ekintzak gomendatzen ditugu", description: "Neurri bakoitzak arriskua zenbat jaisten duen eta kostua agertzen da." },
      ],
      noteTitle: "PRI (0-100)",
      noteSubtitle: "Formula normalizatu eta kolore semaforo bidez bistaratzen dugu.",
    },
    previews: [
      { label: "Hasiera", title: "Osasun panela", description: "KPI azkarrak, azken alertak eta mapa bizira sarbide zuzena." },
      {
        label: "Mapa",
        title: "Arakatu",
        description: "Arriskuaren arabera ikusiko duzu guztia, herrialdearen arabera iragazi eta fitxa zabaldu momentuan.",
      },
      {
        label: "Triage",
        title: "Lehentasunak",
        description: "Hemen agertuko da ekintza masiboetarako taula eta materialaren araberako iragazkia.",
      },
      {
        label: "Eszenarioak",
        title: "Simulatu",
        description: "Euria, tenperatura eta turismo sliderrekin etorkizuneko arriskua aurreikusi.",
      },
      { label: "Txostenak", title: "Partekatu", description: "PDF dotoreak eta CSV-ak taldearentzat edo aliatuentzat." },
      {
        label: "Ezarpenak",
        title: "Konfiguratu",
        description: "PRI pisuak, hizkuntza eta kolore mugak unean bertan egokitu.",
      },
    ],
    impact: {
      title: "Zer lortzen dugu",
      cards: [
        { title: "Aurretiazko erreakzioa", description: "Alertak eta eszenarioak minutu batean erantzuteko." },
        { title: "Azalpen gardena", description: "Semaforoak arriskua eta arrazoiak hizkera arruntean erakusten ditu." },
        { title: "Partekatze segurua", description: "Datu sentikorrak lehenetsiz ofuskatuta eta behar denean esportagarri." },
      ],
    },
    cta: {
      title: "Prest al zaude ArchéoSense probatzeko?",
      description: "Demoa arakatu eta ondarea babesteko lehentasunak datu argiekin antolatu.",
      primary: "Demoa ireki",
      secondary: "Idatzi guri",
    },
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <main className="landing" id="inicio">
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-copy">
            <div className="landing-hero-top">
              <span className="landing-eyebrow">{copy.hero.eyebrow}</span>
              <LanguageToggle />
            </div>
            <h1>{copy.hero.title}</h1>
            <p>{copy.hero.description}</p>
            <div className="landing-actions">
              <Link className="landing-primary" href="/app">
                {copy.hero.ctaPrimary}
              </Link>
              <a className="landing-secondary" href="#solucion">
                {copy.hero.ctaSecondary}
              </a>
            </div>
            <dl className="landing-stats">
              {copy.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="landing-hero-visual">
            <Image alt="Vista previa de ArchéoSense" height={520} src="/images/landing-hero.svg" width={560} />
          </div>
        </div>
        <nav aria-label="Secciones principales" className="landing-nav">
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="landing-section" id="reto">
        <header className="landing-section-header">
          <h2>{copy.challenge.title}</h2>
          <p>{copy.challenge.description}</p>
        </header>
        <div className="landing-grid">
          {copy.challenge.cards.map((card) => (
            <article className="landing-card" key={card.title}>
              {card.icon ? <Icon className="landing-card-icon" name={IconMap[card.icon]} /> : null}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="solucion">
        <header className="landing-section-header">
          <h2>{copy.solution.title}</h2>
          <p>{copy.solution.description}</p>
        </header>
        <div className="landing-module-grid">
          {copy.solution.cards.map((card) => (
            <article className="landing-card" key={card.title}>
              {card.icon ? <Icon className="landing-card-icon" name={IconMap[card.icon]} /> : null}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-split" id="pri">
        <header className="landing-section-header">
          <h2>{copy.pri.title}</h2>
          <p>{copy.pri.description}</p>
        </header>
        <div className="landing-pri">
          <ol>
            {copy.pri.steps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="landing-media">
            <div className="landing-media-card">
              <span>{copy.pri.noteTitle}</span>
              <strong>hazard × vulnerability × exposure × value</strong>
              <p>{copy.pri.noteSubtitle}</p>
            </div>
            <Image alt="Diagrama del flujo del PRI" height={280} src="/images/landing-pri.svg" width={360} />
          </div>
        </div>
      </section>

      <section className="landing-section" id="app">
        <header className="landing-section-header">
          <h2>ArchéoSense app</h2>
          <p>{language === "es" ? "Un vistazo a lo que verás en cada módulo." : "Modulu bakoitzean ikusiko duzuna"}</p>
        </header>
        <div className="landing-screens">
          {copy.previews.map((screen) => (
            <article className="landing-screen" key={screen.label}>
              <div aria-hidden="true" className="landing-screen-visual">
                <span>{screen.label}</span>
              </div>
              <h3>{screen.title}</h3>
              <p>{screen.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="impacto">
        <header className="landing-section-header">
          <h2>{copy.impact.title}</h2>
        </header>
        <div className="landing-grid">
          {copy.impact.cards.map((card) => (
            <article className="landing-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="cta">
        <div className="landing-cta-card">
          <div>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.description}</p>
          </div>
          <div className="landing-cta-actions">
            <Link className="landing-primary" href="/app">
              {copy.cta.primary}
            </Link>
            <a className="landing-secondary" href="mailto:hello@archeosense.io">
              {copy.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
