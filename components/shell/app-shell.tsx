"use client";

import { useEffect, useState } from "react";

import { BottomBar } from "components/shell/bottom-bar";
import { Sidebar } from "components/shell/sidebar";
import { Topbar } from "components/shell/topbar";
import { useLanguage } from "components/providers/language-context";

const COLLAPSE_KEY = "archeosense-shell-collapsed";

export interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(COLLAPSE_KEY);
    if (stored === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (mobileOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [mobileOpen]);

  const className = ["app-shell", collapsed ? "is-collapsed" : "", mobileOpen ? "mobile-open" : ""]
    .filter(Boolean)
    .join(" ");

  const overlayLabel = language === "es" ? "Cerrar navegación" : "Nabigazioa itxi";

  return (
    <div className={className}>
      {mobileOpen ? (
        <button
          aria-label={overlayLabel}
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      ) : null}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <div className="app-main">
        <Topbar
          collapsed={collapsed}
          onMobileMenu={() => setMobileOpen(true)}
          onToggleSidebar={() => setCollapsed((value) => !value)}
        />
        <div className="app-content">{children}</div>
      </div>
      <BottomBar />
    </div>
  );
}
