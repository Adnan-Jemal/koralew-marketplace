"use server";
import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { users } from "@/db/schema/users";
import { storage } from "@/firebase";
import { and, eq, ExtractTablesWithRelations, inArray } from "drizzle-orm";
import { NeonQueryResultHKT } from "drizzle-orm/neon-serverless";
import { PgTransaction } from "drizzle-orm/pg-core";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateItemStatusForChat } from "./update";

export async function deleteUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return redirect("/signin");

  try {
    // Start a transaction
    await db
      .transaction(async (trx) => {
        // First, get all product IDs for the specified user
        const userProductIds = await trx
          .select({ id: products.id })
          .from(products)
          .where(eq(products.userId, userId));

        const productIds = userProductIds.map((product) => product.id);

        if (productIds.length > 0) {
          // Delete images associated with the user's products
          await trx
            .delete(productImages)
            .where(inArray(productImages.productId, productIds));
        }

        // Delete products associated with the user
        await trx.delete(products).where(eq(products.userId, userId));

        // Delete the user
        await trx.delete(users).where(eq(users.id, userId));
      })
      .then(() => {
        SignOut();
        redirect("/");
      });
  } catch (error) {
    console.error("Error deleting user and related data:", error);
    throw error; // Re-throw to handle further up if needed
  }
}

export async function deleteFavorite(productId: number) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");

  try {
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.productId, productId),
          eq(favorites.userId, session.user.id)
        )
      );
    revalidatePath("account/favorites");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteItemImgs(
  itemImgUrls: string[],
  itemId: number,
  trx?: PgTransaction<
    NeonQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  > // Accept transaction as an optional parameter
) {
  for (const imgURL of itemImgUrls) {
    try {
      // Use Firebase SDK to parse the URL safely

      const desertRef = ref(storage, imgURL);
      // const decodedPath = desertRef.fullPath

      // Delete from database (use transaction if provided)
      const dbInstance = trx || db; // Use transaction or global db
      await dbInstance
        .delete(productImages)
        .where(
          and(
            eq(productImages.productId, itemId),
            eq(productImages.imageUrl, imgURL)
          )
        );

      // Delete from Cloud Storage
      await deleteObject(desertRef);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error; // Propagate error to abort transaction
    }
  }
}
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
