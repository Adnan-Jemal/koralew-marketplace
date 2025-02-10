"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { firestoreMessageTypeWithId } from "@/lib/types";
import { firestore } from "@/firebase";
import { Session } from "next-auth";
import clsx from "clsx";
import { formatDate } from "date-fns";

interface MessagesProps {
  chatId: string;
  initialMessages: firestoreMessageTypeWithId[];
  session: Session;
}

const Messages: React.FC<MessagesProps> = ({
  chatId,
  initialMessages,
  session,
}) => {
  const [messages, setMessages] =
    useState<firestoreMessageTypeWithId[]>(initialMessages);

  useEffect(() => {
    // Ensure we have an authenticated user
    if (!session?.user?.id) return;

    // Reference the "messages" collection
    const messagesRef = collection(firestore, "messages");

    // Create a query filtering messages by chatId and ordering by sentAt in ascending order.
    const messagesQuery = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("sentAt", "asc")
    );

    // Set up the realtime listener.
    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const msgs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            sentAt: data.sentAt?.toDate(),
          } as firestoreMessageTypeWithId;
        });
        setMessages(msgs);
      },
      (error) => {
        console.error("Error fetching realtime messages:", error);
      }
    );

    // Clean up the listener on unmount or when chatId/session changes.
    return () => unsubscribe();
  }, [chatId, session]);

  return (
    <div className="flex-1 p-4 flex flex-col-reverse overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary h-full">
      <div className="flex flex-col gap-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 w-full flex flex-col gap-2 ${
              msg.senderId == session.user?.id ? " items-end" : " items-start"
            }`}
          >
            <div
              className={clsx(" p-2 rounded-lg", {
                "bg-primary text-primary-foreground rounded-br-none  ":
                  session.user?.id == msg.senderId,
                "bg-secondary rounded-bl-none ":
                  session.user?.id != msg.senderId,
              })}
            >
              <p className="text-base">{msg.message}</p>
            </div>

            {msg.sentAt && (
              <span className="text-xs text-gray-500">
                {formatDate(msg.sentAt,'LLL dd h:mm aa')}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
