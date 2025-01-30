"use server";
import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { users } from "@/db/schema/users";
import { storage } from "@/firebase";

import { and, eq, inArray } from "drizzle-orm";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function deleteItemImgs(itemImgUrls: string[], itemId: number) {
  for (const imgURL of itemImgUrls) {
    // ex. https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1022%2Fimage_2?alt=media&token=7e03e839-9329-43a1-96c7-4a69bf028799

    const encodedPath = imgURL.split("/o/")[1].split("?")[0];
    const decodedPath = decodeURIComponent(encodedPath);
    await db
      .delete(productImages)
      .where(
        and(
          eq(productImages.productId, itemId),
          eq(productImages.imageUrl, imgURL)
        )
      );
    //delete form cloud storage
    // Create a reference to the file to delete
    const desertRef = ref(storage, decodedPath);
    // Delete the file
    await deleteObject(desertRef).catch((error) => {
      console.error(error);
    });
  }
}
