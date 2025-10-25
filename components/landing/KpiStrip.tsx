import { AlertTriangle, Clock, Globe2, Map } from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

const icons = [Map, AlertTriangle, Clock, Globe2];

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
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-elev transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              role="listitem"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-muted">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={18} aria-hidden />
                </span>
                <LanguageText value={item.label} />
              </span>
              <LanguageText
                value={item.value}
                as="p"
                className="mt-4 text-3xl font-semibold tracking-tight text-ink"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
