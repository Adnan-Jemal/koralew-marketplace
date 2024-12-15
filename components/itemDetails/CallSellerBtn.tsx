"use client";
import { Button } from "../ui/button";
import { Copy, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

type propTypes = {
  sellerPhoneNumber: string | null;
  session: Session | null;
};

export const CallSellerBtn = ({ sellerPhoneNumber, session }: propTypes) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const checkSession = () => {
    if (!session) {
      setOpen(false)
      const redirectURL = encodeURIComponent(window.location.href);
      router.push(`/signin?callbackUrl=${redirectURL}`);
    }
  };

  const handleCall = () => {
    if (!sellerPhoneNumber) {
      setOpen(false);
      toast.error("Phone number not found");
      return;
    }
    window.location.href = `tel:${sellerPhoneNumber}`;
    setOpen(false);
  };

  const copyPhoneNumber = () => {
    if (!sellerPhoneNumber) {
      setOpen(false);
      toast.error("Phone number not found");
      return;
    }
    navigator.clipboard
      .writeText(sellerPhoneNumber)
      .then(() => {
        setOpen(false);
        toast.success("Phone Number Copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("something went wrong");
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={checkSession}
          className="w-full flex gap-2 text-lg rounded-xl"
        >
          <PhoneCall className="size-6" />
          Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] text-center rounded-xl dark:border-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Seller Phone Number
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="border-2 w-fit mx-auto px-8 text-xl rounded-xl py-2">
            {sellerPhoneNumber}
          </p>
          <div className="flex mx-auto mt  gap-4">
            <Button
              className=" flex gap-2 text-lg rounded-xl"
              onClick={handleCall}
            >
              <PhoneCall /> Call
            </Button>
            <Button
              onClick={copyPhoneNumber}
              variant={"secondary"}
              className=" flex gap-2 text-lg rounded-xl"
            >
              <Copy /> Copy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
