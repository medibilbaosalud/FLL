import { Bolt, Filter, Map } from "lucide-react";
import type { ComponentType } from "react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type VisionItem = {
  title: LocalizedString;
  body: LocalizedString;
  icon: "map" | "filter" | "bolt";
};

type VisionProps = {
  title: LocalizedString;
  lead: LocalizedString;
  items: VisionItem[];
};

const ICONS: Record<VisionItem["icon"], ComponentType<{ className?: string }>> = {
  map: Map,
  filter: Filter,
  bolt: Bolt,
};

export default function Vision({ title, lead, items }: VisionProps) {
  return (
    <section id="vision" className="py-16">
      <div className="space-y-12">
        <header className="max-w-2xl space-y-3">
          <LanguageText value={title} as="h2" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" />
          <LanguageText value={lead} as="p" className="text-lg text-slate-600 sm:text-xl" />
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.title.es}
                className="glass rounded-3xl border border-white/70 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <LanguageText value={item.title} as="h3" className="text-xl font-semibold text-slate-900" />
                <LanguageText value={item.body} as="p" className="mt-3 text-sm text-slate-600" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
