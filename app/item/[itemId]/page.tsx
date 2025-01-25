import { getItem, getItemSeller } from "@/actions/read";
import FavoriteBtns from "@/components/itemDetails/FavoriteBtns";
import ItemBreadCrumbs from "@/components/itemDetails/ItemBreadCrumbs";
import ItemDescription from "@/components/itemDetails/ItemDescription";
import ItemImages from "@/components/itemDetails/ItemImages";
import ItemInfo from "@/components/itemDetails/ItemInfo";
import { SellerProfile } from "@/components/itemDetails/SellerProfile";
import ShareBtn from "@/components/itemDetails/ShareBtn";
import { SimilarItems } from "@/components/itemDetails/SimilarItems";

export default async function page(props: { params: Promise<{ itemId: string }> }) {
  const params = await props.params;
  const item = await getItem(Number(params.itemId));
  const seller = await getItemSeller(item.userId);

  return (
    <>
      <div className="w-[85%] max-w-6xl mx-auto flex justify-between items-center py-4 ">
        <ItemBreadCrumbs category={item.category} />
        <div className="flex">
          <FavoriteBtns productID={parseInt(params.itemId)} />
          <ShareBtn />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex gap-2 flex-col lg:flex-row ">
        <ItemImages images={item?.images.sort((a, b) => a.order - b.order)} />
        <div className="w-[90%] mx-auto lg:w-[45%] flex flex-col pt-4 gap-4 ">
          <h2 className="text-5xl  ">{item.title}</h2>
          <p className="text-4xl py-2">
            ${parseInt(item.price).toLocaleString()}
          </p>
          <ItemInfo
            createdAt={item.createdAt}
            category={item.category}
            condition={item.condition}
          />

          <SellerProfile seller={seller} />
          <ItemDescription description={item.description} />
        </div>
      </div>
      <SimilarItems category={item.category} itemId={item.id} />
    </>
  );
}
