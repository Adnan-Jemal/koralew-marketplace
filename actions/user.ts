"use server";
import { auth } from "@/auth";
import SignOut from "@/components/auth/SignOut";
import { db } from "@/db/db";
import { itemImages } from "@/db/schema/itemImages";
import { items } from "@/db/schema/items";
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
        // First, get all item IDs for the specified user
        const userItemIds = await trx
          .select({ id: items.id })
          .from(items)
          .where(eq(items.userId, userId));

        const itemIds = userItemIds.map((item) => item.id);

        if (itemIds.length > 0) {
          // Delete images associated with the user's items
          await trx
            .delete(itemImages)
            .where(inArray(itemImages.itemId, itemIds));
        }

        // Delete items associated with the user
        await trx.delete(items).where(eq(items.userId, userId));

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
