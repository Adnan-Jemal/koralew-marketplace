import AddToFavoritesBtn from "./AddToFavoritesBtn";
import { RemoveFromFavBtn } from "./RemoveFromFavBtn";
import { isProductFavorited } from "@/actions/read";
import { auth } from "@/auth";

type propTypes = {
  productID: number;
};

export default async function FavoriteBtns({ productID }: propTypes) {
  const session = await auth();
  if (!session?.user) {
    return <AddToFavoritesBtn productID={productID} session={session} />;
  }
  const favorited = await isProductFavorited(productID);

  if (!favorited) {
    return <AddToFavoritesBtn productID={productID} session={session} />;
  } else {
    return <RemoveFromFavBtn productID={productID} />;
  }
}
