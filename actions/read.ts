"use server"

import { auth } from "@/auth";
import { db } from "@/db/db"
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import { ItemWithImages } from "@/lib/types";
import { and, eq,ne,sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";



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
  try {
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
  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
    throw error
  }
  

  
}
export async function getCategoryItems(category:string) {

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
    `.as('images')
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.category,category))
    .groupBy(products.id)
    revalidatePath(`/?category=${category.toLowerCase}`)
  
    return items as ItemWithImages[];
  
}

export async function getItem(id:number) {
    const item = await db
    .select({
      id: products.id,
      userId:products.userId,
      title: products.title,
      category:products.category,
      condition: products.condition,
      createdAt: products.createdAt,
      price: products.price,
      description:products.description,
      images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as('images')
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.id,id)).groupBy(products.id)
    return item[0] as ItemWithImages
}
export async function getItemSeller(userId:string) { 
 const seller = (await db.select().from(users).where(eq(users.id,userId)))
    return seller[0] as SelectUser
  }

  export async function getSimilarCategoryItems(category:string,productId:number) {

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
    `.as('images')
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(and(eq(products.category,category),ne(products.id,productId)))
    .groupBy(products.id)
    revalidatePath(`/?category=${category.toLowerCase}`)
  
    return items as ItemWithImages[];
  
}

