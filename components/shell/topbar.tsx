"use client";

import { useEffect, useState } from "react";
import { Icon } from "components/ui/icon";

export interface TopbarProps {
  onMobileMenu: () => void;
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export function Topbar({ onMobileMenu, onToggleSidebar, collapsed }: TopbarProps) {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("eu");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("archeosense-lang") : null;
    if (stored) {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("archeosense-lang", language);
    }
  }, [language]);

  return (
    <header className="app-topbar">
      <div className="topbar-group">
        <button
          aria-label="Ireki nabigazioa"
          className="mobile-menu-button"
          onClick={onMobileMenu}
          type="button"
        >
          <Icon name="menu" style={{ width: 22, height: 22 }} />
        </button>
        <button
          aria-label={collapsed ? "Zabaldu albo-barra" : "Tolestu albo-barra"}
          onClick={onToggleSidebar}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: "12px",
            padding: "8px 12px",
            color: "inherit",
            cursor: "pointer",
          }}
          type="button"
        >
          <Icon name="chevron" style={{ width: 18, height: 18, transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>
        <span style={{ fontWeight: 600, letterSpacing: "0.04em" }}>ArchéoSense</span>
      </div>
      <div className="topbar-group">
        <label className="topbar-search">
          <Icon name="search" style={{ width: 18, height: 18 }} />
          <input
            aria-label="Bilatu guneak"
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
