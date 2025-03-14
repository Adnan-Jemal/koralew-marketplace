// app/api/search-items/route.ts
import { NextResponse } from "next/server";

import { ilike, eq, and, inArray } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import type { conditionType, ItemWithImages } from "@/lib/types";
import { items } from "@/db/schema/items";
import { itemImages } from "@/db/schema/itemImages";
import { db } from "@/db/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const conditionsStr = searchParams.get("conditions");
  const offsetParam = searchParams.get("offset"); // e.g. "new,used"

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
  let conditions: conditionType[] | undefined;
  if (conditionsStr) {
    conditions = conditionsStr.split(",") as conditionType[];
  }

  try {
    const filters = [
      ilike(items.title, `%${query}%`),
      eq(items.status, "Active"),
    ];

    if (category) {
      filters.push(eq(items.category, category));
    }

    if (conditions && conditions.length > 0) {
      filters.push(inArray(items.condition, conditions));
    }

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
      .where(and(...filters))
      .offset(offset)
      .limit(4)
      .groupBy(items.id);

    return NextResponse.json(itemsWithImgs as ItemWithImages[]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching items", details: error },
      { status: 500 }
    );
  }
}
