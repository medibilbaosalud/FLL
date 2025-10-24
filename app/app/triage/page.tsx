export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { getSitesWithRisk } from "@/lib/data";
import { TriageTable } from "@/components/triage-table";

export default function TriagePage() {
  const sites = getSitesWithRisk();
  return <TriageTable sites={sites} />;
}
