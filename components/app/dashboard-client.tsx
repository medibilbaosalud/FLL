"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { Badge } from "components/ui/badge";
import { FeatureCard } from "components/ui/feature-card";

const COPY = {
  es: {
    hero: {
      tag: "Espacio de trabajo",
      title: "Aquí verás tu centro de mando diario",
      description:
        "Estamos terminando el panel que reunirá KPI, alertas y accesos rápidos a cada módulo. Muy pronto podrás monitorizar todo a un vistazo.",
      primary: "Ver cómo quedará",
      secondary: "Ir a las fichas demo",
      highlights: [
        "Semáforo claro por prioridad",
        "Alertas explicadas en lenguaje humano",
        "Acciones sugeridas con impacto estimado",
      ] as const,
    },
    map: {
      badge: "Mapa en diseño",
      title: "Así se verá la vista geográfica",
      description:
        "El mapa mostrará clusters coloreados por riesgo, buscador de sitios y un panel lateral con historia rápida y acciones recomendadas.",
      features: [
        "Colores y clusters por nivel de riesgo",
        "Filtros por país, material y nivel de sensibilidad",
        "Atajos para abrir la ficha completa o programar triage",
      ] as const,
      actions: [
        { label: "Abrir ficha de ejemplo", href: "/app/site/1" },
        { label: "Ver lista prioritaria", href: "/app/triage" },
      ] as const,
    },
    modules: {
      title: "Lo que activaremos a continuación",
      description: "Cada módulo aportará contexto distinto para decidir mejor en el día a día.",
      items: [
        {
          icon: "table" as const,
          title: "Triage",
          description: "Lista ordenada por riesgo y presión humana para planificar inspecciones.",
          bullets: ["Filtros combinados", "Exportación CSV"] as const,
          badge: "Llega pronto",
        },
        {
          icon: "flask" as const,
          title: "Laboratorio de escenarios",
          description: "Simula lluvias intensas, picos turísticos y obras para anticiparte.",
          bullets: ["Sliders intuitivos", "Guardado en local"] as const,
          badge: "En prototipo",
        },
        {
          icon: "report" as const,
          title: "Informes",
          description: "PDF listos para enviar con mapas, métricas clave y recomendaciones.",
          bullets: ["Portada personalizable", "Notas de equipo"] as const,
          badge: "Previsto",
        },
      ],
    },
    steps: {
      title: "Tu flujo en ArchéoSense",
      items: [
        { title: "Observa", description: "Llegas al panel y detectas qué cambió anoche." },
        { title: "Investiga", description: "Abres la ficha, ves factores críticos y plan sugerido." },
        { title: "Actúas", description: "Asignas acciones, guardas escenarios y exportas informes." },
      ] as const,
    },
    closing: {
      title: "¿Nos ayudas a pulirlo?",
      description: "Explora las vistas demo y cuéntanos qué necesitas priorizar en tu equipo.",
      primary: "Explorar módulos",
      secondary: "Enviar feedback",
    },
  },
  eu: {
    hero: {
      tag: "Lan eremua",
      title: "Hemen egongo da zure eguneroko aginte mahaia",
      description:
        "KPI, alerta eta moduluetarako sarbide bizkorrak bateratuko dituen panela amaitzen ari gara. Laster ikusiko duzu dena begirada bakarrean.",
      primary: "Ikusi nolakoa izango den",
      secondary: "Ireki demo-fitxak",
      highlights: [
        "Lehentasun semaforo argia",
        "Giza hizkeran azalduko diren alertak",
        "Eragin estimatua duten neurriak",
      ] as const,
    },
    map: {
      badge: "Mapa diseinatzen",
      title: "Honela ikusiko duzu mapa",
      description:
        "Mapak arriskuaren arabera koloreztutako clusterrak, bilatzailea eta alboko panel bizkorra izango ditu, gomendatutako ekintzekin.",
      features: [
        "Arrisku mailaren arabera kolore eta clusterra",
        "Herrialde, material eta sentikortasunaren araberako iragazkiak",
        "Fitxa osoa irekitzeko edo triage planifikatzeko estekak",
      ] as const,
      actions: [
        { label: "Ireki adibide-fitxa", href: "/app/site/1" },
        { label: "Ikusi lehentasunen zerrenda", href: "/app/triage" },
      ] as const,
    },
    modules: {
      title: "Hurrengo aktibazioak",
      description: "Modulu bakoitzak erabaki hobeak hartzeko testuinguru desberdina eskainiko du.",
      items: [
        {
          icon: "table" as const,
          title: "Triage",
          description: "Arrisku eta presioaren arabera ordenatutako taula, ikuskapenak planifikatzeko.",
          bullets: ["Iragazki konbinatuak", "CSV esportazioa"] as const,
          badge: "Laster",
        },
        {
          icon: "flask" as const,
          title: "Eszenario laborategia",
          description: "Euri bortitza, bisita gailurra edo obrak simulatu ahal izango dituzu.",
          bullets: ["Slider errazak", "Gordetze lokala"] as const,
          badge: "Prototipoan",
        },
        {
          icon: "report" as const,
          title: "Txostenak",
          description: "Mapak, metrikak eta gomendioak jasoko dituzten PDFak prest edukiko dituzu.",
          bullets: ["Portada pertsonalizagarria", "Talde-oharrak"] as const,
          badge: "Aurrez ikusita",
        },
      ],
    },
    steps: {
      title: "Zure ibilbidea ArchéoSense-n",
      items: [
        { title: "Behatu", description: "Panelera iritsi eta zer aldatu den ikusiko duzu." },
        { title: "Aztertu", description: "Fitxa ireki, faktore kritikoak eta plana ikusiko dituzu." },
        { title: "Ekin", description: "Ekintzak esleitu, eszenarioak gorde eta txostenak sortu." },
      ] as const,
    },
    closing: {
      title: "Lagundu nahi diguzu?",
      description: "Demo ikuspegiak arakatu eta esan zer beharko zenuketen taldean lehentasunak argitzeko.",
      primary: "Moduluak arakatu",
      secondary: "Bidali iritzia",
    },
  },
} as const;

export function DashboardClient() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="flex flex-col gap-14">
      <section className="glass hairline soft rounded-3xl p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <Badge tone="neutral">{copy.hero.tag}</Badge>
            <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">{copy.hero.title}</h1>
            <p className="text-base text-slate-600 lg:text-lg">{copy.hero.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link className="btn btn-primary" href="#mapa">
                {copy.hero.primary}
              </Link>
              <Link className="btn btn-ghost" href="/app/site/1">
                {copy.hero.secondary}
              </Link>
            </div>
          </div>
          <ul className="grid w-full max-w-sm gap-3 text-sm text-slate-600">
            {copy.hero.highlights.map((item) => (
              <li className="glass hairline rounded-2xl px-4 py-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="glass hairline rounded-3xl bg-gradient-to-br from-white/70 via-white to-indigo-50 p-8 md:p-10"
        id="mapa"
      >
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="space-y-5">
            <Badge tone="neutral">{copy.map.badge}</Badge>
            <h2 className="text-2xl font-semibold lg:text-3xl">{copy.map.title}</h2>
            <p className="text-base text-slate-600 lg:text-lg">{copy.map.description}</p>
            <ul className="feature-card-list">
              {copy.map.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              {copy.map.actions.map((action) => (
                <Link className="btn btn-soft" href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl bg-white/70 p-6 shadow-card">
            <Image
              alt={language === "es" ? "Ilustración del mapa" : "Maparen irudia"}
              className="w-full"
              height={320}
              src="/images/landing-hero.svg"
              width={360}
            />
          </div>
        </div>
      </section>

      <section className="glass hairline rounded-3xl p-8 md:p-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold lg:text-3xl">{copy.modules.title}</h2>
            <p className="text-base text-slate-600">{copy.modules.description}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {copy.modules.items.map((item) => (
            <FeatureCard
              badge={<span className="badge badge-neutral">{item.badge}</span>}
              bullets={item.bullets}
              description={item.description}
              icon={item.icon}
              key={item.title}
              title={item.title}
            />
          ))}
        </div>
      </section>

      <section className="glass hairline rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl font-semibold lg:text-3xl">{copy.steps.title}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {copy.steps.items.map((item) => (
            <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-soft" key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass hairline rounded-3xl bg-slate-900/95 p-10 text-white">
        <h2 className="text-2xl font-semibold lg:text-3xl">{copy.closing.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-200 lg:text-base">{copy.closing.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/app/triage">
            {copy.closing.primary}
          </Link>
          <Link className="btn btn-ghost" href="mailto:hello@archeosense.eu">
            {copy.closing.secondary}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DashboardClient;
