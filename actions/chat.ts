"use server";
import { auth } from "@/auth";
import { getChat } from "@/data/chat";
import { SelectUser } from "@/db/schema/users";
import { firestore } from "@/firebase";
import { ItemStatusType, ItemWithImages } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { createMessage } from "./message";

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
    const chatId =
      item.id.toString() +
      "-" +
      seller.id.slice(0, 4) +
      "-" +
      buyerId.slice(0, 4);
    const chatRef = await addDoc(collection(firestore, "chats"), {
      chatId: chatId,
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
    await createMessage(
      chatRef.id,
      chatId,
      session.user.id,
      seller.id,
      message
    );
    return chatRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//update
export async function updateItemStatusForChat(
  itemId: number,
  newStatus: ItemStatusType
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  try {
    const chatsRef = collection(firestore, "chats");
    const q = query(
      chatsRef,
      where("productId", "==", itemId),
      where("sellerId", "==", session.user.id)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      await updateDoc(docSnap.ref, {
        "itemSnapshot.status": newStatus.toString(),
      });
    });
  } catch (e) {
    console.error("Error updating item status: ", e);
  }
}

export async function updateChat(newMessage: string, chatDocId: string) {
  try {
    const chatRef = doc(firestore, "chats", chatDocId);
    await updateDoc(chatRef, {
      lastMessage: newMessage,
      lastMessageAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating chat:", error);
  }
}
