import type { ReactNode } from "react";

export const metadata = {
  title: "ArchéoSense",
  description: "Hasiera sinplea ArchéoSense proiekturako.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="eu">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          minHeight: "100vh",
          background: "#0b1b16",
          color: "#f6fdf9",
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
