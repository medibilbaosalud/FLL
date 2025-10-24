export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function SettingsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Ezarpenak (demo)</h2>
      <p className="text-sm text-white/70">
        Konfigurazio aurreratuak berriro gehituko dira geroago. Momentuz, orri honek gogorarazten du app-a prest dagoela
        oinarrizko nabigaziorako eta ez lukeela 404 orririk erakutsi behar.
      </p>
    </section>
  );
}
