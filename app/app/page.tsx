export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function AppHomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Mapa orokorra (demo sinplifikatua)</h2>
      <p className="text-sm text-white/70">
        Orri honek oraingoz ez du maparik renderizatzen; helburua Vercel-en 404 errorea saihestu eta egitura
        minimoa martxan jartzea da.
      </p>
      <p className="text-sm text-white/60">
        Datu ikusizko osagaiak eta Mapbox integratuko ditugu egonkortasuna baieztatu ondoren.
      </p>
    </section>
  );
}
