"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon, type IconName } from "components/ui/icon";

interface SidebarLink {
  href: string;
  label: string;
  icon: IconName;
  match?: (pathname: string) => boolean;
}

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const LINKS: SidebarLink[] = [
  { href: "/app", label: "Hasiera", icon: "home", match: (path) => path === "/app" },
  { href: "/app/site/1", label: "Mapa", icon: "map", match: (path) => path.startsWith("/app/site") },
  { href: "/app/triage", label: "Triage", icon: "table" },
  { href: "/app/scenario", label: "Eszenarioak", icon: "flask" },
  { href: "/app/reports", label: "Txostenak", icon: "report" },
  { href: "/app/settings", label: "Ezarpenak", icon: "settings" },
];

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

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

  return (
    <aside
      aria-label="Aplikazioaren nabigazioa"
      className={`app-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`.trim()}
      role="navigation"
    >
      <div className="sidebar-header">
        <button
          aria-label={collapsed ? "Zabaldu albo-barra" : "Tolestu albo-barra"}
          className="sidebar-toggle"
          onClick={onToggle}
          type="button"
        >
          ↔
        </button>
      </div>
      <nav className="nav-list">
        {LINKS.map((link) => {
          const active = link.match
            ? link.match(pathname)
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
