import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className = "", ...props }: InputProps) {
  const classes = ["input", className].filter(Boolean).join(" ");
  return <input className={classes} {...props} />;
}
