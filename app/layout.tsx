import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ArchéoSense",
  description: "Hasiera orria / Página inicial",
};

// Oinarrizko layout-ak hizkuntza eta estilo globalak ezartzen ditu.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="eu">
      <body
        style={{
          background: "#0F241F",
          color: "#F6FDF9",
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
