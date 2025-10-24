export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function ReportsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Txostenak (demo)</h2>
      <p className="text-sm text-white/70">
        PDF sortzea eta analitika aurreratuak oraindik ez daude aktibo. Orain helburua da bide guztiak erabilgarri
        egotea eta 404 erroreak saihestea.
      </p>
    </section>
  );
}
