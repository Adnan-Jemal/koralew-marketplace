import { Session } from "next-auth";
import AddToFavoritesBtn from "./AddToFavoritesBtn";
import { RemoveFromFavBtn } from "./RemoveFromFavBtn";
import { isItemFavorited } from "@/data/favorite";

type propTypes = {
  itemId: number;
  session: Session | null;
  sellerId: string;
};

export default async function FavoriteBtns({
  itemId,
  session,
  sellerId,
}: propTypes) {
  if (!session?.user) {
    return <AddToFavoritesBtn itemId={itemId} session={session} />;
  }
  if (sellerId == session.user.id) {
    return;
  }
  const favorited = await isItemFavorited(itemId);

  if (!favorited) {
    return <AddToFavoritesBtn itemId={itemId} session={session} />;
  } else {
    return <RemoveFromFavBtn itemId={itemId} />;
  }
}
