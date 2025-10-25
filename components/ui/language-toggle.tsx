"use client";

import { useLanguage } from "components/providers/language-context";

const LABELS = {
  es: "ES",
  eu: "EU",
} as const;

export function LanguageToggle({ compact }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Idioma"
      className={`language-toggle ${compact ? "language-toggle-compact" : ""}`.trim()}
      role="group"
    >
      {(Object.keys(LABELS) as Array<keyof typeof LABELS>).map((code) => {
        const active = language === code;
        return (
          <button
            key={code}
            className={active ? "is-active" : ""}
            onClick={() => setLanguage(code)}
            type="button"
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
