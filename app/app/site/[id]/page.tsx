import { notFound } from "next/navigation";
import Link from "next/link";
import { getSitesWithRisk } from "@/lib/data";
import { SiteDetail } from "@/components/site-detail";

export default function SitePage({ params }: { params: { id: string } }) {
  const sites = getSitesWithRisk();
  const site = sites.find((item) => item.feature.properties.id === params.id);
  if (!site) {
    notFound();
  }
  return (
    <div className="px-6 py-10">
      <Link href="/app" className="text-sm text-white/70 hover:text-white">
        ← Itzuli mapara
      </Link>
      <SiteDetail site={site} />
    </div>
  );
}
