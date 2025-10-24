export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { getSitesWithRisk } from "@/lib/data";
import { ReportsView } from "@/components/reports-view";

export default function ReportsPage() {
  const sites = getSitesWithRisk();
  return <ReportsView sites={sites} />;
}
