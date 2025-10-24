import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriLabel(pri: number) {
  if (pri > 0.6) return "gorria";
  if (pri > 0.3) return "horia";
  return "berdea";
}

export function formatPriSentence(pri: number): string {
  if (pri > 0.6) {
    return "Arrisku handia — aste honetan ekin.";
  }
  if (pri > 0.3) {
    return "Arrisku ertaina — adi aldaketei.";
  }
  return "Arrisku baxua — monitorizatzen jarraitu.";
}
