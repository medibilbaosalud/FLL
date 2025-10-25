"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "components/providers/language-context";
import { Icon, type IconName } from "components/ui/icon";

interface BottomItem {
  href: string;
  label: string;
  icon: IconName;
  match?: (pathname: string, hash: string) => boolean;
}

const ITEM_COPY: Record<"es" | "eu", BottomItem[]> = {
  es: [
    { href: "/app", label: "Inicio", icon: "home", match: (path) => path === "/app" },
    { href: "/app#mapa", label: "Mapa", icon: "map", match: (path, hash) => path === "/app" && hash === "#mapa" },
    { href: "/app/triage", label: "Triage", icon: "table" },
    { href: "/app/scenario", label: "Escenarios", icon: "flask" },
    { href: "/app/settings", label: "Ajustes", icon: "settings" },
  ],
  eu: [
    { href: "/app", label: "Hasiera", icon: "home", match: (path) => path === "/app" },
    { href: "/app#mapa", label: "Mapa", icon: "map", match: (path, hash) => path === "/app" && hash === "#mapa" },
    { href: "/app/triage", label: "Triage", icon: "table" },
    { href: "/app/scenario", label: "Eszenarioak", icon: "flask" },
    { href: "/app/settings", label: "Ezarpenak", icon: "settings" },
  ],
};

export function BottomBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const items = useMemo(() => ITEM_COPY[language], [language]);
  const navLabel = language === "es" ? "Navegación móvil" : "Mugikorreko nabigazioa";

  return (
    <nav aria-label={navLabel} className="app-bottom-bar glass hairline soft" role="navigation">
      <div className="bottom-nav">
        {items.map((item) => {
          const active = item.match
            ? item.match(pathname, hash)
            : pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`bottom-link ${active ? "active" : ""}`.trim()}
              href={item.href}
              key={item.href}
            >
              <Icon name={item.icon} style={{ width: 20, height: 20 }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
