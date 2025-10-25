"use client";

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonVariant = "primary" | "ghost" | "soft" | "icon";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  soft: "btn btn-soft",
  icon: "btn btn-icon",
};

export function Button({ variant = "soft", className = "", ...props }: ButtonProps) {
  const base = VARIANT_CLASS[variant] ?? VARIANT_CLASS.soft;
  const classes = [base, className].filter(Boolean).join(" ");
  return <button className={classes} {...props} />;
}
