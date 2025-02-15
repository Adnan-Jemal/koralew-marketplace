import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { itemImages } from "@/db/schema/itemImages";
import { items } from "@/db/schema/items";
import { ItemWithImages } from "@/lib/types";
import { and, desc, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function isItemFavorited(itemId: number) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const result = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.itemId, itemId),
          eq(favorites.userId, session?.user?.id)
        )
      );
    return result.length > 0;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw error;
  }
}

export async function getFavoriteItems() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
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
          'itemId',${itemImages.itemId}
        )
      )
    `.as("images"),
      })
      .from(favorites)
      .innerJoin(items, eq(favorites.itemId, items.id))
      .innerJoin(itemImages, eq(items.id, itemImages.itemId))
      .where(eq(favorites.userId, session.user.id))
      .groupBy(items.id, favorites.createdAt)
      .orderBy(desc(favorites.createdAt));
    return itemsWithImgs as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
