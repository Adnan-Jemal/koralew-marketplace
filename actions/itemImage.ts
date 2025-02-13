"use server";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { productImages } from "@/db/schema/productImages";
import { storage } from "@/firebase";
import { and, eq, ExtractTablesWithRelations } from "drizzle-orm";
import { NeonQueryResultHKT } from "drizzle-orm/neon-serverless";
import { PgTransaction } from "drizzle-orm/pg-core";
import { deleteObject, ref } from "firebase/storage";
import { redirect } from "next/navigation";

export async function addImage(productId: number, Url: string, order: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  try {
    await db
      .insert(productImages)
      .values({ productId: productId, imageUrl: Url, order: order });
    console.log("added to db");
  } catch (error) {
    console.error(error);
  }
}
//delete
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
