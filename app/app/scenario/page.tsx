export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { ScenarioLab } from "@/components/scenario-lab";
import { getSitesWithRisk } from "@/lib/data";

export default function ScenarioPage() {
  const sites = getSitesWithRisk();
  return <ScenarioLab sites={sites} />;
}
