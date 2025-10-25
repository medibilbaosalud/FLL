"use client";

import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { FeatureCard } from "components/ui/feature-card";
import { Icon } from "components/ui/icon";

const COPY = {
  es: {
    hero: {
      tag: "Espacio de trabajo",
      title: "Tu centro diario para cuidar los yacimientos",
      description:
        "Estamos ultimando un panel calmado donde verás el índice PRI, tendencias y alertas sin ruido. Aquí tienes un anticipo de la experiencia.",
      primary: "Recorrido guiado",
      secondary: "Ver fichas demo",
      highlights: [
        {
          icon: "spark" as const,
          title: "Visión 360°",
          description: "El tablero mostrará PRI, tendencia y confianza del dato en una sola mirada.",
        },
        {
          icon: "map" as const,
          title: "Mapa conectado",
          description: "Accede a cada yacimiento sin perder el contexto ni el historial de alertas.",
        },
        {
          icon: "shield" as const,
          title: "Sitios protegidos",
          description: "Las ubicaciones sensibles llegarán ofuscadas y con registro de cambios.",
        },
      ] as const,
      preview: {
        title: "Lo que tendrás a la vista",
        metrics: [
          { label: "Sitios monitorizados", value: "12" },
          { label: "Alertas críticas", value: "3" },
          { label: "Última sincronización", value: "Hace 12 min" },
        ] as const,
        note: "Mockup ilustrativo mientras conectamos los flujos de datos reales.",
      },
    },
    map: {
      badge: "Mapa inmersivo en camino",
      title: "Explora y prioriza sin prisas",
      description:
        "En esta vista reunirás clusters suaves, leyenda viva y panel lateral explicativo para decidir qué hacer primero.",
      features: [
        {
          icon: "map" as const,
          title: "Clusters con calma",
          description: "Agruparemos sitios por riesgo para moverte con fluidez entre regiones.",
        },
        {
          icon: "search" as const,
          title: "Búsqueda difusa",
          description: "Encuentra un sitio por nombre, país o material aunque no recuerdes la ortografía exacta.",
        },
        {
          icon: "table" as const,
          title: "Panel lateral",
          description: "Top-drivers, tendencia y acciones sugeridas sin abandonar el mapa.",
        },
        {
          icon: "shield" as const,
          title: "Modo sensible",
          description: "Coordenadas suavizadas y zoom limitado para los yacimientos delicados.",
        },
      ] as const,
      placeholder: {
        label: "Vista previa",
        headline: "Aquí verás MapLibre con datos locales y leyenda adaptable",
        body: "Podrás filtrar por país, nivel de riesgo o presión humana y guardar los focos que necesites vigilar.",
        chips: [
          "Zoom cinematográfico",
          "Controles de riesgo en vivo",
          "Panel lateral explicativo",
          "Atajos a la ficha",
        ] as const,
        note: "Diseño conceptual mientras integramos el motor interactivo.",
      },
      actions: [
        { label: "Abrir ficha demo", href: "/app/site/1" },
        { label: "Ver prioridades", href: "/app/triage" },
      ] as const,
    },
    modules: {
      title: "Lo que activaremos a continuación",
      description: "Cada módulo aportará un ángulo distinto para decidir mejor en el día a día.",
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
      title: "Zure eguneroko aginte-mahaia prest dago",
      description:
        "Panel lasai bat prestatzen ari gara, PRI indizea, joerak eta alertak ikus ditzazun zaratarik gabe. Hona hemen esperientziaren aurrerapen bat.",
      primary: "Bisita gidatua",
      secondary: "Ireki demo-fitxak",
      highlights: [
        {
          icon: "spark" as const,
          title: "Ikuspegi osoa",
          description: "Taulak PRIa, joera eta datuaren konfiantza erakutsiko ditu begirada bakarrean.",
        },
        {
          icon: "map" as const,
          title: "Mapa konektatua",
          description: "Gune bakoitzera sartuko zara testuingurua eta alerta historia galdu gabe.",
        },
        {
          icon: "shield" as const,
          title: "Gune sentikorrak",
          description: "Kokapen delikatuak ofuskatuta eta aldaketa-erregistroarekin iritsiko dira.",
        },
      ] as const,
      preview: {
        title: "Hasierako ikuspegia",
        metrics: [
          { label: "Gainbegiratutako guneak", value: "12" },
          { label: "Alertak kritikoak", value: "3" },
          { label: "Azken sinkronizazioa", value: "Duela 12 min" },
        ] as const,
        note: "Benetako datu-fluxuak konektatzen ditugun bitarteko maketa da.",
      },
    },
    map: {
      badge: "Mapa murgiltzailea bidean",
      title: "Arakatu eta lehenetsi presarik gabe",
      description:
        "Ikuspegi honetan cluster leunak, legenda bizia eta azalpen-panelek lagunduko dizute lehenetsi beharrekoa argitzen.",
      features: [
        {
          icon: "map" as const,
          title: "Cluster leunak",
          description: "Arriskuaren arabera taldekatuko ditugu guneak eskualdez eskualde arinki mugitzeko.",
        },
        {
          icon: "search" as const,
          title: "Bilaketa lausoa",
          description: "Izenaren, herrialdearen edo materialaren arabera aurkituko duzu gunea ortografia zehatza gabe ere.",
        },
        {
          icon: "table" as const,
          title: "Alboko panela",
          description: "Top driver, joera eta gomendioak mapa utzi gabe ikusiko dituzu.",
        },
        {
          icon: "shield" as const,
          title: "Modu sentikorra",
          description: "Kokapen arindua eta zoom murriztua gune delikatuentzat.",
        },
      ] as const,
      placeholder: {
        label: "Aurrebista",
        headline: "Hemen ikusiko duzu MapLibre datu lokal eta legenda moldakorrarekin",
        body: "Herrialde, arrisku maila edo presio humanoaren arabera iragaziko duzu eta zaindu beharreko fokuen zerrenda gordeko duzu.",
        chips: [
          "Zoom zinematikoa",
          "Arrisku-kontrolak bizirik",
          "Alboko azalpen-panela",
          "Fitxara bide zuzena",
        ] as const,
        note: "Motorraren garapena amaitu bitarteko diseinu kontzeptuala.",
      },
      actions: [
        { label: "Ireki demo-fitxa", href: "/app/site/1" },
        { label: "Ikusi lehentasunak", href: "/app/triage" },
      ] as const,
    },
    modules: {
      title: "Hurrengo aktibazioak",
      description: "Modulu bakoitzak testuinguru desberdina ekarriko du erabaki hobeak hartzeko.",
      items: [
        {
          icon: "table" as const,
          title: "Triage",
          description: "Arrisku eta presioaren arabera ordenatutako zerrenda ikuskapenak antolatzeko.",
          bullets: ["Iragazki konbinatuak", "CSV esportazioa"] as const,
          badge: "Laster",
        },
        {
          icon: "flask" as const,
          title: "Eszenario laborategia",
          description: "Euri bortitza, bisitari gailurra edo obrak simulatu eta aurrea hartu.",
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
        { title: "Aztertu", description: "Fitxa ireki eta faktore kritikoak eta plana ikusiko dituzu." },
        { title: "Ekin", description: "Ekintzak esleitu, eszenarioak gorde eta txostenak sortu." },
      ] as const,
    },
    closing: {
      title: "Lagundu nahi diguzu?",
      description: "Demo ikuspegiak arakatu eta esan zer behar duzu taldean lehentasunak argitzeko.",
      primary: "Moduluak arakatu",
      secondary: "Bidali iritzia",
    },
  },
} as const;

export function DashboardClient() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="space-y-20 px-4 pb-24 pt-10 md:px-10">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_40px_90px_-50px_rgba(15,23,42,0.9)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-14 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_55%)]" />
        </div>
        <div className="relative grid gap-12 p-8 md:p-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="space-y-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
              {copy.hero.tag}
            </span>
            <div className="space-y-5">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                {copy.hero.title}
              </h1>
              <p className="max-w-xl text-base text-white/70 md:text-lg">{copy.hero.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="#mapa">
                {copy.hero.primary}
              </Link>
              <Link className="btn btn-ghost" href="/app/site/1">
                {copy.hero.secondary}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {copy.hero.highlights.map((item) => (
                <div
                  className="group rounded-2xl bg-white/8 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur transition duration-300 hover:bg-white/12"
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
          </div>
          <div className="relative">
            <div className="relative rounded-[32px] bg-white/8 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white/80">{copy.hero.preview.title}</p>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  ArchéoSense
                </span>
              </div>
              <div className="mt-6 grid gap-4">
                {copy.hero.preview.metrics.map((metric) => (
                  <div
                    className="rounded-2xl bg-white/10 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                    key={metric.label}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/60">{metric.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-white/60">{copy.hero.preview.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden rounded-[36px] bg-white/80 p-8 shadow-card backdrop-blur md:p-12"
        id="mapa"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.18),transparent_60%)]" />
        <div className="relative grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-sm font-medium text-slate-600">
              {copy.map.badge}
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{copy.map.title}</h2>
              <p className="max-w-2xl text-base text-slate-600 md:text-lg">{copy.map.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.map.features.map((feature) => (
                <div
                  className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
                  key={feature.title}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/5 text-slate-900">
                      <Icon className="h-4 w-4" name={feature.icon} />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                      <p className="text-xs text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {copy.map.actions.map((action) => (
                <Link className="btn btn-soft" href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-900 text-white shadow-[0_40px_70px_-45px_rgba(30,64,175,0.65)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-24 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-slate-900/40 blur-3xl" />
            </div>
            <div className="relative space-y-6 p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{copy.map.placeholder.label}</p>
              <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                {copy.map.placeholder.headline}
              </h3>
              <p className="text-sm text-white/75 md:text-base">{copy.map.placeholder.body}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {copy.map.placeholder.chips.map((chip) => (
                  <li
                    className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
                    key={chip}
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                {copy.map.placeholder.note}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass hairline rounded-[32px] p-8 md:p-12">
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{copy.modules.title}</h2>
          <p className="max-w-2xl text-base text-slate-600 md:text-lg">{copy.modules.description}</p>
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

      <section className="glass hairline rounded-[32px] p-8 md:p-12">
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{copy.steps.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {copy.steps.items.map((item) => (
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-soft" key={item.title}>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-slate-950 p-10 text-white shadow-[0_40px_80px_-45px_rgba(15,23,42,0.9)] md:p-12">
        <h2 className="text-3xl font-semibold md:text-4xl">{copy.closing.title}</h2>
        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{copy.closing.description}</p>
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
