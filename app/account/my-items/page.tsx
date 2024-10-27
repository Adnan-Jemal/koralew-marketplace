import { getUserItems } from "@/actions/read";
import { auth } from "@/auth";
import ItemCard from "@/components/ItemCard/ItemCard";
import { SelectProduct, SelectProductImages, SelectUser } from "@/db/schema";
import { int } from "drizzle-orm/mysql-core";

import React from "react";

export default async function page() {
  const userItems = await getUserItems();

  return (
    <div className="p-10 gap-10 flex flex-col">
      <h1 className="text-4xl capitalize font-semibold">Your Listed Items</h1>
      <div className="flex flex-wrap gap-8 items-center justify-around ">
        {userItems?.map((item) => (
          <ItemCard
            title={item.product.title}
            imageUrl={item.product_images.imageUrl}
            price={parseFloat(item.product.price)}
            condition={item.product.condition}
          />
        ))}

        {/* <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price="10"
        condition="NEW"
      />
      <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price="200"
        condition="Refurbished"
      />
      <ItemCard
        title="rolex luxury men's watch and shoes for outdoors"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price="2000"
        condition="NEW"
      />
      <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price="600000"
        condition="Slightly Used"
      /> */}
      </div>
    </div>
  );
}
