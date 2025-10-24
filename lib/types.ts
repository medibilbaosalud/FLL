export type SiteValue = "lokala" | "nazionala" | "unesco";
export type Material = "piedra" | "adobe" | "madera" | "metal" | "nahasia";
export type Biome = "kostaldea" | "ibarbidea" | "basamortua" | "hirigunea" | "mendia";

export interface SiteFeatureProperties {
  id: string;
  izena: string;
  mota: string;
  materiala: Material;
  bioma: Biome;
  balioa: SiteValue;
  sentsiblea: boolean;
}

export interface SiteFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: SiteFeatureProperties;
}

export interface TimeSeriesPoint {
  data: string;
  euri_mm: number;
  tenperatura_c: number;
  lur_hezetasuna: number;
  ndvi: number;
  deformazio_proxy: number;
  bisitari_indizea: number;
}

export interface SiteTimeSeries {
  id: string;
  serie: TimeSeriesPoint[];
}

export interface RiskFactors {
  hazard: number;
  vulnerability: number;
  exposure: number;
  value: number;
}

export interface RiskResult {
  siteId: string;
  pri: number;
  priLabel: "berdea" | "horia" | "gorria";
  factors: RiskFactors;
  topDrivers: Array<{ key: keyof RiskFactors; contribution: number }>;
  confidence: "altu" | "ertain" | "baxu";
}

export interface ScenarioInput {
  euriAldaketa: number;
  tenperaturaDelta: number;
  hezetasunaAldaketa: number;
  bisitariAldaketa: number;
  obraBibrazioa: boolean;
}

export interface ActionPlanItem {
  id: string;
  izena: string;
  priDelta: number;
  kostua: "baxu" | "ertain" | "altu";
  denbora: "azkar" | "ertain" | "luze";
  deskribapena: string;
}
