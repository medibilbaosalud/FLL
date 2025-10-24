export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <section
      style={{
        display: "grid",
        gap: "1.5rem",
        padding: "2rem 0",
      }}
    >
      <header style={{ display: "grid", gap: "0.75rem" }}>
        <p
          style={{
            fontSize: "0.875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          ArchéoSense
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 600 }}>
          Iraganaren aztarnak ez dira bakarrik gelditzen.
        </h1>
        <p style={{ maxWidth: "42rem", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
          Natura eta gizakiaren arrastoak uztartzen dituen zaintza-sistema da ArchéoSense. Hemen has zaitezke
          arrisku-seinaleak aztertzen eta gure gune arkeologikoak zaintzeko ekintzak planifikatzen.
        </p>
      </header>

      <nav style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <a
          href="/app"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            background: "rgba(46, 204, 149, 0.18)",
            color: "white",
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid rgba(46, 204, 149, 0.35)",
            backdropFilter: "blur(6px)",
          }}
        >
          Ireki aplikazioa
        </a>
        <a
          href="/app/reports"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.82)",
            textDecoration: "none",
            backdropFilter: "blur(6px)",
          }}
        >
          Ikusi txostenak
        </a>
      </nav>

      <section
        style={{
          display: "grid",
          gap: "0.75rem",
          padding: "1.5rem",
          borderRadius: "1.5rem",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: "40rem",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>Zer espero dezakezu?</h2>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "grid", gap: "0.5rem" }}>
          <li>Mapa interaktibo bat, gune bakoitzaren PRI arrisku-seinaleekin.</li>
          <li>Lehentasunen kudeaketa eta eszenarioen laborategia, erabakiak prestatzeko.</li>
          <li>Txosten azkarrak eta PDF esportagarriak taldearekin partekatzeko.</li>
        </ul>
      </section>
    </section>
  );
}
