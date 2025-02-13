"use server";
import { auth } from "@/auth";
import { addItemFormSchema } from "@/components/createEditListing/AddItemForm";
import { db } from "@/db/db";
import { productImages } from "@/db/schema/productImages";
import { InsertProduct, products } from "@/db/schema/products";
import { ItemStatusType } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { deleteItemImgs } from "./itemImage";
import { updateItemStatusForChat } from "./chat";

//create
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
//update
export async function updateItem(
  formValues: z.infer<typeof addItemFormSchema>,
  itemId: number
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  await db
    .update(products)
    .set({
      title: formValues.title,
      category: formValues.category,
      description: formValues.description,
      price: formValues.price,
      condition: formValues.condition,
    })
    .where(and(eq(products.userId, session.user.id), eq(products.id, itemId)));
}

export async function updateItemStatus(
  itemId: number,
  newStatus: ItemStatusType
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  await db
    .update(products)
    .set({
      status: newStatus,
    })
    .where(and(eq(products.userId, session.user.id), eq(products.id, itemId)));
  await updateItemStatusForChat(itemId, newStatus);
}

//delete
export async function deleteItem(itemId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return redirect("/signin");

  try {
    await db.transaction(async (trx) => {
      // Get current images using the transaction
      const currentImgs = await trx
        .select({ url: productImages.imageUrl })
        .from(productImages)
        .where(eq(productImages.productId, itemId));

      const currentImgUrls = currentImgs.map((img) => img.url);

      // Delete images using the transaction
      await deleteItemImgs(currentImgUrls, itemId, trx);
      //update chat item snapshot to item status removed
      await updateItemStatusForChat(itemId, "Removed");
      // Delete the product itself
      await trx
        .delete(products)
        .where(and(eq(products.userId, userId), eq(products.id, itemId)));
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
