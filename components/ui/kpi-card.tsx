"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "components/ui/icon";

export interface KpiCardProps {
  title: string;
  value: string;
  hint?: string;
  iconName?: IconName;
  leading?: ReactNode;
}

export function KpiCard({ title, value, hint, iconName, leading }: KpiCardProps) {
  return (
    <article className="kpi-card" aria-live="polite">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <h3 className="kpi-title">{title}</h3>
        {iconName ? <Icon name={iconName} style={{ width: 20, height: 20 }} /> : leading ?? null}
      </header>
      <p className="kpi-value">{value}</p>
      {hint ? <p className="kpi-hint">{hint}</p> : null}
    </article>
  );
}
