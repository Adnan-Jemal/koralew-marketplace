"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { deleteItem } from "@/actions/delete";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteItemBtn({ itemId }: { itemId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handelClick = async () => {
    try {
      setIsDeleting(true);
      await deleteItem(itemId);
      toast.success("Item deleted successfully");
      router.replace("/account/my-items");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Dialog open={isDeleting ? isDeleting : undefined}>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          variant={"destructive"}
          className=" text-lg rounded-xl p-6"
        >
          Remove Item
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-xl dark:border-secondary">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Remember{" "}
            <span className="text-red-400 font-semibold">
              this action cannot be undone.
            </span>{" "}
            This will permanently delete this item and remove all data
            associated with this item from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button
          disabled={isDeleting}
          onClick={handelClick}
          variant={"destructive"}
        >
          {isDeleting ? (
            <Ellipsis className="text-4xl animate-bounce" />
          ) : (
            <span>Delete Item Permanently</span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteItemBtn;
