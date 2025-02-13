"use server";
import { auth } from "@/auth";
import { firestore } from "@/firebase";
import { notificationTypes } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";

export async function createNotification(
  receiver: string,
  type: notificationTypes,
  message: string,
  link: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }

  try {
    const notificationRef = await addDoc(
      collection(firestore, "notifications"),
      {
        receiver: receiver,
        type: type,
        message: message,
        link: link,
        read: false,
        sentAt: serverTimestamp(),
      }
    );
    return notificationRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//update

export async function markaNotificationRead(notificationId: string) {
  try {
    const notificationRef = doc(firestore, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: true,
    });
  } catch (error) {
    console.error("Error updating chat:", error);
  }
}
