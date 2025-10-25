export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import DashboardClient from "components/app/dashboard-client";

export default function AppHome() {
  return <DashboardClient />;
}
