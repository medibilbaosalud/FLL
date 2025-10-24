import i18next, { i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const client = i18next.createInstance({
  fallbackLng: "eu",
  supportedLngs: ["eu", "en", "es"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false
  }
});

if (typeof window !== "undefined" && !client.isInitialized) {
  client
    .use(LanguageDetector)
    .use(HttpBackend)
    .init({
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        caches: ["localStorage"]
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json"
      }
    })
    .catch((err) => console.error("i18n init errorea", err));
}

export function getI18n(): i18n {
  return client;
}
