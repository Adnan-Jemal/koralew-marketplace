"use server"

import { auth } from "@/auth";
import { db } from "@/db/db"
import { productImages, products, SelectUser, users } from "@/db/schema"
import { eq } from "drizzle-orm";


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
  let items = await db.select().from(products)
  .where(eq(products.userId,session.user.id))
  .innerJoin(productImages,eq(products.id,productImages.productId))
  
  return items
}
