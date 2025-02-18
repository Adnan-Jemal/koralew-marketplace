import { auth } from "@/auth";
import EditListingMain from "@/components/createEditListing/EditItem/EditListingMain";
import { getItemWithOutImgs } from "@/data/item";
import { getItemImgs, getItemImgsMaxOrder } from "@/data/itemImage";
import { redirect } from "next/navigation";

export default async function ItemEditPage(props: {
  params: Promise<{ itemId: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  const itemImgs = await getItemImgs(parseInt(params.itemId));
  const item = await getItemWithOutImgs(parseInt(params.itemId));
  if (!item) {
    return redirect("/");
  }
  //to add new imgs after this so they do not conflict with previous once
  const maxImgOrder = await getItemImgsMaxOrder(parseInt(params.itemId));
  if (item.status == "Sold") {
    return redirect("/account/my-items");
  }
  return (
    <>
      <EditListingMain
        maxImgOrder={maxImgOrder || 0}
        item={item}
        session={session}
        itemImgs={itemImgs}
      />
    </>
  );
}
