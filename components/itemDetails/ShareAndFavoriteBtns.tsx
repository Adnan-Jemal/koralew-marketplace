import AddToFavoriteBtn from "./AddToFavoriteBtn";
import ShareBtn from "./ShareBtn";
import { auth } from "@/auth";

export const ShareAndFavoriteBtns = async ({
  productID,
}: {
  productID: number;
}) => {
  const session = await auth();
  return (
    <div className="flex">
      <AddToFavoriteBtn productID={productID} userSession={session} />
      <ShareBtn />
    </div>
  );
};
