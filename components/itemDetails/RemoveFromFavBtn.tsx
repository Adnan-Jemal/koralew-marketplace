"use client";
import { Button } from "../ui/button";
import { HeartCrack } from "lucide-react";

import { toast } from "sonner";
import { useState } from "react";
import { deleteFavorite } from "@/actions/favorite";

export const RemoveFromFavBtn = ({ itemId }: { itemId: number }) => {
  const [removing, setRemoving] = useState(false);
  const handelRemoveFromFavorites = async () => {
    try {
      setRemoving(true);
      await deleteFavorite(itemId);
      toast.success("Item Removed From Favorites");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Button
      className="flex items-center justify-center gap-1"
      variant="ghost"
      onClick={handelRemoveFromFavorites}
      disabled={removing}
    >
      <HeartCrack className={"size-5 "} />
      <span className="hidden sm:inline">Remove From Favorites</span>
    </Button>
  );
};
