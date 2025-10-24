export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function ScenarioLabPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Eszenario laborategia (demo)</h2>
      <p className="text-sm text-white/70">
        Slider eta simulazioak berreraikitzen ari gara. Une honetan, orri honek egitura soil bat erakusten du
        egonkortasuna lehenesteko.
      </p>
    </section>
  );
}
