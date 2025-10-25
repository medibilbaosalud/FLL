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
      className="landing-container roadmap-section section-spacing"
    >
      <div id="roadmap-heading">
        <LanguageText value={title} as="h2" className="vision-heading" />
      </div>
      <div className="roadmap-list">
        {items.map((item, index) => {
          const Icon = timelineIcons[index] ?? Satellite;
          return (
            <article key={item.es} className="roadmap-item">
              <span className="roadmap-dot" aria-hidden />
              <span className="stat-icon" aria-hidden>
                <Icon size={18} />
              </span>
              <LanguageText value={item} as="p" className="roadmap-text" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
