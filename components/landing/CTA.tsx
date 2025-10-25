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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-surface to-surface py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand/10 via-transparent to-transparent blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-10 text-center shadow-[0_45px_110px_-70px_rgba(37,99,235,0.55)] md:p-14">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title[language]}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">{lead[language]}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primary.href}
              aria-label={primary.label[language]}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {primary.label[language]}
              <ArrowRight aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </Link>
            <Link
              href={secondary.href}
              aria-label={secondary.label[language]}
              className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-6 py-2.5 text-sm font-semibold text-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/60"
            >
              {secondary.label[language]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
