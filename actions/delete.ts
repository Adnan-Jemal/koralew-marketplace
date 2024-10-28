"use server"
import SignOut from '@/components/SignOut';
import { db } from '@/db/db';
import { productImages, products, SelectUser, users } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { redirect } from 'next/navigation';
export async function deleteUser(userId: SelectUser['id']) {
  // await db.delete(users).where(eq(users.id, id)).);
  // await db.delete(productImages).
  try {
    // Start a transaction
    await db.transaction(async (trx) => {
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
      await trx
        .delete(products)
        .where(eq(products.userId, userId));
  
      // Delete the user
      await trx
        .delete(users)
        .where(eq(users.id, userId));
    }).then(() => {
      SignOut();
      redirect('/');
    });
  
  } catch (error) {
    console.error("Error deleting user and related data:", error);
    throw error; // Re-throw to handle further up if needed
  }
}