"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "components/ui/icon";

interface BottomItem {
  href: string;
  label: string;
  icon: IconName;
  match?: (pathname: string) => boolean;
}

const ITEMS: BottomItem[] = [
  { href: "/app", label: "Hasiera", icon: "home", match: (path) => path === "/app" },
  { href: "/app/site/1", label: "Mapa", icon: "map", match: (path) => path.startsWith("/app/site") },
  { href: "/app/triage", label: "Triage", icon: "table" },
  { href: "/app/scenario", label: "Eszenario", icon: "flask" },
  { href: "/app/settings", label: "Ezarpenak", icon: "settings" },
];

export function BottomBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mugikorreko nabigazioa" className="app-bottom-bar" role="navigation">
      <div className="bottom-nav">
        {ITEMS.map((item) => {
          const active = item.match
            ? item.match(pathname)
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
