import { Filter, Map, Zap } from "lucide-react";

import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type VisionItem = {
  icon: "map" | "filter" | "bolt";
  title: LocalizedString;
  body: LocalizedString;
};

type VisionProps = {
  title: LocalizedString;
  lead: LocalizedString;
  items: VisionItem[];
};

const iconMap = {
  map: Map,
  filter: Filter,
  bolt: Zap,
};

export default function Vision({ title, lead, items }: VisionProps) {
  return (
    <section aria-labelledby="vision" className="landing-container vision-section section-spacing-lg" id="vision">
      <header>
        <LanguageText value={title} as="h2" className="vision-heading" />
        <LanguageText value={lead} as="p" className="vision-subhead" />
      </header>
      <div className="vision-grid">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <article key={item.title.es} className="vision-card">
              <span className="vision-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <LanguageText value={item.title} as="h3" className="vision-title" />
              <LanguageText value={item.body} as="p" className="vision-body" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
