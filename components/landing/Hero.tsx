"use client";

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
    <section className="ambient hero-section">
      <div className="landing-container">
        <div className="hero-surface">
          <span className="hero-badge" aria-label={badge[language]}>
            <Sparkles aria-hidden size={16} />
            {badge[language]}
          </span>
          <h1 className="hero-title">{title[language]}</h1>
          <p className="hero-lead">{lead[language]}</p>
          <div className="hero-actions" role="group" aria-label="Hero call to actions">
            <Link href={primaryCta.href} className="btn btn-brand" aria-label={primaryCta.label[language]}>
              {primaryCta.label[language]}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={secondaryCta.href} className="btn btn-ghost" aria-label={secondaryCta.label[language]}>
              {secondaryCta.label[language]}
            </Link>
          </div>
          {highlights.length > 0 && (
            <ul className="hero-highlights" aria-label="Highlights">
              {highlights.map((item) => (
                <li key={item.es}>{item[language]}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
