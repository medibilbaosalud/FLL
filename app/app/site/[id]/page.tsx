import { notFound } from "next/navigation";

import { SiteClient } from "components/app/site-client";

interface SitePageProps {
  params: { id: string };
}

const SITE_COPY: Record<string, { es: { name: string; country: string; summary: string }; eu: { name: string; country: string; summary: string } }> = {
  "1": {
    es: {
      name: "Acantilados demo",
      country: "Costa cantábrica",
      summary: "Zona piloto expuesta a temporales; vigilamos erosión y desprendimientos.",
    },
    eu: {
      name: "Kostaldeko aztarnategia",
      country: "Euskal kostaldea",
      summary: "Ekaitzek eta olatuek higadura bizia eragiten duten demo gunea.",
    },
  },
  "2": {
    es: {
      name: "Santuario ribereño",
      country: "Ibar kantauriarra",
      summary: "Estructuras romanas expuestas a inundaciones estacionales.",
    },
    eu: {
      name: "Ibaiertzeko santutegia",
      country: "Ibar kantauriarra",
      summary: "Uholde estazionalek aztarnategia arriskuan jartzen dute.",
    },
  },
  "3": {
    es: {
      name: "Trikuharri del bosque",
      country: "Pirineos occidentales",
      summary: "Los cambios de humedad comprometen la estabilidad de las losas.",
    },
    eu: {
      name: "Basoko trikuharria",
      country: "Mendebaldeko Pirinioak",
      summary: "Hezetasun aldaketek egitura zaurgarri bihurtzen dute.",
    },
  },
  "4": {
    es: {
      name: "Castillo urbano",
      country: "Centro histórico",
      summary: "Alta afluencia turística y vibraciones constantes por obras cercanas.",
    },
    eu: {
      name: "Harrizko gaztelua",
      country: "Hiri erdigunea",
      summary: "Bisita masiboek eta bibrazioek higadura bizia eragiten dute.",
    },
  },
  "5": {
    es: {
      name: "Duna ceremonial",
      country: "Litoral atlántico",
      summary: "La combinación de viento y visitantes amenaza la estabilidad de la duna.",
    },
    eu: {
      name: "Duna sakratua",
      country: "Kostalde atlantikoa",
      summary: "Haizeak eta turistak egonkortasuna arriskuan jartzen dute.",
    },
  },
  "6": {
    es: {
      name: "Santuario de cumbre",
      country: "Alpes occidentales",
      summary: "El deshielo rápido y los desprendimientos son los principales riesgos.",
    },
    eu: {
      name: "Gailurreko santutegia",
      country: "Alpeak",
      summary: "Elur urtzeak eta lur-jausiek arrisku zuzena sortzen dute.",
    },
  },
};

const UPCOMING = {
  es: [
    {
      icon: "map" as const,
      title: "Vista en mapa",
      description: "Mostraremos la localización con ofuscación inteligente para sitios sensibles.",
      bullets: ["Capas 3D opcionales", "Comparativa histórica"],
    },
    {
      icon: "report" as const,
      title: "Top-Drivers y plan",
      description: "Verás los factores que más pesan en el riesgo y las acciones recomendadas.",
      bullets: ["Δ-PRI por acción", "Coste y tiempo estimado"],
    },
    {
      icon: "table" as const,
      title: "Historial y evidencias",
      description: "Grafías de lluvia, vegetación e InSAR con marcadores de eventos.",
      bullets: ["Alertas anotadas", "Exportación a PDF"],
    },
  ],
  eu: [
    {
      icon: "map" as const,
      title: "Mapa ikuspegia",
      description: "Gune sentikorretan ofuskazio adimenduna eta babes handiagoa eskaintzen dugu.",
      bullets: ["3D geruzak aukeran", "Historia konparatiboa"],
    },
    {
      icon: "report" as const,
      title: "Top-Drivers eta plana",
      description: "Arriskuan gehien eragiten duten faktoreak eta gomendatutako ekintzak ikusiko dituzu.",
      bullets: ["Δ-PRI neurrika", "Kostu eta denbora estimazioa"],
    },
    {
      icon: "table" as const,
      title: "Historia eta ebidentziak",
      description: "Euri, landaredi eta InSAR grafikoak gertakari markekin.",
      bullets: ["Alerten erregistroa", "PDF esportazioa"],
    },
  ],
};

export default function SitePage({ params }: SitePageProps) {
  const site = SITE_COPY[params.id];
  if (!site) {
    notFound();
  }

  return <SiteClient site={site} upcoming={UPCOMING} />;
}
