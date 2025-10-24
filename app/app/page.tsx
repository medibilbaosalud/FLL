export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { MapDashboard } from "@/components/dashboard/map-dashboard";
import { getSitesWithRisk } from "@/lib/data";

export default function AppHomePage() {
  const sites = getSitesWithRisk();
  return <MapDashboard sites={sites} />;
}
