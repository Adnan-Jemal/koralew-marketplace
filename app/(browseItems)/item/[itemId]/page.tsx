import { increaseView } from "@/actions/item";
import { auth } from "@/auth";
import Notice from "@/components/general/Notice";
import DeleteItemBtn from "@/components/itemDetails/DeleteItemBtn";
import FavoriteBtns from "@/components/itemDetails/FavoriteBtns";
import ItemBreadCrumbs from "@/components/itemDetails/ItemBreadCrumbs";
import ItemDescription from "@/components/itemDetails/ItemDescription";
import ItemImages from "@/components/itemDetails/ItemImages";
import ItemInfo from "@/components/itemDetails/ItemInfo";
import MarkaAsSoldBtn from "@/components/itemDetails/MarkaAsSoldBtn";
import { SellerProfile } from "@/components/itemDetails/SellerProfile";
import ShareBtn from "@/components/itemDetails/ShareBtn";
import { SimilarItems } from "@/components/itemDetails/SimilarItems";

import { Button } from "@/components/ui/button";
import { getItem } from "@/data/item";
import { getItemSeller } from "@/data/user";
import { InfoIcon, PackageOpen } from "lucide-react";
import Link from "next/link";

export default async function page(props: {
  params: Promise<{ itemId: string }>;
}) {
  const params = await props.params;
  const itemId = parseInt(params.itemId);
  const session = await auth();
  const item = await getItem(itemId);
  if (!item) {
    return (
      <>
        <div className="flex flex-col w-full h-96 items-center justify-center text-center">
          <PackageOpen className="size-36 mb-6" />
          <h2 className="text-3xl font-bold">Item Not Found</h2>
          <p>{"sorry this item is not available:("}</p>
        </div>
      </>
    );
  }

  const seller = await getItemSeller(item.userId);
  if (seller.id != session?.user?.id) await increaseView(itemId);

  return (
    <>
      <div className="max-w-7xl mx-auto flex-1">
        {seller.id == session?.user?.id && item.status != "Sold" && (
          <div className="bg-secondary mt-6 mx-8 py-6 px-6 flex items-center justify-center gap-4 rounded-xl flex-col sm:flex-row text-center sm:text-left">
            <InfoIcon size={72} className="size-20" />
            <div className="mx-4">
              <h3 className="text-2xl font-semibold">This is Your Item</h3>
              <p className="">
                You are viewing an item you listed. Use the buttons here to
                update the details or make changes to your listing.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center mx-4 gap-4 w-full">
              <Button asChild size={"lg"} className=" text-lg rounded-xl ">
                <Link href={`/item/${params.itemId}/edit`}>Edit Item</Link>
              </Button>
              <MarkaAsSoldBtn itemId={itemId} />
              <DeleteItemBtn itemId={itemId} />
            </div>
          </div>
        )}

        {item.status === "Sold" && (
          <div className="m-6">
            <Notice
              title="This Item is Sold"
              message="You are viewing an item with a status of sold meaning the item is no longer available for purchase."
            />
          </div>
        )}
        <div className="w-[85%]  mx-auto flex justify-between items-center py-4 ">
          <ItemBreadCrumbs category={item.category} />
          <div className="flex">
            <FavoriteBtns
              session={session}
              sellerId={seller.id}
              itemId={itemId}
            />
            <ShareBtn />
          </div>
        </div>

        <div className=" mx-auto w-full flex gap-2 flex-col lg:flex-row ">
          <ItemImages images={item?.images.sort((a, b) => a.order - b.order)} />
          <div className="w-[90%] mx-auto lg:w-[45%] flex flex-col pt-4 gap-4 overflow-x-clip">
            <h2 data-cy="item-title" className="text-5xl  ">{item.title}</h2>
            <p  data-cy="item-price"className="text-4xl py-2">
              {parseInt(item.price).toLocaleString() + " ብር"}
            </p>
            <ItemInfo
              createdAt={item.createdAt}
              category={item.category}
              condition={item.condition}
            />

            <SellerProfile item={item} seller={seller} session={session} />
            <ItemDescription description={item.description} />
          </div>
        </div>
        <SimilarItems category={item.category} itemId={item.id} />
      </div>
    </>
  );
}
