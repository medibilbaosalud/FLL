export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function SettingsPage() {
  return (
    <Section desc="Konfiguratu atalaseak, rolen baimenak eta esportazioak" title="Ezarpenak">
      <p>
        Ezarriko ditugu arrisku atalase pertsonalizatuak, preset bioklimatikoak eta datu truke aukerak. Une honetan demo
        moduan ari gara lanean.
      </p>
    </Section>
  );
}
