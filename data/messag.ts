import "server-only";
import { auth } from "@/auth";
import { firestore } from "@/firebase";
import { firestoreMessageTypeWithId } from "@/lib/types";
import {
  and,
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";

export async function getMessages(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(
      messagesRef,
      and(
        where("chatId", "==", chatId),
        or(
          where("senderId", "==", session.user.id),
          where("receiverId", "==", session.user.id)
        )
      ),
      orderBy("sentAt", "asc")
    );
    const querySnapshot = await getDocs(messagesQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        sentAt: data.sentAt?.toDate(),
      } as firestoreMessageTypeWithId;
    });
  } catch (e) {
    console.error("Error querying messages: ", e);
    throw new Error("Failed to fetch messages");
  }
}
