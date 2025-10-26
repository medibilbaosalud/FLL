"use client";

import { useSyncExternalStore } from "react";

type RiskLayers = {
  clusters: boolean;
  points: boolean;
};

type RiskData = {
  riskMin: number;
  layers: RiskLayers;
};

export type RiskStore = RiskData & {
  setRiskMin: (value: number) => void;
  toggleLayer: (key: keyof RiskLayers) => void;
};

const STORAGE_KEY = "archeosense-risk-preferences";

let data: RiskData = {
  riskMin: 0,
  layers: {
    clusters: true,
    points: true,
  },
};

let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") {
    return;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<RiskData>;
      data = {
        riskMin: typeof parsed.riskMin === "number" ? parsed.riskMin : data.riskMin,
        layers: {
          clusters:
            typeof parsed?.layers?.clusters === "boolean" ? parsed.layers.clusters : data.layers.clusters,
          points: typeof parsed?.layers?.points === "boolean" ? parsed.layers.points : data.layers.points,
        },
      };
    }
  } catch (error) {
    console.warn("[risk-store] Ezin izan da konfigurazioa kargatu", error);
  }
  hydrated = true;
}

function persist() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("[risk-store] Ezin izan da konfigurazioa gorde", error);
  }
}

function setData(next: Partial<RiskData>) {
  data = {
    ...data,
    ...next,
    layers: {
      ...data.layers,
      ...(next.layers ?? {}),
    },
  };
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  hydrate();
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): RiskStore {
  return {
    ...data,
    setRiskMin: (value: number) => setData({ riskMin: Math.max(0, Math.min(100, value)) }),
    toggleLayer: (key: keyof RiskLayers) =>
      setData({ layers: { ...data.layers, [key]: !data.layers[key] } as RiskLayers }),
  };
}

export function useRiskStore<T>(selector: (state: RiskStore) => T): T {
  return useSyncExternalStore(subscribe, () => selector(getSnapshot()), () => selector(getSnapshot()));
}
