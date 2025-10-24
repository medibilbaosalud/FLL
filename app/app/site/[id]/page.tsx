export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type SitePageProps = {
  params: { id: string };
};

export default function SitePlaceholderPage({ params }: SitePageProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Gunea: {params.id}</h2>
      <p className="text-sm text-white/70">
        Xehetasun orri hau oraingoz sinplifikatuta dago. Datu zehatzak eta grafikak beranduago aktibatuko dira,
        aplikazioa egonkor dagoenean.
      </p>
    </section>
  );
}
