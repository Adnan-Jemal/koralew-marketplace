import { getItem, getItemSeller } from "@/actions/read";
import ItemBreadCrumbs from "@/components/itemDetails/ItemBreadCrumbs";
import ItemImages from "@/components/itemDetails/ItemImages";
import ItemInfo from "@/components/itemDetails/ItemInfo";
import { SellerProfile } from "@/components/itemDetails/SellerProfile";

import { Navbar } from "@/components/layouts/nav/Navbar";
import { BadgeCheck, Grid2x2 } from "lucide-react";

export default async function page({ params }: { params: { itemId: string } }) {
  const item = await getItem(Number(params.itemId));
  const seller = await getItemSeller(item.userId);

  return (
    <>
      <Navbar />
      <ItemBreadCrumbs category={item.category}/>
      <div className="max-w-7xl mx-auto w-full flex gap-2 flex-col md:flex-row ">
        <ItemImages images={item?.images.sort((a, b) => a.order - b.order)} />
        <div className="w-[90%] mx-auto md:w-[45%] flex flex-col pt-4 gap-4 ">
          <h2 className="text-5xl  ">{item.title}</h2>
          <p className="text-4xl font-thin py-2">
            ${parseInt(item.price).toLocaleString()}
          </p>
          <ItemInfo category={item.category} condition={item.condition} />
          <div>
            <SellerProfile seller={seller} />
          </div>
        </div>
      </div>
    </>
  );
}
