import "server-only";
import { auth } from "@/auth";
import { firestore } from "@/firebase";
import { firestoreNotificationsWithId } from "@/lib/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const notificationsRef = collection(firestore, "notifications");
    const notificationsQuery = query(
      notificationsRef,
      where("receiver", "==", session.user.id),
      orderBy("sentAt", "desc")
    );
    const querySnapshot = await getDocs(notificationsQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        sentAt: data.sentAt?.toDate(),
      } as firestoreNotificationsWithId;
    });
  } catch (e) {
    console.error("Error querying notifications: ", e);
    throw new Error("Failed to fetch notifications");
  }
}
