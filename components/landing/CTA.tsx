"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "components/providers/language-context";
import type { LocalizedString } from "lib/landing";

type CtaAction = {
  label: LocalizedString;
  href: string;
};

type CtaProps = {
  title: LocalizedString;
  lead: LocalizedString;
  primary: CtaAction;
  secondary: CtaAction;
};

export default function CTA({ title, lead, primary, secondary }: CtaProps) {
  const { language } = useLanguage();

  return (
    <section className="cta-section">
      <div className="landing-container">
        <div className="cta-card">
          <h2 className="cta-title">{title[language]}</h2>
          <p className="cta-lead">{lead[language]}</p>
          <div className="cta-actions">
            <Link href={primary.href} className="btn btn-brand" aria-label={primary.label[language]}>
              {primary.label[language]}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={secondary.href} className="btn btn-ghost" aria-label={secondary.label[language]}>
              {secondary.label[language]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
