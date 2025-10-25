import type { HTMLAttributes } from "react";

export type BadgeTone = "success" | "warning" | "danger" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  const toneClass = `badge-${tone}`;
  const classes = ["badge", toneClass, className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}
