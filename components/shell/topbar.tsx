"use client";

import { useState } from "react";

import { useLanguage } from "components/providers/language-context";
import { Button } from "components/ui/button";
import { Icon } from "components/ui/icon";
import { Input } from "components/ui/input";
import { LanguageToggle } from "components/ui/language-toggle";

export interface TopbarProps {
  onMobileMenu: () => void;
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export function Topbar({ onMobileMenu, onToggleSidebar, collapsed }: TopbarProps) {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  const chevronStyle = {
    width: 18,
    height: 18,
    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  } as const;

  const searchLabel = language === "es" ? "Buscar sitios" : "Bilatu guneak";
  const menuLabel = language === "es" ? "Abrir navegación" : "Nabigazioa ireki";
  const toggleLabel = collapsed
    ? language === "es" ? "Expandir barra lateral" : "Albo-barra zabaldu"
    : language === "es" ? "Contraer barra lateral" : "Albo-barra tolestu";

  return (
    <header className="app-topbar glass hairline soft">
      <div className="topbar-group">
        <Button aria-label={menuLabel} className="mobile-menu-button" onClick={onMobileMenu} type="button" variant="icon">
          <Icon name="menu" style={{ width: 22, height: 22 }} />
        </Button>
        <Button aria-label={toggleLabel} className="topbar-toggle" onClick={onToggleSidebar} type="button" variant="icon">
          <Icon name="chevron" style={chevronStyle} />
        </Button>
        <span className="topbar-title">ArchéoSense</span>
      </div>
      <div className="topbar-group">
        <label className="topbar-search" htmlFor="dashboard-search">
          <Icon name="search" style={{ width: 18, height: 18 }} />
          <Input
            aria-label={searchLabel}
            id="dashboard-search"
            onChange={(event) => {
              setSearch(event.target.value);
              console.log("[search]", event.target.value);
            }}
            placeholder={searchLabel}
            type="search"
            value={search}
          />
        </label>
        <LanguageToggle compact />
      </div>
    </header>
  );
}
