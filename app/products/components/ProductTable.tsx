"use client";
import { Product } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function ProductTable({
  items,
  sortBy,
  sortOrder,
  onSort,
  onRowClick,
  loading,
}: {
  items: Product[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string, order: "asc" | "desc") => void;
  onRowClick: (p: Product) => void;
  loading?: boolean;
}) {
  const header = (label: string, key?: keyof Product) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 relative">
      <button
        disabled={!key}
        onClick={() => {
          if (!key) return;
          const order =
            sortBy === key ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
          onSort(key, order);
        }}
        className="flex items-center gap-1 group"
      >
        <span>{label}</span>
        {key && (
          <span
            className={`ml-1 text-gray-400 transition-opacity duration-200 ${
              sortBy === key
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
            aria-hidden
          >
            {sortBy === key ? (sortOrder === "asc" ? "↑" : "↓") : "↑"}
          </span>
        )}
      </button>
    </th>
  );

  return (
    <div className="table-wrap">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900/40">
          <tr>
            {header("Name", "name")}
            {header("Price", "price")}
            {header("Stock", "stock")}
            {header("Category")}
            {header("Status")}
            {header("Vendor", "vendor")}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {items.length === 0 && !loading && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-16 text-center text-gray-500 dark:text-gray-400"
              >
                No products found.
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={6} className="px-4 py-8 animate-pulse text-gray-500">
                Loading…
              </td>
            </tr>
          )}
          {items.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900/40 cursor-pointer"
              onClick={() => onRowClick(p)}
            >
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3">₹{p.price.toFixed(2)}</td>
              <td className="px-4 py-3">{p.stock}</td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3">{p.vendor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
