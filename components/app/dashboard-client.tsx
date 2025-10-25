"use client";

import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { Badge } from "components/ui/badge";
import { FeatureCard } from "components/ui/feature-card";
import { Icon } from "components/ui/icon";

const COPY = {
  es: {
    hero: {
      tag: "Espacio de trabajo",
      title: "Tu control diario está casi listo",
      description:
        "Muy pronto abrirás un tablero vivo con KPI, alertas y accesos directos. Mientras tanto, te mostramos cómo se sentirá.",
      primary: "Recorrido guiado",
      secondary: "Ver fichas demo",
      tiles: [
        {
          icon: "spark" as const,
          title: "Resumen al instante",
          description: "Aquí aparecerá un mosaico respirable con PRI, tendencias y alertas clave.",
        },
        {
          icon: "map" as const,
          title: "Alertas explicadas",
          description: "Cada tarjeta contará qué factor dispara el riesgo y la acción sugerida.",
        },
        {
          icon: "shield" as const,
          title: "Protección activa",
          description: "Las zonas sensibles llegarán ofuscadas y con registro de cambios.",
        },
      ] as const,
    },
    map: {
      badge: "Mapa en construcción",
      title: "Así explorarás el territorio",
      description:
        "Estamos diseñando un mapa táctil con clusters, filtros y panel lateral para entender cada sitio en segundos.",
      note: "Mientras lo terminamos, puedes abrir los ejemplos y revisar la lista prioritaria.",
      callouts: [
        {
          icon: "map" as const,
          title: "Clusters vivos",
          description: "Colores por nivel de riesgo y zoom suave hasta cada yacimiento.",
        },
        {
          icon: "table" as const,
          title: "Panel lateral",
          description: "Top drivers, tendencia y acciones sugeridas sin salir del mapa.",
        },
        {
          icon: "search" as const,
          title: "Filtros inteligentes",
          description: "Búsqueda por nombre, país o material con coincidencia difusa.",
        },
      ] as const,
      placeholderTitle: "Mapa interactivo en progreso",
      placeholderDescription:
        "Aquí verás MapLibre con datos locales, leyenda adaptable y controles de riesgo que reaccionan al instante.",
      footerNote: "Mockup conceptual mientras integramos datos reales.",
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
      title: "Zure eguneroko aginte-mahaia prest dagoenbidean",
      description:
        "Oso laster KPIak, alertak eta sarbide azkarrak izango dituen taula bizia zabalduko dugu. Bien bitartean, ikus nola sentituko den.",
      primary: "Bisita gidatua",
      secondary: "Ireki demo-fitxak",
      tiles: [
        {
          icon: "spark" as const,
          title: "Berehalako laburpena",
          description: "Hemen agertuko da PRIa, joerak eta alertak modu arinean.",
        },
        {
          icon: "map" as const,
          title: "Alertak ulertuta",
          description: "Faktore eragilea eta gomendatutako ekintza hizkera lausoan azalduko dira.",
        },
        {
          icon: "shield" as const,
          title: "Babes aktiboa",
          description: "Gune sentikorrak ofuskatuta eta aldaketen erregistroarekin ikusiko dira.",
        },
      ] as const,
    },
    map: {
      badge: "Mapa prestatzen",
      title: "Honela arakatuko dugu lurraldea",
      description:
        "MapLibre oinarritutako mapa eraikitzen ari gara, cluster dinamiko eta iragazki adimendunekin, gunea segundo batean ulertzeko.",
      note: "Amaitzen dugun bitartean, ireki adibide-fitxak edo begiratu lehentasunen zerrenda.",
      callouts: [
        {
          icon: "map" as const,
          title: "Cluster biziak",
          description: "Arrisku mailaren arabera koloreztuta eta zoom leunarekin.",
        },
        {
          icon: "table" as const,
          title: "Alboko panela",
          description: "Top-driver, joera eta gomendioak mapatik irten gabe.",
        },
        {
          icon: "search" as const,
          title: "Iragazki adimentsuak",
          description: "Izen, herrialde edo materialaren arabera bilaketa lausoarekin.",
        },
      ] as const,
      placeholderTitle: "Mapa interaktiboa martxan jartzen",
      placeholderDescription:
        "Hemen ikusiko duzu MapLibre datu lokalekin, legenda moldagarriarekin eta arriskuen kontrol erreaktiboekin.",
      footerNote: "Kontzeptu-irudia datu errealak gehitu bitartean.",
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
      <section className="relative overflow-hidden glass hairline soft rounded-3xl p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-200/40 via-white/30 to-transparent" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-5">
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
          <div className="grid gap-4">
            {copy.hero.tiles.map((tile) => (
              <div
                className="group rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
                key={tile.title}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-inner">
                    <Icon className="h-5 w-5" name={tile.icon} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{tile.title}</p>
                    <p className="text-xs text-slate-600">{tile.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden glass hairline rounded-3xl bg-gradient-to-br from-white/75 via-white to-indigo-50 p-8 md:p-10"
        id="mapa"
      >
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="space-y-5">
            <Badge tone="neutral">{copy.map.badge}</Badge>
            <h2 className="text-2xl font-semibold lg:text-3xl">{copy.map.title}</h2>
            <p className="text-base text-slate-600 lg:text-lg">{copy.map.description}</p>
            <p className="text-sm text-slate-500">{copy.map.note}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {copy.map.actions.map((action) => (
                <Link className="btn btn-soft" href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-slate-900 text-white shadow-card">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-slate-900 to-slate-900" />
            <div className="relative space-y-5 p-8">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  {copy.map.placeholderTitle}
                </p>
                <p className="mt-3 text-sm text-white/80 lg:text-base">{copy.map.placeholderDescription}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {copy.map.callouts.map((item) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-white/20"
                    key={item.title}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Icon className="h-4 w-4" name={item.icon} />
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/70">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60">{copy.map.footerNote}</p>
            </div>
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
