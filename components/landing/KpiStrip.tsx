import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type KpiItem = {
  value: LocalizedString;
  label: LocalizedString;
};

type KpiStripProps = {
  items: KpiItem[];
};

export default function KpiStrip({ items }: KpiStripProps) {
  return (
    <section className="py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.label.es}
            className="glass rounded-3xl border border-white/60 px-6 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          >
            <dl>
              <LanguageText value={item.label} as="dt" className="text-sm text-slate-500" />
              <LanguageText
                value={item.value}
                as="dd"
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-900"
              />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
