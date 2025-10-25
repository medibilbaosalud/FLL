"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "components/providers/language-context";
import { Badge } from "components/ui/badge";

const COPY = {
  es: {
    title: "Mapa interactivo (en preparación)",
    body:
      "Aquí verás el mapa vivo con colores por riesgo, clusters y búsqueda inmediata. Estamos afinando los datos demo para que funcione con fluidez.",
    ctaPrimary: "Ver ficha de muestra",
    ctaSecondary: "Volver a inicio",
    badge: "Demostración",
  },
  eu: {
    title: "Mapa interaktiboa (laster)",
    body:
      "Hemen ikusiko duzu arriskuaren arabera koloreztatutako mapa, cluster dinamikoekin eta bilaketa berehalakoarekin. Demo datuak fintzen ari gara ondo funtziona dezan.",
    ctaPrimary: "Ikusi adibide-fitxa",
    ctaSecondary: "Hasierara itzuli",
    badge: "Demo",
  },
} as const;

export default function SiteMap() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="map-placeholder card glass hairline" style={{ padding: "24px", display: "grid", gap: "20px" }}>
      <Badge tone="neutral">{copy.badge}</Badge>
      <div style={{ display: "grid", gap: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>{copy.title}</h3>
        <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>{copy.body}</p>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(14,116,144,0.15))",
          minHeight: "220px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Image
          alt={language === "es" ? "Ilustración del mapa de ArchéoSense" : "ArchéoSense maparen ilustrazioa"}
          height={240}
          src="/images/landing-pri.svg"
          width={480}
          style={{ objectFit: "cover", width: "100%", height: "100%", opacity: 0.9 }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Link className="btn btn-primary" href="/app/site/1">
          {copy.ctaPrimary}
        </Link>
        <Link className="btn btn-ghost" href="/app">
          {copy.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
