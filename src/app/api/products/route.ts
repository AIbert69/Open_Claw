import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where = category ? { category, inStock: true } : { inStock: true };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(products);
}
