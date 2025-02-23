import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { itemImages } from "@/db/schema/itemImages";
import { items } from "@/db/schema/items";
import { ItemWithImages } from "@/lib/types";
import { and, count, eq, ne, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function getUserItems() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const itemsWithImgs = await db
      .select({
        id: items.id,
        title: items.title,
        condition: items.condition,
        price: items.price,
        status: items.status,
        images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${itemImages.imageUrl},
          'order', ${itemImages.order},
          'itemId',${itemImages.itemId}
        )
      )
    `.as("images"),
      })
      .from(items)
      .innerJoin(itemImages, eq(items.id, itemImages.itemId))
      .where(eq(items.userId, session.user.id))
      .groupBy(items.id)
      .orderBy(sql`${items.createdAt} DESC`);
    return itemsWithImgs as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategoryItems(category: string) {
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
          'itemId',${itemImages.itemId}
        )
      )
    `.as("images"),
    })
    .from(items)
    .innerJoin(itemImages, eq(items.id, itemImages.itemId))
    .where(and(eq(items.category, category), eq(items.status, "Active")))
    .groupBy(items.id);

  return itemsWithImgs as ItemWithImages[];
}

export async function getItem(id: number) {
  const item = await db
    .select({
      id: items.id,
      userId: items.userId,
      title: items.title,
      category: items.category,
      condition: items.condition,
      createdAt: items.createdAt,
      price: items.price,
      description: items.description,
      status: items.status,
      images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${itemImages.imageUrl},
          'order', ${itemImages.order},
          'itemId',${itemImages.itemId}
        )
      )
    `.as("images"),
    })
    .from(items)
    .innerJoin(itemImages, eq(items.id, itemImages.itemId))
    .where(eq(items.id, id))
    .groupBy(items.id);
  return item[0] as ItemWithImages;
}

export async function getSimilarCategoryItems(
  category: string,
  itemId: number
) {
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
          'itemId',${itemImages.itemId}
        )
      )
    `.as("images"),
    })
    .from(items)
    .innerJoin(itemImages, eq(items.id, itemImages.itemId))
    .where(and(eq(items.category, category), ne(items.id, itemId)))
    .groupBy(items.id);

  return itemsWithImgs as ItemWithImages[];
}

export async function getItemWithOutImgs(itemId: number) {
  const item = await db.select().from(items).where(eq(items.id, itemId));
  return item[0];
}

export async function getTotalNumOfListedItems(session: Session | null) {
  if (!session?.user?.id) return 0;
  const result = await db
    .select({ totalItems: count() })
    .from(items)
    .where(eq(items.userId, session.user.id));
  return result[0].totalItems;
}

export async function getTotalItemsViews(session: Session | null) {
  if (!session?.user?.id) return 0;
  const result = await db
    .select({ views: items.views })
    .from(items)
    .where(eq(items.userId, session.user.id));

  var totalViews = 0;
  result.map((item) => (totalViews += item.views));
  return totalViews;
}
