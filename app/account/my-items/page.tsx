import { getUserItems } from "@/actions/read";

import ItemCard from "@/components/ItemCard/ItemCard";
import {  PackageOpen } from "lucide-react";

import React from "react";

export default async function MyItemsPage() {
  const userItems = await getUserItems();

  if (!userItems) {
    return <div>No Items Found</div>;
  }

  return (
    <div className="p-10 gap-10  flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Your Listed Items
      </h1>
      {userItems.length < 1 && (
        <div className="flex flex-col w-full h-80 items-center justify-center">
          <PackageOpen className="size-36" />
          <h2 className="text-3xl font-bold">No Items Found</h2>
          <p>List an item and it will be displayed here.</p>
        </div>
      )}
      <div className="flex flex-wrap gap-8 items-center justify-around ">
        {userItems?.map((item) => {
          const image = item.images as string[];
          return (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={image[0]}
              price={parseFloat(item.price)}
              condition={item.condition}
            />
          );
        })}
  
      </div>
    </div>
  );
}
