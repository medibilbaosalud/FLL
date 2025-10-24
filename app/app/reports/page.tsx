import { getSitesWithRisk } from "@/lib/data";
import { ReportsView } from "@/components/reports-view";

export default function ReportsPage() {
  const sites = getSitesWithRisk();
  return <ReportsView sites={sites} />;
}
