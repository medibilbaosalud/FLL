export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function TriagePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Lehentasunen taula (demo)</h2>
      <p className="text-sm text-white/70">
        Taula interaktiboa sinplifikatu dugu. Datuak eta lehentasunak gehituko dira egonkortasuna egiaztatu ondoren.
      </p>
    </section>
  );
}
