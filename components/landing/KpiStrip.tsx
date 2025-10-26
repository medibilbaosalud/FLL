import { AlertTriangle, Clock, Globe2, Map } from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

const icons = [Map, AlertTriangle, Clock, Globe2];
const footnotes: LocalizedString[] = [
  {
    es: "Colecciones demo sincronizadas",
    eu: "Bilduma demoak sinkronizatuta",
  },
  {
    es: "Alertas que vigilan cada turno",
    eu: "Txandak gainbegiratzen dituzten alertak",
  },
  {
    es: "Dato más reciente procesado",
    eu: "Azkenengo prozesatutako datua",
  },
  {
    es: "Biomas cubiertos en el piloto",
    eu: "Pilotuak estaltzen dituen biomak",
  },
];

type KpiItem = {
  value: LocalizedString;
  label: LocalizedString;
};

type KpiStripProps = {
  items: KpiItem[];
};

export default function KpiStrip({ items }: KpiStripProps) {
  return (
    <section aria-labelledby="status-strip" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
      <h2 id="status-strip" className="sr-only">
        Estado general
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="list">
        {items.slice(0, 4).map((item, index) => {
          const Icon = icons[index] ?? Map;
          return (
            <article
              key={item.label.es}
              className="metric-card text-center sm:text-left"
              role="listitem"
            >
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted sm:justify-start">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/15 to-blue-400/15 text-brand">
                  <Icon size={18} aria-hidden />
                </span>
                <LanguageText value={item.label} />
              </div>
              <LanguageText value={item.value} as="p" className="metric-value" />
              <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              <LanguageText value={footnotes[index] ?? footnotes[0]} as="p" className="text-xs text-muted" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
