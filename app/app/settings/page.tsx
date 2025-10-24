export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { SettingsPanel } from "@/components/settings-panel";

export default function SettingsPage() {
  return <SettingsPanel />;
}
