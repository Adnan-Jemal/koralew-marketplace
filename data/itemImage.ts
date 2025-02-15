import "server-only";
import { db } from "@/db/db";
import { itemImages } from "@/db/schema/itemImages";
import { eq, max } from "drizzle-orm";

export async function getItemImgsMaxOrder(itemId: number) {
  const res = await db
    .select({ maxImgOrder: max(itemImages.order) })
    .from(itemImages)
    .where(eq(itemImages.itemId, itemId));
  return res[0].maxImgOrder;
}

export async function getItemImgs(itemId: number) {
  const itemImgs = await db
    .select()
    .from(itemImages)
    .where(eq(itemImages.itemId, itemId));
  return itemImgs;
}
