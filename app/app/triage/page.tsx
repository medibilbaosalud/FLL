export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function TriagePage() {
  return (
    <Section desc="Kudeatu gune kritikoak eta esleitu ekintzak" title="Triage mahaia">
      <p>
        Hemen agertuko da lehentasun osoz berrikusi beharreko guneen zerrenda. Laster gehituko ditugu taula
        interaktiboak eta bulk ekintzak.
      </p>
    </Section>
  );
}
