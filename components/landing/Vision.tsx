import Image from "next/image";
import {
  Activity,
  Filter,
  Map,
  MousePointerClick,
  Target,
  Zap,
} from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type VisionItem = {
  icon: "map" | "filter" | "bolt";
  title: LocalizedString;
  body: LocalizedString;
};

type VisionPreviewCard = {
  icon: "target" | "pulse" | "pointer";
  title: LocalizedString;
  body: LocalizedString;
};

type VisionPreview = {
  badge: LocalizedString;
  caption: LocalizedString;
  cards: VisionPreviewCard[];
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

const previewIconMap = {
  target: Target,
  pulse: Activity,
  pointer: MousePointerClick,
};

export default function Vision({ title, lead, items, preview }: VisionProps) {
  return (
    <section
      aria-labelledby="vision"
      className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8"
      id="mapa"
    >
      <div className="space-y-12">
        <header className="mx-auto max-w-3xl space-y-4 text-center md:text-left">
          <LanguageText
            value={title}
            as="h2"
            className="font-display text-3xl tracking-tight text-ink sm:text-4xl"
          />
          <LanguageText value={lead} as="p" className="text-balance text-base text-muted sm:text-lg" />
        </header>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <article className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2.6rem] border border-white/75 bg-white/85 shadow-[0_46px_130px_-70px_rgba(37,99,235,0.5)] lg:max-w-none">
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
            <div className="relative space-y-5 px-6 pb-7">
              <LanguageText value={preview.caption} as="p" className="text-balance text-sm font-semibold text-ink" />
              <div className="grid gap-3 place-items-center sm:grid-cols-2 sm:place-items-stretch">
                {preview.cards.map((card) => {
                  const Icon = previewIconMap[card.icon] ?? Target;
                  return (
                    <div key={card.title.es} className="map-preview-card">
                      <span className="map-preview-icon">
                        <Icon size={16} aria-hidden />
                      </span>
                      <div className="space-y-1">
                        <LanguageText value={card.title} as="p" className="text-sm font-semibold text-ink" />
                        <LanguageText value={card.body} as="p" className="text-balance text-xs text-muted" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
          <div className="grid place-items-center gap-4 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-1">
            {items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <article
                  key={item.title.es}
                  className="feature-card w-full"
                >
                  <span className="feature-icon">
                    <Icon size={20} aria-hidden />
                  </span>
                  <LanguageText value={item.title} as="h3" className="mt-4 text-balance text-lg font-semibold text-ink" />
                  <LanguageText value={item.body} as="p" className="mt-2 text-balance text-sm text-muted" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
