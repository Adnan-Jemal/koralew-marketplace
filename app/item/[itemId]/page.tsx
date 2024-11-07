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
      <div className="max-w-7xl mx-auto w-full flex gap-2 flex-col md:flex-row mt-12 ">
        <ItemImages images={item?.images.sort((a, b) => a.order - b.order)} />
          <div className="w-[90%] md:w-[45%]  bg-black rounded-2xl"></div>
      </div>
    </>
  );
}
