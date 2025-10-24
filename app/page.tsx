export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="text-4xl font-semibold">ArchéoSense</h1>
        <p className="mt-4 max-w-2xl text-base text-white/80">
          Iraganaren aztarnak ez dira isilean galduko. Demo honek oinarrizko orrialdea
          eta aplikazio nagusira esteka eskaintzen ditu, Vercel-en 404 erroreak ekidinez.
        </p>
      </header>
      <nav className="flex flex-wrap gap-4">
        <a
          href="/app"
          className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
        >
          Ireki aplikazioa
        </a>
        <a
          href="/app/reports"
          className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white"
        >
          Txostenak
        </a>
      </nav>
      <p className="text-sm text-white/60">
        Orrialde hau sinplifikatuta dago lehen esperientzia egonkor bat bermatzeko. Aplikazioaren gainerako
        funtzionalitateak pixkanaka berreraiki daitezke.
      </p>
    </section>
  );
}
