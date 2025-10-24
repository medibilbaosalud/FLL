import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ArchéoSense",
  description: "ArchéoSense — arkeologiaren arnasa eta arriskuaren zaintza.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="eu">
      <body className="min-h-screen bg-[#0b1b16] font-sans text-white">
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
