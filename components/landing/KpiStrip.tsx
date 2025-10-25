import { Map, AlertTriangle, Clock, Globe2 } from "lucide-react";

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
    <section aria-labelledby="status-strip" className="landing-container section-spacing">
      <h2 id="status-strip" className="sr-only">
        Estado general
      </h2>
      <div className="hero-stats" role="list">
        {items.slice(0, 4).map((item, index) => {
          const Icon = icons[index] ?? Map;
          return (
            <article key={item.label.es} className="stat-card" role="listitem">
              <span className="stat-label">
                <span className="stat-icon" aria-hidden>
                  <Icon size={18} />
                </span>
                <LanguageText value={item.label} />
              </span>
              <LanguageText value={item.value} as="p" className="stat-value" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
