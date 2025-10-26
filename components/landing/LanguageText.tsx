"use client";

import { useLanguage } from "components/providers/language-context";
import type { LocalizedString } from "lib/landing";

type LanguageTextProps = {
  value: LocalizedString;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export function LanguageText({ value, as: Component = "span", className }: LanguageTextProps) {
  const { language } = useLanguage();
  return <Component className={className}>{value[language]}</Component>;
}
