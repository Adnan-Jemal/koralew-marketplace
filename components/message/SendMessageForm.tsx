"use client";
import { Ellipsis, Send } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

import { Session } from "next-auth";
import { createMessage } from "@/actions/message";
import { createNotification } from "@/actions/notification";

type propTypes = {
  chatDocId: string;
  chatId: string;
  session: Session;
  receiverId: string;
};

const SendMessageForm = ({
  chatDocId,
  chatId,
  receiverId,
  session,
}: propTypes) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await createMessage(
      chatDocId,
      chatId,
      session.user?.id || "",
      receiverId,
      message
    );
    await createNotification(
      receiverId,
      "New Message",
      `you have a new message from ${session.user?.name}`,
      `/account/messages/${chatDocId}`
    );
    setMessage("");
    setSending(false);
    window.scrollTo({ behavior: "smooth" });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t-2 abs ">
      <div className=" flex w-full gap-4">
        <TextareaAutosize
          disabled={sending}
          autoFocus
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={2}
          maxRows={6}
          className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 focus:ring-2  bg-secondary resize-none"
        />
        <Button disabled={sending} onClick={handleSend} size={"icon"}>
          {sending ? (
            <Ellipsis className="text-4xl animate-bounce" />
          ) : (
            <Send className={`${sending && "animate-bounce"}`} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SendMessageForm;
