export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function ScenarioPage() {
  return (
    <Section desc="Hipotesi eta shock ezberdinak simulatu" title="Eszenario Laborategia">
      <p>
        Tresna honetan aldagaien sliderrekin jolastu eta arrisku indizearen bilakaera aztertuko dugu. Datu errealak eta
        aurreikuspenak uztartuko dira.
      </p>
    </Section>
  );
}
