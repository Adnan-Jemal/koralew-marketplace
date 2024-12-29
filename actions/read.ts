"use server"

import { auth } from "@/auth";
import { db } from "@/db/db"
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import { ItemWithImages } from "@/lib/types";
import { and, eq,ne,sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";



export async function getUserById(id: SelectUser['id']) {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user.at(0)
  } catch (error) {
    console.error(error)
    throw new Error('Unable to get user');
  }
  
  
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
    .where(eq(products.userId, session.user.id))
    .groupBy(products.id)
    .orderBy(sql`${products.createdAt} DESC`);
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error)
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

export async function isProductFavorited(productId:number, userId: string) {
  try {
    const result = await db.select().from(favorites)
      .where(and(eq(favorites.productId, productId),eq(favorites.userId, userId)))
    return result.length > 0; 
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw new Error('Unable to check favorite status');
  }
}

export async function getFavoriteItems() {
  
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
    `.as('images')
    }).from(favorites)
    .innerJoin(products, eq(favorites.productId,products.id) )
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .groupBy(products.id)
    .orderBy(sql`${products.createdAt} DESC`);
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error)
    throw error
  }
  

  
}