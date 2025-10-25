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
      <div className="space-y-8">
        <div id="roadmap-heading">
          <LanguageText value={title} as="h2" className="font-display text-3xl tracking-tight text-ink sm:text-4xl" />
        </div>
        <div className="relative grid gap-5 border-l border-black/5 pl-10">
          {items.map((item, index) => {
            const Icon = timelineIcons[index] ?? Satellite;
            return (
              <article
                key={item.es}
                className="timeline-card relative"
              >
                <span className="timeline-dot">
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
