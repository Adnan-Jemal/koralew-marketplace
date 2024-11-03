import { getItem, getItemSeller } from "@/actions/read";
import { Navbar } from "@/components/layouts/nav/Navbar";
import React from "react";

export default async function page({ params }: { params: { itemId: string } }) {
  const item = await getItem(Number(params.itemId));
  const seller = await getItemSeller(item[0].product.userId);

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col">
        <h2>{JSON.stringify(item)}</h2>
        <div>----------------------------------------------</div>
        <h2>{JSON.stringify(seller)}</h2>;
      </div>
    </>
  );
}
