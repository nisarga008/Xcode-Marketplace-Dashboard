"use client";
import { Product } from "@/lib/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
];

export default function StatsBar({ items }: { items: Product[] }) {
  const byCat: Record<string, number> = {};
  items.forEach((p) => {
    byCat[p.category] = (byCat[p.category] ?? 0) + 1;
  });

  const data = Object.entries(byCat)
    .map(([name, count]) => ({ name, count }))
    .slice(0, 6);

  if (data.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm bg-white dark:bg-gray-900">
      <div className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
        Visible Products by Category
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              formatter={(value: number) => [`${value}`, "Products"]}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
