import { LanguageText } from "./LanguageText";
import type { LocalizedString } from "lib/landing";

type RoadmapProps = {
  title: LocalizedString;
  items: LocalizedString[];
};

export default function Roadmap({ title, items }: RoadmapProps) {
  return (
    <section className="py-16">
      <header className="max-w-2xl space-y-3">
        <LanguageText value={title} as="h2" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" />
      </header>
      <div className="mt-10 space-y-6 border-l border-slate-200 pl-6">
        {items.map((item) => (
          <article key={item.es} className="relative pl-6">
            <span className="absolute -left-9 top-1.5 h-3 w-3 rounded-full bg-slate-900" aria-hidden />
            <LanguageText value={item} as="p" className="text-base text-slate-600" />
          </article>
        ))}
      </div>
    </section>
  );
}
