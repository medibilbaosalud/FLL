"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  return (
    <div className="max-w-xl mx-auto my-12 card p-6" role="alert">
      <h2 className="text-lg font-semibold mb-2">Arazo bat gertatu da</h2>
      <p className="text-slate-600 mb-4">{error.message}</p>
      <button
        className="px-3 py-2 rounded-xl bg-slate-900 text-white"
        onClick={reset}
        type="button"
      >
        Berriro saiatu
      </button>
    </div>
  );
}
