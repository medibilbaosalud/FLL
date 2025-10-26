"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "es" | "eu";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "archeosense-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "es" || stored === "eu") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const value = useMemo(() => ({ language, setLanguage: handleSetLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export type { Language };
