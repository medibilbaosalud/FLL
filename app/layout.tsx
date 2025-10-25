import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ArchéoSense",
  description: "Hasiera orria / Página inicial",
};

// Oinarrizko layout-ak hizkuntza eta estilo globalak ezartzen ditu.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="eu" className="h-full">
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
