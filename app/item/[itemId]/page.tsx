import { getItem, getItemSeller } from "@/actions/read";
import ItemImages from "@/components/itemDetails/ItemImages";

import { Navbar } from "@/components/layouts/nav/Navbar";
import React from "react";

export default async function page({ params }: { params: { itemId: string } }) {
  const item = await getItem(Number(params.itemId));
  const seller = await getItemSeller(item.userId);
  
  
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto    w-full flex mt-12 ">

      <ItemImages images={item?.images}/>
      </div>
    </>
  );
}
