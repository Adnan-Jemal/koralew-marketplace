// app/api/category-items/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import type { ItemWithImages } from "@/lib/types";
import { items } from "@/db/schema/items";
import { itemImages } from "@/db/schema/itemImages";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const offsetParam = searchParams.get("offset");

  if (!category) {
    return NextResponse.json(
      { error: "Missing category parameter" },
      { status: 400 }
    );
  }

  const offset = offsetParam ? parseInt(offsetParam) : 0;

  try {
    const itemsWithImgs = await db
      .select({
        id: items.id,
        title: items.title,
        condition: items.condition,
        price: items.price,
        images: sql`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'imageUrl', ${itemImages.imageUrl},
              'order', ${itemImages.order},
              'itemId', ${itemImages.itemId}
            )
          )
        `.as("images"),
      })
      .from(items)
      .innerJoin(itemImages, eq(items.id, itemImages.itemId))
      .where(and(eq(items.category, category), eq(items.status, "Active")))
      .offset(offset)
      .limit(10)
      .groupBy(items.id);

    return NextResponse.json(itemsWithImgs as ItemWithImages[]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category items", details: error },
      { status: 500 }
    );
  }
}
