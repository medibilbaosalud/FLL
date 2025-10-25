"use client";

import { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { Icon } from "components/ui/icon";
import { Input } from "components/ui/input";

export interface TopbarProps {
  onMobileMenu: () => void;
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export function Topbar({ onMobileMenu, onToggleSidebar, collapsed }: TopbarProps) {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("eu");
  const storageKey = "lang";

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
    if (stored) {
      setLanguage(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, language);
    }
  }, [language, storageKey]);

  const chevronStyle = {
    width: 18,
    height: 18,
    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  } as const;

  return (
    <header className="app-topbar glass hairline soft">
      <div className="topbar-group">
        <Button
          aria-label="Ireki nabigazioa"
          className="mobile-menu-button"
          onClick={onMobileMenu}
          type="button"
          variant="icon"
        >
          <Icon name="menu" style={{ width: 22, height: 22 }} />
        </Button>
        <Button
          aria-label={collapsed ? "Zabaldu albo-barra" : "Tolestu albo-barra"}
          className="topbar-toggle"
          onClick={onToggleSidebar}
          type="button"
          variant="icon"
        >
          <Icon name="chevron" style={chevronStyle} />
        </Button>
        <span className="topbar-title">ArchéoSense</span>
      </div>
      <div className="topbar-group">
        <label className="topbar-search" htmlFor="dashboard-search">
          <Icon name="search" style={{ width: 18, height: 18 }} />
          <Input
            aria-label="Bilatu guneak"
            id="dashboard-search"
            onChange={(event) => {
              setSearch(event.target.value);
              console.log("[bilaketa]", event.target.value);
            }}
            placeholder="Bilatu guneak"
            type="search"
            value={search}
          />
        </label>
        <select
          aria-label="Hizkuntza aukeratu"
          className="topbar-select"
          onChange={(event) => setLanguage(event.target.value)}
          value={language}
        >
          <option value="eu">EU</option>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header>
  );
}
