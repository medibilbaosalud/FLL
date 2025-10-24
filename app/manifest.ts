import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ArchéoSense",
    short_name: "ArchéoSense",
    description: "Arkeo guneen arriskuaren mapa poetiko-teknologikoa",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1b16",
    theme_color: "#186aff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
