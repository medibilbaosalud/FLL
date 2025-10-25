"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { useLanguage } from "components/providers/language-context";
import type { LocalizedString } from "lib/landing";

type HeroCta = {
  label: LocalizedString;
  href: string;
};

type Metric = {
  label: LocalizedString;
  value: LocalizedString;
};

type Highlight = {
  label: LocalizedString;
};

type HeroProps = {
  title: LocalizedString;
  lead: LocalizedString;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  metrics: Metric[];
  highlights: Highlight[];
};

export default function Hero({ title, lead, primaryCta, secondaryCta, metrics, highlights }: HeroProps) {
  const { language } = useLanguage();

  return (
    <section className="relative radial-fade overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-white/0" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-6 py-10 sm:px-12 sm:py-16 relative overflow-hidden">
          <div className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" aria-hidden />
          <div className="absolute -right-32 bottom-[-40px] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between relative">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <Sparkles className="h-4 w-4 text-indigo-500" aria-hidden />
                {highlights[0]?.label[language] ?? ""}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                {title[language]}
              </h1>
              <p className="text-lg text-slate-600 sm:text-xl">{lead[language]}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  {primaryCta.label[language]}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
                >
                  {secondaryCta.label[language]}
                </Link>
              </div>
            </div>
            <dl className="grid w-full max-w-sm grid-cols-1 gap-4 text-left sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label.es}
                  className="glass rounded-3xl border border-white/60 px-5 py-6 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                >
                  <dt className="text-sm text-slate-500">{metric.label[language]}</dt>
                  <dd className="mt-2 text-3xl font-semibold tracking-tight">{metric.value[language]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {highlights.slice(1).map((item) => (
              <span
                key={item.label.es}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-medium shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden />
                {item.label[language]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
