"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function ScenarioPage() {
  return (
    <Section desc="Proiektatu eszenario desberdinak eta ikusi nola aldatzen den arriskua" title="Eszenario laborategia">
      <p>
        Parametroen slider dinamikoak eta simulazioen gordetzea gehituko dira. Une honetan maketa fasean dago
        eta datu sintetikoekin esperimentatuko dugu.
      </p>
    </Section>
  );
}
