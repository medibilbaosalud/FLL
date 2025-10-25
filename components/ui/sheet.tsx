"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Button } from "components/ui/button";

export interface SheetProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export function Sheet({ open, title, onClose, children }: SheetProps) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-label={title ?? "Xehetasunak"}
      aria-modal="true"
      className="sheet-overlay"
      onClick={onClose}
      role="dialog"
    >
      <div className="sheet-panel glass hairline" onClick={(event) => event.stopPropagation()}>
        <Button
          aria-label="Itxi panela"
          className="sheet-close"
          onClick={onClose}
          type="button"
          variant="icon"
        >
          ×
        </Button>
        {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}
