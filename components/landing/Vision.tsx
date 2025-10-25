import Image from "next/image";
import { Filter, Map, Zap } from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type VisionItem = {
  icon: "map" | "filter" | "bolt";
  title: LocalizedString;
  body: LocalizedString;
};

type VisionPreview = {
  badge: LocalizedString;
  caption: LocalizedString;
  notes: LocalizedString[];
};

type VisionProps = {
  title: LocalizedString;
  lead: LocalizedString;
  items: VisionItem[];
  preview: VisionPreview;
};

const iconMap = {
  map: Map,
  filter: Filter,
  bolt: Zap,
};

export default function Vision({ title, lead, items, preview }: VisionProps) {
  return (
    <section
      aria-labelledby="vision"
      className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8"
      id="mapa"
    >
      <div className="space-y-10">
        <header className="max-w-3xl space-y-4">
          <LanguageText value={title} as="h2" className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl" />
          <LanguageText value={lead} as="p" className="text-base text-muted sm:text-lg" />
        </header>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <article className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 shadow-[0_40px_110px_-60px_rgba(37,99,235,0.45)]">
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand shadow-sm">
              <LanguageText value={preview.badge} />
            </div>
            <Image
              src="/images/landing-pri.svg"
              alt={preview.caption.es}
              width={800}
              height={520}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />
            <div className="relative space-y-3 px-6 pb-6">
              <LanguageText value={preview.caption} as="p" className="text-sm font-semibold text-ink" />
              <ul className="flex flex-wrap gap-2 text-xs text-muted">
                {preview.notes.map((note) => (
                  <li key={note.es} className="rounded-full border border-black/5 bg-white/80 px-3 py-1 shadow-sm">
                    <LanguageText value={note} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <article
                  key={item.title.es}
                  className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-elev transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon size={20} aria-hidden />
                  </span>
                  <LanguageText value={item.title} as="h3" className="text-lg font-semibold text-ink" />
                  <LanguageText value={item.body} as="p" className="mt-2 text-sm text-muted" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
