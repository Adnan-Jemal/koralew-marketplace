"use server";
import { auth } from "@/auth";
import { addItemFormSchema } from "@/components/createEditListing/AddItemForm";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { InsertProduct, products, SelectProduct } from "@/db/schema/products";
import { firestore } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";
import { getChat } from "./read";
import { ItemWithImages } from "@/lib/types";
import { SelectUser } from "@/db/schema/users";

export async function addItem(formValues: z.infer<typeof addItemFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  let newProduct: InsertProduct = { ...formValues, userId: session.user.id };
  let addedProduct = await db
    .insert(products)
    .values(newProduct)
    .returning({ newProductId: products.id });
  return addedProduct[0].newProductId;
}
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

export async function createChat(
  seller: SelectUser,
  buyerId: string,
  item: ItemWithImages,
  message: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  if (buyerId != session.user.id) {
    return redirect("/");
  }

  try {
    // Check if the chat already exists
    const existingChatId = await getChat(seller.id, item.id);
    if (existingChatId) {
      return existingChatId;
    }
    const chatRef = await addDoc(collection(firestore, "chats"), {
      chatId:
        item.id.toString() +
        "-" +
        seller.id.slice(0, 4) +
        "-" +
        buyerId.slice(0, 4),
      sellerId: seller.id,
      buyerId: buyerId,
      productId: item.id,
      createdAt: serverTimestamp(),
      lastMessage: message,
      lastMessageAt: serverTimestamp(),
      sellerSnapshot: {
        sellerName: seller.name,
        sellerImg: seller.image,
      },
      BuyerSnapshot: {
        BuyerName: session.user.name,
        BuyerImg: session.user.image,
      },
      itemSnapshot: {
        title: item.title,
        thumbnail: item.images[0].imageUrl,
        originalPrice: item.price,
        status: (item.status ?? "active").toString(),
      },
    });
    return chatRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
