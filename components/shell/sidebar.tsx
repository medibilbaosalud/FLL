"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "components/providers/language-context";
import { Icon, type IconName } from "components/ui/icon";

interface SidebarLink {
  href: string;
  label: string;
  icon: IconName;
  match?: (pathname: string, hash: string) => boolean;
}

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const LINK_COPY: Record<"es" | "eu", SidebarLink[]> = {
  es: [
    { href: "/app", label: "Inicio", icon: "home", match: (path) => path === "/app" },
    { href: "/app#mapa", label: "Mapa", icon: "map", match: (path, hash) => path === "/app" && hash === "#mapa" },
    { href: "/app/triage", label: "Triage", icon: "table" },
    { href: "/app/scenario", label: "Escenarios", icon: "flask" },
    { href: "/app/reports", label: "Informes", icon: "report" },
    { href: "/app/settings", label: "Ajustes", icon: "settings" },
  ],
  eu: [
    { href: "/app", label: "Hasiera", icon: "home", match: (path) => path === "/app" },
    { href: "/app#mapa", label: "Mapa", icon: "map", match: (path, hash) => path === "/app" && hash === "#mapa" },
    { href: "/app/triage", label: "Triage", icon: "table" },
    { href: "/app/scenario", label: "Eszenarioak", icon: "flask" },
    { href: "/app/reports", label: "Txostenak", icon: "report" },
    { href: "/app/settings", label: "Ezarpenak", icon: "settings" },
  ],
};

const TOGGLE_LABEL: Record<"es" | "eu", { expand: string; collapse: string }> = {
  es: { expand: "Expandir barra lateral", collapse: "Contraer barra lateral" },
  eu: { expand: "Albo-barra zabaldu", collapse: "Albo-barra tolestu" },
};

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseMobile?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen, onCloseMobile]);

  const className = useMemo(
    () =>
      [
        "app-sidebar",
        "glass",
        "hairline",
        "soft",
        collapsed ? "collapsed" : "",
        mobileOpen ? "open" : "",
      ]
        .filter(Boolean)
        .join(" "),
    [collapsed, mobileOpen],
  );

  const links = LINK_COPY[language];
  const toggleLabel = TOGGLE_LABEL[language];

  return (
    <aside aria-label={language === "es" ? "Navegación principal" : "Nabigazio nagusia"} className={className} role="navigation">
      <div className="sidebar-header">
        {!collapsed ? <span className="brand">ArchéoSense</span> : <span className="sr-only">ArchéoSense</span>}
        <button
          aria-label={collapsed ? toggleLabel.expand : toggleLabel.collapse}
          className="sidebar-toggle"
          onClick={onToggle}
          type="button"
        >
          ↔
        </button>
      </div>
      <nav className="nav-list">
        {links.map((link) => {
          const active = link.match
            ? link.match(pathname, hash)
            : pathname === link.href || (link.href !== "/app" && pathname.startsWith(link.href));
          return (
            <Link
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
              className={`nav-item ${active ? "active" : ""}`.trim()}
              href={link.href}
              key={link.href}
              onClick={() => {
                if (mobileOpen) {
                  onCloseMobile?.();
                }
              }}
            >
              <Icon name={link.icon} style={{ width: 20, height: 20 }} />
              <span className="nav-label">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
