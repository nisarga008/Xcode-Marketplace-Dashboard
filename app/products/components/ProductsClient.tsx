"use client";
import { useMemo, useState } from "react";
import Filters from "./Filters";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import ProductDrawer from "./ProductDrawer";
import StatsBar from "./StatsBar";
import { PaginatedProducts, Product } from "@/lib/types";

export default function ProductsClient({
  initialData,
}: {
  initialData: PaginatedProducts;
}) {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (qs: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?${qs}`);
      const json = (await res.json()) as PaginatedProducts;
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(
    () => Array.from(new Set(data.items.map((i) => i.category))).sort(),
    [data.items]
  );

  return (
    <div className="space-y-4">
      <Filters
        total={data.total}
        categories={categories}
        onQueryChange={fetchData}
      />
      <StatsBar items={data.items} />
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <ProductTable
          items={data.items}
          sortBy={data.meta.sortBy || "createdAt"}
          sortOrder={data.meta.sortOrder || "desc"}
          onSort={(sortBy, sortOrder) => {
            const sp = new URLSearchParams(data.meta.query);
            sp.set("sortBy", sortBy);
            sp.set("sortOrder", sortOrder);
            sp.set("page", "1");
            fetchData(sp.toString());
          }}
          onRowClick={(p) => setSelected(p)}
          loading={loading}
        />
      </div>
      <Pagination
        page={data.meta.page}
        pages={data.meta.pages}
        onPage={(page) => {
          const sp = new URLSearchParams(data.meta.query);
          sp.set("page", String(page));
          fetchData(sp.toString());
        }}
      />
      <ProductDrawer product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
