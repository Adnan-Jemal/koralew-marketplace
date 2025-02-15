import "server-only";
import { auth } from "@/auth";
import { firestore } from "@/firebase";
import { firestoreChatTypeWithId } from "@/lib/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";

export async function getChat(sellerId: string, itemId: number) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const buyerId = session.user.id;
  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("itemId", "==", itemId),
      where("sellerId", "==", sellerId),
      where("buyerId", "==", buyerId),
      where(
        "chatId",
        "==",
        itemId.toString() +
          "-" +
          sellerId.slice(0, 4) +
          "-" +
          buyerId.slice(0, 4)
      )
    );
    const querySnapshot = await getDocs(chatQuery);

    if (!querySnapshot.empty) {
      // Return the first matching chat's id
      return querySnapshot.docs[0].id;
    }
    // Return null if no chat is found
    return null;
  } catch (e) {
    console.error("Error querying chat: ", e);
    throw e;
  }
}
export async function getSellingChats() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("sellerId", "==", session.user.id),
      where("itemSnapshot.status", "!=", "Removed"),
      orderBy("lastMessageAt", "desc")
    );
    const querySnapshot = await getDocs(chatQuery);

    // Convert documents to usable data
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastMessageAt: data.lastMessageAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    });
  } catch (e) {
    console.error("Error querying chats: ", e);
    throw new Error("Failed to fetch selling chats"); // Better error message
  }
}

export async function getBuyingChats() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("buyerId", "==", session.user.id),
      where("itemSnapshot.status", "!=", "Removed"),
      orderBy("lastMessageAt", "desc")
    );
    const querySnapshot = await getDocs(chatQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastMessageAt: data.lastMessageAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    });
  } catch (e) {
    console.error("Error querying chats: ", e);
    throw new Error("Failed to fetch buying chats");
  }
}
export async function getChatById(ChatId: string) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatRef = doc(firestore, "chats", ChatId);
    const docSnap = await getDoc(chatRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        lastMessageAt: docSnap.data().lastMessageAt?.toDate(),
        createdAt: docSnap.data().createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error querying chat: ", e);
    throw e;
  }
}
