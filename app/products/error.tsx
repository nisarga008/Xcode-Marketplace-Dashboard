'use client';
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="p-6 rounded-xl border border-red-300 dark:border-red-800 bg-red-50/60 dark:bg-red-950/40">
      <h2 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Something went wrong</h2>
      <p className="text-sm opacity-80">{error.message}</p>
    </div>
  );
}