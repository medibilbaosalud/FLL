"use client";

import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { Icon } from "components/ui/icon";

const COPY = {
  es: {
    hero: {
      tag: "Control diario",
      title: "Todo el riesgo resumido en un vistazo sereno",
      subtitle:
        "Te adelantamos cómo lucirá el panel cuando conectemos datos climáticos, satelitales y de campo.",
      ctas: {
        primary: { label: "Explorar módulos", href: "/app/triage" },
        secondary: { label: "Ver ficha demo", href: "/app/site/1" },
      },
      metrics: [
        { label: "Sitios listos", value: "12" },
        { label: "Alertas críticas", value: "3" },
        { label: "Actualización", value: "Hace 12 min" },
      ],
      highlights: [
        { icon: "spark" as const, text: "Semáforo PRI" },
        { icon: "shield" as const, text: "Sitios sensibles protegidos" },
        { icon: "map" as const, text: "Mapa + tabla sincronizados" },
      ],
    },
    map: {
      title: "Mapa inteligente en preparación",
      body:
        "Aquí verás clusters por riesgo, filtros suaves y acceso instantáneo a cada ficha cuando activemos el motor.",
      chips: ["Clusters suaves", "Filtro riesgo", "Panel lateral", "Guardados rápidos"],
      previewTitle: "Vista previa conceptual",
      note: "Mockup ilustrativo mientras integramos las capas de datos.",
      actions: [
        { label: "Recorrer maqueta", href: "/" },
        { label: "Prioridades demo", href: "/app/triage" },
      ],
    },
    modules: {
      title: "Lo siguiente en llegar",
      items: [
        {
          icon: "table" as const,
          title: "Triage",
          description: "Tabla viva para decidir visitas y exportar CSV en segundos.",
        },
        {
          icon: "flask" as const,
          title: "Escenarios",
          description: "Simula lluvia, calor y turismo para ver el impacto al instante.",
        },
        {
          icon: "report" as const,
          title: "Informes",
          description: "PDF con mapa, métricas y acciones listos para compartir.",
        },
        {
          icon: "settings" as const,
          title: "Ajustes",
          description: "Pondera factores y define umbrales de color para tu equipo.",
        },
      ],
    },
    closing: {
      title: "¿Quieres probarlo antes?",
      subtitle: "Estamos afinando datos reales: tu feedback ahora marca la diferencia.",
      primary: { label: "Escríbenos", href: "mailto:hola@archeosense.demo" },
      secondary: { label: "Ver roadmap", href: "#" },
    },
  },
  eu: {
    hero: {
      tag: "Eguneroko kontrola",
      title: "Arriskuaren ikuspegi lasaia begirada bakarrean",
      subtitle:
        "Hona hemen datu klimatikoak, sateliteak eta lurraldeko behaketak uztartzean izango den esperientzia.",
      ctas: {
        primary: { label: "Esploratu moduluak", href: "/app/triage" },
        secondary: { label: "Ireki demo-fitxa", href: "/app/site/1" },
      },
      metrics: [
        { label: "Prest dauden guneak", value: "12" },
        { label: "Alerta kritikoak", value: "3" },
        { label: "Eguneratzea", value: "Duela 12 min" },
      ],
      highlights: [
        { icon: "spark" as const, text: "PRI semaforoa" },
        { icon: "shield" as const, text: "Gune sentikorrak babestuta" },
        { icon: "map" as const, text: "Mapa + taula sinkronizatuta" },
      ],
    },
    map: {
      title: "Mapa adimenduna prestatzen",
      body:
        "Hemen ikusiko dituzu arriskuaren arabera koloreztatutako cluster-ak, iragazki leunak eta fitxara salto azkarra.",
      chips: ["Cluster leunak", "Arrisku iragazkia", "Alboko panela", "Bide azkarrak"],
      previewTitle: "Aurrebista kontzeptuala",
      note: "Datuak konektatzen ditugun bitarteko maketa.",
      actions: [
        { label: "Bisita maketa", href: "/" },
        { label: "Lehentasunak demo", href: "/app/triage" },
      ],
    },
    modules: {
      title: "Hurrengo aktibazioak",
      items: [
        {
          icon: "table" as const,
          title: "Triage",
          description: "Bisita planak erabakitzeko taula dinamikoa eta CSV esportazioa.",
        },
        {
          icon: "flask" as const,
          title: "Eszenarioak",
          description: "Euria, beroa eta turismoa simulatu eraginaren erantzuna ikusteko.",
        },
        {
          icon: "report" as const,
          title: "Txostenak",
          description: "Mapa, neurriak eta ekintzak jasotzen dituen PDF partekatzeko prest.",
        },
        {
          icon: "settings" as const,
          title: "Ezarpenak",
          description: "Faktoreak pisatu eta kolore atalaseak egokitu zure taldearentzat.",
        },
      ],
    },
    closing: {
      title: "Probatu nahi duzu lehenago?",
      subtitle: "Benetako datuak fintzen ari gara: zure ekarpenak orain erabakiak arintzen ditu.",
      primary: { label: "Idatzi gurekin", href: "mailto:hola@archeosense.demo" },
      secondary: { label: "Ikusi roadmap-a", href: "#" },
    },
  },
} as const;

const HERO_BG = "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

export default function AppHome() {
  const { language } = useLanguage();
  const content = COPY[language];

  return (
    <div className="space-y-16 pb-20">
      <HeroSection {...content.hero} />
      <MapPreview {...content.map} />
      <ModuleGrid {...content.modules} />
      <ClosingCallout {...content.closing} />
    </div>
  );
}

type HeroProps = (typeof COPY)["es"]["hero"];

function HeroSection({ tag, title, subtitle, ctas, metrics, highlights }: HeroProps) {
  return (
    <section className={`${HERO_BG} relative overflow-hidden rounded-[32px] px-8 py-12 text-white shadow-2xl`}> 
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--brand-weak)_0%,transparent_55%)] opacity-60" />
      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide backdrop-blur">{tag}</span>
          <h1 className="text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="text-lg text-white/80">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
              href={ctas.primary.href}
            >
              {ctas.primary.label}
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              href={ctas.secondary.href}
            >
              {ctas.secondary.label}
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 rounded-[28px] bg-white/5 p-6 backdrop-blur lg:max-w-sm">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 px-3 py-4 shadow-inner">
                <span className="block text-xs uppercase tracking-wide text-white/60">{item.label}</span>
                <span className="mt-1 text-lg font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80"
              >
                <Icon className="h-4 w-4" name={item.icon} />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type MapProps = (typeof COPY)["es"]["map"];

function MapPreview({ title, body, chips, previewTitle, note, actions }: MapProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]" id="mapa">
      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-3 text-base text-slate-600">{body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {chips.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 text-sm text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {actions.map((action) => (
            <Link
              key={action.href}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              href={action.href}
            >
              <Icon className="h-4 w-4" name="chevron" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#bfdbfe_0%,transparent_60%)] opacity-50" />
        <div className="relative flex h-full flex-col justify-between p-8">
          <header className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {previewTitle}
            </span>
            <h3 className="text-xl font-semibold text-slate-900">ArcheoMap Vision</h3>
            <p className="text-sm text-slate-600">
              Panel conceptual: clusters respirables, panel lateral y accesos rápidos para actuar antes de que suba el riesgo.
            </p>
          </header>
          <div className="flex flex-col gap-4 text-sm text-slate-600">
            <PreviewRow label="Clusters" value="Verde / Ámbar / Rojo" />
            <PreviewRow label="Filtro activo" value="PRI ≥ 0.45" />
            <PreviewRow label="Acción rápida" value="Abrir ficha y plan propuesto" />
          </div>
          <footer className="rounded-2xl bg-white/70 px-4 py-3 text-xs text-slate-500 shadow-inner">
            {note}
          </footer>
        </div>
      </div>
    </section>
  );
}

type ModulesProps = (typeof COPY)["es"]["modules"];

function ModuleGrid({ title, items }: ModulesProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
      <div
        key={item.title}
        className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/0 via-slate-900/0 to-slate-900/0 transition group-hover:from-slate-900/5 group-hover:via-slate-900/0 group-hover:to-slate-900/5" />
            <div className="relative flex h-full flex-col gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon className="h-5 w-5" name={item.icon} />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
              <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-slate-400">Próximamente</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type ClosingProps = (typeof COPY)["es"]["closing"];

function ClosingCallout({ title, subtitle, primary, secondary }: ClosingProps) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 p-10 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            href={primary.href}
          >
            {primary.label}
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            href={secondary.href}
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-inner">
      <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}
