"use server";
import { auth } from "@/auth";
import { addEditItemFormSchema } from "@/components/createEditListing/AddEditItemForm";
import { db } from "@/db/db";
import { itemImages } from "@/db/schema/itemImages";
import { InsertItem, items } from "@/db/schema/items";
import { ItemStatusType } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { deleteItemImgs } from "./itemImage";
import { updateItemStatusForChat } from "./chat";

//create
export async function addItem(
  formValues: z.infer<typeof addEditItemFormSchema>
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  let newItem: InsertItem = {
    ...formValues,
    userId: session.user.id,
  };
  let addedItem = await db
    .insert(items)
    .values(newItem)
    .returning({ newItemId: items.id });
  return addedItem[0].newItemId;
}
//update
export async function updateItem(
  formValues: z.infer<typeof addEditItemFormSchema>,
  itemId: number
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  await db
    .update(items)
    .set({
      title: formValues.title,
      category: formValues.category,
      description: formValues.description,
      price: formValues.price,
      condition: formValues.condition,
    })
    .where(and(eq(items.userId, session.user.id), eq(items.id, itemId)));
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
    .update(items)
    .set({
      status: newStatus,
    })
    .where(and(eq(items.userId, session.user.id), eq(items.id, itemId)));
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
        .select({ url: itemImages.imageUrl })
        .from(itemImages)
        .where(eq(itemImages.itemId, itemId));

      const currentImgUrls = currentImgs.map((img) => img.url);

      // Delete images using the transaction
      await deleteItemImgs(currentImgUrls, itemId, trx);
      //update chat item snapshot to item status removed
      await updateItemStatusForChat(itemId, "Removed");
      // Delete the item itself
      await trx
        .delete(items)
        .where(and(eq(items.userId, userId), eq(items.id, itemId)));
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
