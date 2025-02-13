"use client";
import { firestore } from "@/firebase";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Bell } from "lucide-react";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";

const NotificationIcon = ({ session }: { session?: Session | null }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    const notificationRef = collection(firestore, "notifications");

    // Verify your Firestore field names match these
    const notificationQuery = query(
      notificationRef,
      where("receiver", "==", session.user.id),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(
      notificationQuery,
      (querySnapshot) => {
        console.log(querySnapshot);
        setUnreadCount(querySnapshot.size);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        // Consider adding error state handling
      }
    );

    return () => unsubscribe();
  }, [session?.user?.id]);
  if (unreadCount > 0) {
    return (
      <Button asChild size={"icon"} variant={"secondary"} className="relative">
        <Link href={"/account/notifications"} className="relative">
          <div className="absolute top-0 right-0">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-blue-600"></span>
            </span>
          </div>

          <Bell />
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild size={"icon"} variant={"ghost"}>
      <Link href={"/account/notifications"}>
        <Bell />
      </Link>
    </Button>
  );
};

export default NotificationIcon;
