"use server";
import { auth } from "@/auth";
import { addItemFormSchema } from "@/components/createEditListing/AddItemForm";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { InsertProduct, products } from "@/db/schema/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

export async function addItem(formValues: z.infer<typeof addItemFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  let newProduct: InsertProduct = { ...formValues, userId: session.user.id };
  let addedProduct = await db
    .insert(products)
    .values(newProduct)
    .returning({ newProductId: products.id });
  return addedProduct[0].newProductId;
}
export async function addImage(productId: number, Url: string, index: number) {
  try {
    await db
      .insert(productImages)
      .values({ productId: productId, imageUrl: Url, order: index });
    console.log("added to db");
  } catch (error) {
    console.error(error);
  }
}
export async function addToFavorites(productId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }

  try {
    await db
      .insert(favorites)
      .values({ productId: productId, userId: session.user.id });
    revalidatePath("account/favorites");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
