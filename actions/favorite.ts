"use server";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

//delete
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
