"use server"

import { auth } from "@/auth";
import { db } from "@/db/db"
import { productImages, products, SelectUser, users } from "@/db/schema"

import { eq,sql } from "drizzle-orm";



export async function getUserById(id: SelectUser['id']) {
  const user = db.select().from(users).where(eq(users.id, id));
  return (await user).length > 0 ? (await user).at(0) : null;
  
}

export async function getUserItems() {
  const session = await auth()
  if(!session?.user?.id){
    console.error("no user id")
    return
  }
  const items = await db
    .select({
      id: products.id,
      title: products.title,
      condition: products.condition,
      price: products.price,
      images: sql`ARRAY_AGG(${productImages.imageUrl})`.as('images')
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.userId, session.user.id))
    .groupBy(products.id)
    .orderBy(sql`${products.createdAt} DESC`);

  return items;
}
