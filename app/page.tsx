export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import Link from "next/link";
import { MainNav } from "@/components/main-nav";

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <header className="wave-header relative overflow-hidden px-6 py-10 sm:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-ozeano-500/25 via-baso-500/20 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold tracking-wide text-white/80">ArchéoSense</span>
            <MainNav />
          </div>
          <div className="flex flex-col gap-6 text-balance">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Iraganaren aztarnak ez dira isilean galduko: naturaren arnasa, gizakiaren urratsa, eta harrien ahotsa, mapa berean.
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              ArchéoSense: arriskuaren semaforoa, azalpen gardenak eta ekintza zehatzak — garaiz heltzeko.
            </p>
            <div className="flex gap-4">
              <Link
                href="/app"
                className="rounded-full bg-ozeano-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-ozeano-500/40 transition hover:bg-ozeano-400"
              >
                Hasi
              </Link>
              <Link
                href="/app/reports"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 hover:border-white hover:text-white"
              >
                Txostenak ikusi
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16 sm:px-12">
        <div className="glass rounded-3xl border border-white/10 p-10">
          <h2 className="text-2xl font-semibold text-white">Teknologia eta natura, sinbolo berean</h2>
          <p className="mt-4 max-w-3xl text-white/70">
            Arrisku indize adimentsua, datu fidagarriak eta narrazio poetikoa elkartzen dira. Mapak arnasten du; ibaiaren, haizearen eta gizakiaren aztarnak bat eginez, erabakiak garaiz hartzeko.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "PRI adimenduna",
                description: "Hazard, Ahultasun, Esposizio eta Balioa uztartuta, 0 eta 1 artean normalizatuta."
              },
              {
                title: "Lehentasun orkestratua",
                description: "Mapa eta taulak aldi berean eguneratzen dira, joerak eta alerta gorriak nabarmenduz."
              },
              {
                title: "Ekintza poetiko-pragmatikoa",
                description: "Ekintza-planak ΔPRI kalkuluekin, kostu eta denbora estimazioekin eta txosten PDFekin."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/5 p-6">
                <dt className="text-sm font-medium uppercase tracking-wide text-white/70">{item.title}</dt>
                <dd className="mt-3 text-sm text-white/80">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
