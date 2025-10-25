import { FileDown, RadioReceiver, Satellite, SlidersHorizontal } from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type RoadmapProps = {
  title: LocalizedString;
  items: LocalizedString[];
};

const timelineIcons = [Satellite, SlidersHorizontal, FileDown, RadioReceiver];

export default function Roadmap({ title, items }: RoadmapProps) {
  return (
    <section
      aria-labelledby="roadmap-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="space-y-6">
        <div id="roadmap-heading">
          <LanguageText value={title} as="h2" className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl" />
        </div>
        <div className="relative grid gap-4 border-l border-black/5 pl-8">
          {items.map((item, index) => {
            const Icon = timelineIcons[index] ?? Satellite;
            return (
              <article
                key={item.es}
                className="relative flex items-start gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-elev transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="absolute -left-12 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-brand/40 bg-brand/15 text-brand shadow-sm">
                  <Icon size={16} aria-hidden />
                </span>
                <LanguageText value={item} as="p" className="text-sm text-muted sm:text-base" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
