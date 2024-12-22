"use client";
import { Button } from "../ui/button";
import { Heart, Share2 } from "lucide-react";
import { copyURL } from "@/lib/utils";

export const ShareAndFavoriteBtns = () => {
  return (
    <div className="flex">
      <Button
        className="flex items-center justify-center  gap-1"
        variant="ghost"
      >
        <Heart className="size-5" />
        <span className="hidden sm:inline">Add to Favorites</span>
      </Button>
      <Button
        onClick={() => copyURL()}
        className="flex items-center justify-center gap-1"
        variant="ghost"
      >
        <Share2 className="size-5" />
        <span className="hidden sm:inline">Share</span>
      </Button>
    </div>
  );
};
