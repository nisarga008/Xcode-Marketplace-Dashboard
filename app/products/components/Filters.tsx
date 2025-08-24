"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export default function Filters({
  total,
  categories,
  onQueryChange,
}: {
  total: number;
  categories: string[];
  onQueryChange: (qs: string) => void;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(sp.get("category") ?? "");
  const [status, setStatus] = useState(sp.get("status") ?? "");
  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [limit, setLimit] = useState(Number(sp.get("limit") ?? 10));
  const debounceRef = useRef<NodeJS.Timeout | null>(null);


  // Builds query parameters based on current filter values and updates the URL

  const onApply = () => {
    const params = new URLSearchParams(Array.from(sp.entries()));
    if (category) params.set("category", category);
    else params.delete("category");
    if (status) params.set("status", status);
    else params.delete("status");
    if (search) params.set("search", search);
    else params.delete("search");
    params.set("limit", String(limit));
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
    onQueryChange(params.toString());
  };

  useEffect(() => {

    // Debounce search input: apply filters after 400ms of no typing

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(onApply, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <div className="flex flex-wrap gap-4 flex-1 items-end">
        <div className="relative flex flex-col">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="peer rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label className="absolute left-3 -top-2.5 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 transition-all pointer-events-none">
            Category
          </label>
          <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative flex flex-col">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="peer rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <label className="absolute left-3 -top-2.5 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 transition-all pointer-events-none">
            Status
          </label>
          <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative flex-1 min-w-[220px] flex flex-col">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or vendor"
            className="peer w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
          />
          <label className="absolute left-3 -top-2.5 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 pointer-events-none">
            Search
          </label>
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative flex flex-col">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="peer rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label className="absolute left-3 -top-2.5 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 pointer-events-none">
            Rows
          </label>
          <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={onApply}
          className="self-start sm:self-auto px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold shadow-md transition"
        >
          Apply
        </button>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-5 text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
        Total:{" "}
        <span className="text-brand-500 dark:text-brand-400">{total}</span>
      </div>
    </div>
  );
}
