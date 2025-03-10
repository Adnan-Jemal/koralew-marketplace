"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { CheckCheck, Ellipsis, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ItemWithImages } from "@/lib/types";
import { SelectUser } from "@/db/schema/users";
import { createChat } from "@/actions/chat";
import { createNotification } from "@/actions/notification";

type propTypes = {
  seller: SelectUser;
  session: Session | null;
  item: ItemWithImages;
  existingChatId: string | null;
};

function MessageSellerBtn({
  seller,
  item,
  session,
  existingChatId,
}: propTypes) {
  const [message, setMessage] = useState("Hi, is this available");
  const [open, setOpen] = useState(false);
  const [existingChat, setExistingChat] = useState<string | null | undefined>(
    existingChatId
  );
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const checkChatAndSession = () => {
    if (!session?.user?.id) {
      setOpen(false);
      const redirectURL = encodeURIComponent(window.location.href);
      router.push(`/signin?callbackUrl=${redirectURL}`);
      toast.info("Please Sign in First");
    } else if (existingChat) {
      router.push(`/account/messages/${existingChat}`);
    } else {
      setOpen(true);
    }
  };

  const sendMessage = async () => {
    if (!session?.user?.id) {
      setOpen(false);
      return;
    }
    setSending(true);
    const newChatId = await createChat(seller, session.user.id, item, message);
    await createNotification(
      seller.id,
      "New Message",
      `you have a new message from ${session.user?.name}`,
      `/account/messages/${newChatId}?tab=selling`
    );
    if (!newChatId) {
      toast.error("something went wrong");
      setSending(false);
      setOpen(false);
    } else {
      toast.success("Message Sent");
      setSending(false);
      setOpen(false);
      setExistingChat(newChatId);
    }
  };

  return (
    <Dialog open={sending ? sending : open} onOpenChange={setOpen}>
      <Button
        disabled={item.status != "Active"}
        onClick={checkChatAndSession}
        className="w-full flex gap-2 text-lg rounded-xl"
      >
        <MessageSquareText /> Message{" "}
        {existingChat && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CheckCheck className="text-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{"you've already sent a message"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Button>

      <DialogContent className="w-[80%] rounded-xl dark:border-secondary">
        <DialogHeader>
          <DialogTitle className="text-xl">Send Message</DialogTitle>
          <DialogDescription>
            Enter your message to the seller below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={sendMessage} className="flex flex-col w-full gap-4">
          <Input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className=" w-full mx-auto px-4 text-lg rounded-xl py-2"
          />

          <DialogFooter>
            <Button
              disabled={sending}
              type="submit"
              className="w-full text-lg rounded-xl"
            >
              {sending ? (
                <Ellipsis className="text-4xl animate-bounce" />
              ) : (
                <span>Send</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MessageSellerBtn;
