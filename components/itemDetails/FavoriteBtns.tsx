import { Session } from "next-auth";
import AddToFavoritesBtn from "./AddToFavoritesBtn";
import { RemoveFromFavBtn } from "./RemoveFromFavBtn";
import { isProductFavorited } from "@/actions/read";

type propTypes = {
  productID: number;
  session: Session | null;
  sellerId: string;
};

export default async function FavoriteBtns({
  productID,
  session,
  sellerId,
}: propTypes) {
  if (!session?.user) {
    return <AddToFavoritesBtn productID={productID} session={session} />;
  }
  if (sellerId == session.user.id) {
    return;
  }
  const favorited = await isProductFavorited(productID);

  if (!favorited) {
    return <AddToFavoritesBtn productID={productID} session={session} />;
  } else {
    return <RemoveFromFavBtn productID={productID} />;
  }
}
