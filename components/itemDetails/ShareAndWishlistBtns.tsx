"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Heart, Share } from "lucide-react";

export const ShareAndWishlistBtns = () => {
  function copyURL() {
    const url = window.location.href;
    console.log(url);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("something went wrong");
      });
  }
  return (
    <div className="flex">
      <Button
        className="flex items-center justify-center  gap-1"
        variant="ghost"
      >
        <Heart className="size-4" />
        Add to Wishlist
      </Button>
      <Button
        onClick={copyURL}
        className="flex items-center justify-center gap-1"
        variant="ghost"
      >
        <Share className="size-4" />
        Share
      </Button>
    </div>
  );
};
