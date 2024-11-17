"use client";
import { Button } from "../ui/button";
import { Heart, Share } from "lucide-react";
import { copyURL } from "@/lib/utils";

export const ShareAndFavoriteBtns = () => {

  return (
    <div className="flex">
      <Button
        className="flex items-center justify-center  gap-1"
        variant="ghost"
      >
        <Heart className="size-4" />
        Add to Favorites
      </Button>
      <Button
        onClick={()=>copyURL()}
        className="flex items-center justify-center gap-1"
        variant="ghost"
      >
        <Share className="size-4" />
        Share
      </Button>
    </div>
  );
};
