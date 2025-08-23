export default function StatusBadge({ status }: { status: 'active' | 'out-of-stock' }) {
  const isActive = status === 'active';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${isActive ? 'text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950/40 dark:border-green-900' : 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-300 dark:bg-yellow-950/40 dark:border-yellow-900'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`} />
      {isActive ? 'Active' : 'Out of Stock'}
    </span>
  );
}