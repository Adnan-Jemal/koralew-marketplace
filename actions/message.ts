"use server";
import { auth } from "@/auth";
import { firestore } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { redirect } from "next/navigation";
import { updateChat } from "./chat";

export async function createMessage(
  chatDocId: string,
  chatId: string,
  senderId: string,
  receiverId: string,
  message: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  if (session.user.id != senderId && session.user.id != receiverId) {
    return redirect("/signin");
  }

  try {
    const messageRef = await addDoc(collection(firestore, "messages"), {
      chatDocId: chatDocId,
      chatId: chatId,
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      messageRead: false,
      sentAt: serverTimestamp(),
    });
    await updateChat(message, chatDocId);

    return messageRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
