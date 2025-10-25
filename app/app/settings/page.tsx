"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function SettingsPage() {
  return (
    <Section desc="Konfiguratu atalaseak, datuen iturriak eta pribatutasun lehentasunak" title="Ezarpen orokorrak">
      <p>
        Hemen kudeatuko dira atalaseak, rolen baimenak eta esportazio aukerak. Momentuz orientazio testuarekin
        uzten dugu, baina API integrazioak gehituko dira.
      </p>
    </Section>
  );
}
