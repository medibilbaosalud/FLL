"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Section } from "components/ui/section";

export default function ReportsPage() {
  return (
    <Section desc="Sortu PDF laburpenak eta partekatu estrategikoki" title="Txosten zentroa">
      <p>
        Txosten malguak prestatzen ari gara, mapen eta KPIen irudiak automatikoki sartzeko. Hemendik exportatu
        ahal izango dira PDF eta CSV formatuetan.
      </p>
    </Section>
  );
}
