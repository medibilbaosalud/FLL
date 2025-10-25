import es from "../public/locales/es/common.json" assert { type: "json" };
import eu from "../public/locales/eu/common.json" assert { type: "json" };

export type Language = "es" | "eu";

type LandingDictionary = {
  landing: {
    heroTitle: string;
    heroLead: string;
    heroPrimary: string;
    heroSecondary: string;
    kpiSites: string;
    kpiCritical: string;
    kpiUpdate: string;
    kpiCoverage: string;
    visionTitle: string;
    visionLead: string;
    visionItem1Title: string;
    visionItem1Body: string;
    visionItem2Title: string;
    visionItem2Body: string;
    visionItem3Title: string;
    visionItem3Body: string;
    roadmapTitle: string;
    roadmap1: string;
    roadmap2: string;
    roadmap3: string;
    roadmap4: string;
    ctaTitle: string;
    ctaLead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
};

type LandingCopy = Record<Language, LandingDictionary["landing"]>;

const copies: LandingCopy = {
  es: (es as LandingDictionary).landing,
  eu: (eu as LandingDictionary).landing,
};

export function getLandingCopy(): LandingCopy {
  return copies;
}

export type LocalizedString = {
  es: string;
  eu: string;
};

export function buildLocalizedString(key: keyof LandingDictionary["landing"]): LocalizedString {
  return {
    es: copies.es[key],
    eu: copies.eu[key],
  };
}
