"use client";

import { create } from "zustand";
import type { RiskResult, ScenarioInput } from "@/lib/types";

type TimeWindow = 7 | 14 | 30;

type RiskStore = {
  activeSiteId?: string;
  results: Record<string, RiskResult>;
  timeWindow: TimeWindow;
  filters: {
    mota?: string;
    materiala?: string;
    bioma?: string;
    priRange?: [number, number];
    hideSensitive: boolean;
  };
  scenario: ScenarioInput;
  setTimeWindow: (window: TimeWindow) => void;
  setActiveSite: (id?: string) => void;
  setResults: (results: RiskResult[]) => void;
  updateScenario: (scenario: Partial<ScenarioInput>) => void;
  updateFilters: (filters: Partial<RiskStore["filters"]>) => void;
};

export const useRiskStore = create<RiskStore>((set) => ({
  results: {},
  timeWindow: 30,
  filters: {
    hideSensitive: false
  },
  scenario: {
    euriAldaketa: 0,
    tenperaturaDelta: 0,
    hezetasunaAldaketa: 0,
    bisitariAldaketa: 0,
    obraBibrazioa: false
  },
  setActiveSite: (activeSiteId) => set({ activeSiteId }),
  setTimeWindow: (timeWindow) => set({ timeWindow }),
  setResults: (results) =>
    set({
      results: results.reduce<Record<string, RiskResult>>((acc, result) => {
        acc[result.siteId] = result;
        return acc;
      }, {})
    }),
  updateScenario: (scenario) =>
    set((state) => ({ scenario: { ...state.scenario, ...scenario } })),
  updateFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } }))
}));
