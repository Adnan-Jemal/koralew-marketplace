import "server-only";
import { db } from "@/db/db";
import { productImages } from "@/db/schema/productImages";
import { eq, max } from "drizzle-orm";

export async function getItemImgsMaxOrder(itemId: number) {
  const res = await db
    .select({ maxImgOrder: max(productImages.order) })
    .from(productImages)
    .where(eq(productImages.productId, itemId));
  return res[0].maxImgOrder;
}

export async function getItemImgs(productId: number) {
  const productImgs = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId));
  return productImgs;
}
