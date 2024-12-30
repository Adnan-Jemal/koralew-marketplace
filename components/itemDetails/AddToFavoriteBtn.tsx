"use client";
import { Button } from "../ui/button";
import { addToFavorites } from "@/actions/create";
import { toast } from "sonner";
import { Heart, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";
import { isProductFavorited } from "@/actions/read";
import { deleteFavorite } from "@/actions/delete";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type propTypes = {
  productID: number;
};

export default function AddToFavoriteBtn({ productID }: propTypes) {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  const checkSession = () => {
    if (session.status == "unauthenticated") {
      const redirectURL = encodeURIComponent(window.location.href);
      router.push(`/signin?callbackUrl=${redirectURL}`);
      toast.info("Please Sign in First");
    }
  };

  useEffect(() => {
    async function checkFavoriteStatus() {
      if (session.status == "authenticated") {
        try {
          setLoading(true);
          const favorited = await isProductFavorited(productID);
          setFavorited(favorited);
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      }
    }
    checkFavoriteStatus();
  }, [productID, session.status]);

  const handelAddToFavorites = async () => {
    checkSession();
    if (session.status == "authenticated") {
      try {
        setLoading(true);
        setFavorited(true);
        await addToFavorites(productID);
        toast.success("Item Added To Favorites");
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
        setFavorited(false);
        setLoading(false);
      }
    }
  };

  const handelRemoveFromFavorites = async () => {
    checkSession();
    if (favorited && session.status == "authenticated") {
      try {
        setLoading(true);
        await deleteFavorite(productID);
        setFavorited(false);
        toast.success("Item Removed From Favorites");
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  if (!favorited) {
    return (
      <Button
        className="flex items-center justify-center gap-1"
        variant="ghost"
        disabled={loading}
        onClick={handelAddToFavorites}
      >
        <Heart className={"size-5 "} />
        <span className="hidden sm:inline">Add to Favorites</span>
      </Button>
    );
  } else {
    return (
      <Button
        className="flex items-center justify-center gap-1"
        variant="ghost"
        disabled={loading}
        onClick={handelRemoveFromFavorites}
      >
        <HeartCrack className={"size-5 "} />
        <span className="hidden sm:inline">Remove From Favorites</span>
      </Button>
    );
  }
}
