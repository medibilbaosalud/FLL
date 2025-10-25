import { notFound } from "next/navigation";

interface SitePageProps {
  params: { id: string };
}

const MOCK_SITES: Record<string, { name: string; summary: string }> = {
  "1": {
    name: "Kostaldeko aztarnategia",
    summary: "Demo gune nagusia — kostaldeko ekaitzak eta itsasgora biziak monitorizatzen ari gara.",
  },
};

export default function SitePage({ params }: SitePageProps) {
  const site = MOCK_SITES[params.id];

  if (!site) {
    notFound();
  }

  return (
    <section className="section-card" aria-labelledby="site-heading">
      <header className="section-header">
        <div>
          <h1 className="section-title" id="site-heading">
            {site.name}
          </h1>
          <p className="section-desc">Gune honen egoera laburra eta hurrengo urratsak</p>
        </div>
      </header>
      <div>
        <p>{site.summary}</p>
        <p>
          Fitxa osoa prestatzen ari gara: arrisku indizeak, joerak eta ekintza planak integratuko dira. Aldi berean,
          mapa interaktiboan kokapen eguneratua erakutsiko dugu.
        </p>
      </div>
    </section>
  );
}
