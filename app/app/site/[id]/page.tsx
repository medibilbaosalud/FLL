import { notFound } from "next/navigation";
import { Section } from "components/ui/section";

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
    <Section desc="Gune honen egoera laburra eta hurrengo urratsak" title={site.name}>
      <p>{site.summary}</p>
      <p>
        Fitxa osoa prestatzen ari gara: arrisku indizeak, joerak eta ekintza planak integratuko dira. Aldi berean,
        mapa interaktiboan kokapen eguneratua erakutsiko dugu.
      </p>
    </Section>
  );
}
