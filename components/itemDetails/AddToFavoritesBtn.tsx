"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Heart } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { addToFavorites } from "@/actions/favorite";

type AddToFavoritesBtnType = {
  productID: number;
  session: Session | null;
};
export default function AddToFavoritesBtn({
  productID,
  session,
}: AddToFavoritesBtnType) {
  const router = useRouter();
  const [adding, setAdding] = useState<boolean>(false);

  const handelAddToFavorites = async () => {
    if (!session?.user) {
      const redirectURL = encodeURIComponent(window.location.href);
      router.push(`/signin?callbackUrl=${redirectURL}`);
      toast.info("Please Sign in First");
      return;
    }

    try {
      setAdding(true);
      await addToFavorites(productID);
      toast.success("Item Added To Favorites");
    } catch (error) {
      toast.error("Something went wrong");

      console.error(error);
    }
  };

  return (
    <Button
      disabled={adding}
      className="flex items-center justify-center gap-1"
      variant="ghost"
      onClick={handelAddToFavorites}
    >
      <Heart className={"size-5 "} />
      <span className="hidden sm:inline">Add to Favorites</span>
    </Button>
  );
}
