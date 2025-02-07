"use client";
import { updateItemStatus } from "@/actions/update";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const MarkaAsSoldBtn = ({ itemId }: { itemId: number }) => {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handelClick = async () => {
    try {
      setUpdating(true);
      await updateItemStatus(itemId, "Sold");
      toast.success("Item Marked as Sold");
      router.replace("/account/my-items");
      setUpdating(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Dialog open={updating ? updating : undefined}>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className=" text-lg rounded-xl p-6"
        >
          Mark as Sold
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-xl dark:border-secondary">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>Is this Item Sold?</DialogTitle>
          <DialogDescription>
            Can you please confirm that this item is sold and no longer
            available for purchase? Once marked as sold, it will be disabled and
            removed from active listings.
          </DialogDescription>
        </DialogHeader>
        <Button disabled={updating} onClick={handelClick}>
          {updating ? (
            <Ellipsis className="text-4xl animate-bounce" />
          ) : (
            <span>Confirm Mark as Sold</span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MarkaAsSoldBtn;
