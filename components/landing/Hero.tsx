"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { useLanguage } from "components/providers/language-context";
import type { LocalizedString } from "lib/landing";

export type HeroCta = {
  label: LocalizedString;
  href: string;
};

export type HeroProps = {
  badge: LocalizedString;
  title: LocalizedString;
  lead: LocalizedString;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  highlights: LocalizedString[];
};

export default function Hero({ badge, title, lead, primaryCta, secondaryCta, highlights }: HeroProps) {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-white">
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-72 bg-gradient-to-b from-brand/15 via-transparent to-transparent blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-16 pt-20 sm:px-6 md:flex-row md:items-center md:pb-20 md:pt-28 lg:px-8">
        <div className="flex-1 space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-sm font-semibold text-brand shadow-sm ring-1 ring-black/5">
            <Sparkles aria-hidden size={16} />
            {badge[language]}
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
            {title[language]}
          </h1>
          <p className="max-w-2xl text-base text-muted sm:text-lg">
            {lead[language]}
          </p>
          <div className="flex flex-wrap items-center gap-3" role="group" aria-label="ArchéoSense hero actions">
            <Link
              href={primaryCta.href}
              aria-label={primaryCta.label[language]}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {primaryCta.label[language]}
              <ArrowRight aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </Link>
            <Link
              href={secondaryCta.href}
              aria-label={secondaryCta.label[language]}
              className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-6 py-2.5 text-sm font-semibold text-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/60"
            >
              {secondaryCta.label[language]}
            </Link>
          </div>
          {highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-sm text-muted">
              {highlights.map((item) => (
                <li
                  key={item.es}
                  className="rounded-full border border-black/5 bg-white/70 px-3 py-1 shadow-sm"
                >
                  {item[language]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex max-w-md flex-1 flex-col items-center gap-4">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_30px_70px_-45px_rgba(37,99,235,0.45)]">
            <Image
              src="/images/landing-hero.svg"
              alt={title[language]}
              width={640}
              height={480}
              className="h-full w-full object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          </div>
          <div className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white/80 px-4 py-3 text-xs text-muted shadow-sm">
            <span>{badge[language]}</span>
            <span className="font-medium text-ink">ArchéoSense demo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
