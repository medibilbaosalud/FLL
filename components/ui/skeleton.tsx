"use client";

import type { HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", style, ...props }: SkeletonProps) {
  return <div className={`skeleton ${className}`.trim()} style={style} {...props} />;
}
