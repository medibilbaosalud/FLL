"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { Badge } from "components/ui/badge";

type MapCopy = {
  title: string;
  body: string;
  badge: string;
  actions: { href: string; label: string }[];
  features: { title: string; description: string }[];
};

const COPY: Record<"es" | "eu", MapCopy> = {
  es: {
    title: "Aquí aparecerá el mapa vivo",
    body:
      "Estamos construyendo la vista geográfica. Verás clusters por riesgo, filtros por país y accesos rápidos a cada ficha.",
    badge: "En desarrollo",
    actions: [
      { href: "/app/site/1", label: "Ver ficha de ejemplo" },
      { href: "/app/triage", label: "Explorar triage" },
    ],
    features: [
      {
        title: "Colores por riesgo",
        description: "Los puntos se teñirán en verde, ámbar o rojo según el PRI actual.",
      },
      {
        title: "Cluster inteligente",
        description: "Acércate y verás cómo se separan para revelar cada yacimiento.",
      },
      {
        title: "Detalle instantáneo",
        description: "Un panel lateral contará la historia rápida y propondrá acciones.",
      },
    ],
  },
  eu: {
    title: "Hemen agertuko da mapa bizia",
    body:
      "Ikuspegi geografikoa osatzen ari gara. Arriskuaren arabera koloreztatutako cluster dinamikoak eta fitxetara sarbide azkarrak izango dituzu.",
    badge: "Garapen fasean",
    actions: [
      { href: "/app/site/1", label: "Ikusi adibide-fitxa" },
      { href: "/app/triage", label: "Arakatu triage" },
    ],
    features: [
      {
        title: "Arrisku koloreak",
        description: "Puntuak berde, hori edo gorri ikusiko dituzu uneko PRIaren arabera.",
      },
      {
        title: "Cluster adimentsua",
        description: "Gerturatzean banatu egingo dira aztarnategi bakoitza erakusteko.",
      },
      {
        title: "Xehetasun bizkorra",
        description: "Alboko panel batek egoera azaldu eta gomendatutako ekintzak erakutsiko ditu.",
      },
    ],
  },
};

export default function SiteMap() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="map-placeholder card glass hairline" style={{ padding: "28px", display: "grid", gap: "24px" }}>
      <Badge tone="neutral">{copy.badge}</Badge>
      <div className="map-placeholder-header">
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
      </div>
      <div className="map-placeholder-body">
        <div className="map-placeholder-visual">
          <Image
            alt={language === "es" ? "Visual del mapa" : "Maparen irudia"}
            height={320}
            src="/images/landing-pri.svg"
            width={520}
          />
        </div>
        <ul className="map-placeholder-list">
          {copy.features.map((feature) => (
            <li key={feature.title}>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-placeholder-actions">
        {copy.actions.map((action) => (
          <Link className="btn" href={action.href} key={action.href}>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
