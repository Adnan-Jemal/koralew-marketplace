"use server"

import { auth } from "@/auth";
import { db } from "@/db/db"
import { productImages, products, SelectUser, users } from "@/db/schema"

import { eq,sql } from "drizzle-orm";



export async function getUserById(id: SelectUser['id']) {
  const user = db.select().from(users).where(eq(users.id, id));
  return (await user).length > 0 ? (await user).at(0) : null;
  
}

// export async function getUserItems() {
//   const session = await auth()
//   if(!session?.user?.id){
//     console.error("no user id")
//     return
//   }
//   let items = await db.execute(sql`SELECT 
//     p.title,
//     p.id,
//     p.condition,
//     p.price,
//     ARRAY_AGG(pi.image_url) AS images
// FROM 
//     product p
// INNER JOIN 
//     product_images pi 
// ON 
//     p.id = pi.product_id
// WHERE
//     p.userId = ${session.user.id}
// GROUP BY 
//     p.id
// ORDER BY 
//     p.created_at desc;
// `)
  
//   return items
// }

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
