"use client";

import type { IconName } from "components/ui/icon";
import { Icon } from "components/ui/icon";
import type { ReactNode } from "react";

export interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
  bullets?: readonly string[];
  badge?: ReactNode;
}

export function FeatureCard({ icon, title, description, bullets, badge }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="flex items-center gap-3">
        <Icon className="feature-card-icon" name={icon} />
        {badge ? <span className="feature-card-badge">{badge}</span> : null}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {bullets && bullets.length > 0 ? (
        <ul className="feature-card-list">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
