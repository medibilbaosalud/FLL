import "./globals.css";
import type { ReactNode } from "react";

import { LanguageProvider } from "components/providers/language-context";

export const metadata = {
  title: "ArchéoSense",
  description: "Hasiera orria / Página inicial",
};

// Layout globala: hizkuntza testuingurua eta estilo koherenteak ezartzen ditu.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
