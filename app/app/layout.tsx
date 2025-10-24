import type { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-semibold">ArchéoSense aplikazioa</h1>
        <p className="text-sm text-white/70">
          Demo sinplea da: atal nagusiak prest daude baina edukia oraindik laburra da.
        </p>
        <nav className="flex flex-wrap gap-3 text-sm">
          <a className="underline-offset-4 hover:underline" href="/app">
            Mapa orokorra
          </a>
          <a className="underline-offset-4 hover:underline" href="/app/triage">
            Lehentasun taula
          </a>
          <a className="underline-offset-4 hover:underline" href="/app/scenario">
            Eszenario laborategia
          </a>
          <a className="underline-offset-4 hover:underline" href="/app/reports">
            Txostenak
          </a>
          <a className="underline-offset-4 hover:underline" href="/app/settings">
            Ezarpenak
          </a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
