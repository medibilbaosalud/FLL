import { MainNav } from "@/components/main-nav";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1b16]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-white">ArchéoSense</span>
          <MainNav />
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
