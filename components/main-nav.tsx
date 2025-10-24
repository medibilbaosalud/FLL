"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const links = [
  { href: "/app", key: "map" },
  { href: "/app/triage", key: "priorities" },
  { href: "/app/scenario", key: "scenario" },
  { href: "/app/reports", key: "reports" },
  { href: "/app/settings", key: "settings" }
];

export function MainNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="flex items-center gap-4" aria-label="Nabigazioa">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition",
              active
                ? "bg-white/10 text-white shadow-lg shadow-ozeano-500/30"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {t(`nav.${link.key}`)}
          </Link>
        );
      })}
    </nav>
  );
}
