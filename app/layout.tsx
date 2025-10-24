import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/components/i18n-provider";
import { Providers } from "@/components/providers";
import { PwaRegister } from "@/components/pwa-register";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArchéoSense",
  description:
    "ArchéoSense: arkeo guneen arrisku adimenduna, lehentasunak eta eszenarioak euskaraz."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eu">
      <body className={`${inter.className} min-h-screen bg-[#0b1b16] text-white`}>
        <I18nProvider>
          <Providers>
            <PwaRegister />
            <div className="relative min-h-screen">
              <div className="pointer-events-none fixed inset-0 bg-[url('/textures/noise.svg')] opacity-40 mix-blend-screen" />
              <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
            </div>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
