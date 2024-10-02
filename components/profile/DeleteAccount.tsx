"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AwardIcon } from "lucide-react";

const DeleteAccount = () => {
  //delete user and data from db and navigate /
  const DeleteUser = async () => {
    //delete user
  };
  return (
    <div className=" flex flex-col md:flex-row gap-4 justify-between items-center p-6 mt-20 border-2 border-secondary rounded-xl">
      <div className=" flex-col flex gap-5">
        <h2 className="font-semibold text-lg">Delete Account Permanently</h2>
        <p className="text-secondary-foreground">
          Remove or delete your account and data permanently from Koralew. This
          action can not be reversed!
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete Account</Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] rounded-xl dark:border-secondary">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Remember
              <span className="text-red-400 font-semibold">
                this action cannot be undone.
              </span>
              This will permanently delete your account and remove all your data
              from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button
            // disabled={deleting || usrloading || loading}
            onClick={DeleteUser}
            variant={"destructive"}
          >
            {/* {deleting ? (
              <span className="text-4xl animate-bounce">...</span>
            ) : (
              <span>Delete Permanently</span>
            )} */}
            <span>Delete Permanently</span>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
