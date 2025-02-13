import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { ItemWithImages } from "@/lib/types";
import { and, eq, ne, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

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
        status: products.status,
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
    .where(and(eq(products.category, category), eq(products.status, "Active")))
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
      status: products.status,
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

export async function getItemWithOutImgs(itemId: number) {
  const item = await db.select().from(products).where(eq(products.id, itemId));
  return item[0];
}
