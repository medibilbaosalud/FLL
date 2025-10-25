export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function ReportsPage() {
  return (
    <Section desc="Txosten adimentsuak prestatzen joango gara" title="Txostenak">
      <p>
        Laster hemen egongo dira PDF esportazioak, laburpen automatikoak eta historia konparatuak. Une honetan demo datu
        multzoa prestatzen ari gara.
      </p>
    </Section>
  );
}
