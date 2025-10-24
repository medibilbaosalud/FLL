import { ScenarioLab } from "@/components/scenario-lab";
import { getSitesWithRisk } from "@/lib/data";

export default function ScenarioPage() {
  const sites = getSitesWithRisk();
  return <ScenarioLab sites={sites} />;
}
