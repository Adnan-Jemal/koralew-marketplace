"use server";
import { auth } from "@/auth";
import SignOut from "@/components/auth/SignOut";
import { db } from "@/db/db";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//update
export async function updateUser(data: Partial<Omit<SelectUser, "id">>) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }

  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, session.user.id));
  if (!result) {
    return {};
  }
}
export async function updateUserPhoto(imgUrl: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return redirect("/signin");
    await db
      .update(users)
      .set({ image: imgUrl })
      .where(eq(users.id, session.user.id));
    revalidatePath("/account/profile");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//delete
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
