"use client";

import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "map"
  | "table"
  | "flask"
  | "report"
  | "settings"
  | "menu"
  | "search"
  | "chevron"
  | "spark"
  | "shield";

const ICONS: Record<IconName, { viewBox: string; path: string }> = {
  home: {
    viewBox: "0 0 24 24",
    path: "M3 10.5L12 3l9 7.5v9.75a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75V15h-6v6.25a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 20.25z",
  },
  map: {
    viewBox: "0 0 24 24",
    path: "M9 4.5L3.75 6.75v12.75L9 17.25l6 2.25 5.25-2.25V4.5L15 6.75 9 4.5zm0 0v12.75m6-10.5v12.75",
  },
  table: {
    viewBox: "0 0 24 24",
    path: "M4.5 6h15a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V6.75A.75.75 0 0 1 4.5 6zm0 4.5h15m-9-4.5v12",
  },
  flask: {
    viewBox: "0 0 24 24",
    path: "M9 3.75h6m-1.5 0v5.19l4.95 8.57A1.5 1.5 0 0 1 17.19 20.25H6.81a1.5 1.5 0 0 1-1.26-2.74L10.5 8.94V3.75",
  },
  report: {
    viewBox: "0 0 24 24",
    path: "M7.5 3.75h9a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5zm0 4.5h9m-9 3h4.5m-4.5 3h6",
  },
  settings: {
    viewBox: "0 0 24 24",
    path: "M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zm7.5 2.25a7.5 7.5 0 0 0-.09-1.14l2.04-1.59-1.5-2.6-2.46.99a7.56 7.56 0 0 0-1.98-1.14l-.3-2.64h-3l-.3 2.64a7.56 7.56 0 0 0-1.98 1.14l-2.46-.99-1.5 2.6 2.04 1.59a7.73 7.73 0 0 0 0 2.28l-2.04 1.59 1.5 2.6 2.46-.99c.6.5 1.25.9 1.98 1.14l.3 2.64h3l.3-2.64c.73-.24 1.38-.64 1.98-1.14l2.46.99 1.5-2.6-2.04-1.59c.06-.38.09-.76.09-1.14z",
  },
  menu: {
    viewBox: "0 0 24 24",
    path: "M4.5 6.75h15m-15 5.25h15m-15 5.25h15",
  },
  search: {
    viewBox: "0 0 24 24",
    path: "M10.5 4.5a6 6 0 1 1-3.78 10.62l-2.84 2.85 1.06 1.06 2.84-2.84A6 6 0 0 1 10.5 4.5z",
  },
  chevron: {
    viewBox: "0 0 24 24",
    path: "M9 6l6 6-6 6",
  },
  spark: {
    viewBox: "0 0 24 24",
    path: "M12 3v4.5m0 9V21M5.4 5.4l3.18 3.18M15.42 15.42 18.6 18.6M3 12h4.5m9 0H21M5.4 18.6l3.18-3.18M15.42 8.58 18.6 5.4",
  },
  shield: {
    viewBox: "0 0 24 24",
    path: "M12 3 4.5 6v6c0 4.97 3.03 9.54 7.5 11.25 4.47-1.71 7.5-6.28 7.5-11.25V6z",
  },
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  const icon = ICONS[name];
  if (!icon) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={icon.path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
    </svg>
  );
}
