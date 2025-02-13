import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { ItemWithImages } from "@/lib/types";
import { and, desc, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function isProductFavorited(productId: number) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const result = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.productId, productId),
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
    const items = await db
      .select({
        id: products.id,
        title: products.title,
        condition: products.condition,
        price: products.price,
        images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
      })
      .from(favorites)
      .innerJoin(products, eq(favorites.productId, products.id))
      .innerJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(favorites.userId, session.user.id))
      .groupBy(products.id, favorites.createdAt)
      .orderBy(desc(favorites.createdAt));
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
