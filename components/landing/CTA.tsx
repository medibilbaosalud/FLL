"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { useLanguage } from "components/providers/language-context";
import type { LocalizedString } from "lib/landing";

type CtaProps = {
  title: LocalizedString;
  lead: LocalizedString;
  primary: { label: LocalizedString; href: string };
  secondary: { label: LocalizedString; href: string };
};

export default function CTA({ title, lead, primary, secondary }: CtaProps) {
  const { language } = useLanguage();

  return (
    <section className="radial-fade py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl border border-white/70 px-6 py-12 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title[language]}
          </h2>
          <p className="mt-3 text-lg text-slate-600 sm:text-xl">{lead[language]}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {primary.label[language]}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              {secondary.label[language]}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
