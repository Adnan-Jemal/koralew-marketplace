import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products, SelectProduct } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import { ItemWithImages } from "@/lib/types";
import { and, desc, eq, ne, sql } from "drizzle-orm";

import { redirect } from "next/navigation";

export async function getUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));
    return user.at(0);
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get user");
  }
}

export async function getUserItems() {
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
      .from(products)
      .innerJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(products.userId, session.user.id))
      .groupBy(products.id)
      .orderBy(sql`${products.createdAt} DESC`);
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategoryItems(category: string) {
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
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.category, category))
    .groupBy(products.id);

  return items as ItemWithImages[];
}

export async function getItem(id: number) {
  const item = await db
    .select({
      id: products.id,
      userId: products.userId,
      title: products.title,
      category: products.category,
      condition: products.condition,
      createdAt: products.createdAt,
      price: products.price,
      description: products.description,
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
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.id, id))
    .groupBy(products.id);
  return item[0] as ItemWithImages;
}
export async function getItemSeller(userId: string) {
  const seller = await db.select().from(users).where(eq(users.id, userId));
  return seller[0] as SelectUser;
}

export async function getSimilarCategoryItems(
  category: string,
  productId: number
) {
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
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(and(eq(products.category, category), ne(products.id, productId)))
    .groupBy(products.id);

  return items as ItemWithImages[];
}

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

export function getItemImgs(productId: number) {
  const productImgs = db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId));
  return productImgs;
}

export function getItemWithOutImgs(itemId: number) {
  const item = db.select().from(products).where(eq(products.id, itemId));
  return item;
}
