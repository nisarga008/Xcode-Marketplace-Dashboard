import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators";
import { Product } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const category = url.searchParams.get("category")?.toLowerCase();
    const status = url.searchParams.get("status")?.toLowerCase();
    const search = url.searchParams.get("search")?.toLowerCase();
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";

    let items = [...db.items];

    if (category)
      items = items.filter((i) => i.category.toLowerCase() === category);
    if (status)
      items = items.filter((i) => (i.status || "").toLowerCase() === status);
    if (search)
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(search) ||
          i.vendor?.toLowerCase().includes(search)
      );

    items.sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const total = items.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = items.slice(start, end);

    return NextResponse.json({
      items: paginatedItems,
      total: total,
      meta: {
        page,
        limit,
        pages: Math.ceil(total / limit),
        query: url.searchParams.toString(),
        sortBy,
        sortOrder,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error, value } = productSchema.validate(body, { abortEarly: false });

  if (error) {
    return NextResponse.json(
      { error: error.details.map((e) => e.message) },
      { status: 400 }
    );
  }

  const created: Product = {
    ...value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.items.unshift(created);
  return NextResponse.json(created, { status: 201 });
}
