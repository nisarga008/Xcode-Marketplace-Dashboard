import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchemaPartial } from "@/lib/validators";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idx = db.items.findIndex((p) => p.id === params.id);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const { error, value } = productSchemaPartial.validate(body, {
    abortEarly: false,
  });

  if (error) {
    return NextResponse.json(
      { error: error.details.map((e) => e.message) },
      { status: 400 }
    );
  }

  db.items[idx] = { ...db.items[idx], ...value };
  const updated = db.items[idx];
  return NextResponse.json(updated);
}
