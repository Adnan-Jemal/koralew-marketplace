import { getFavoriteItems } from "@/actions/read";
import ItemCard from "@/components/ItemCard/ItemCard";
import { HeartCrack } from "lucide-react";
import React from "react";

export default async function favoritesPage() {
  const favoriteItems = await getFavoriteItems();

  if (!favoriteItems) {
    return <div>No Items Found</div>;
  }

  return (
    <div className="p-10 gap-10  flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Your Favorites
      </h1>
      {favoriteItems.length < 1 && (
        <div className="flex flex-col w-full h-80 items-center justify-center text-center">
          <HeartCrack className="size-36" />
          <h2 className="text-3xl font-bold">No Items Found</h2>
          <p>Add an item to favorites and it will be displayed here.</p>
        </div>
      )}
      <div className="flex flex-wrap gap-8 items-center justify-around ">
        {favoriteItems?.map((item) => {
          const image =
            item.images.find((img) => img.order == 1)?.imageUrl ||
            item.images[0].imageUrl;
          return (
            <ItemCard
              id={item.id}
              key={item.id}
              title={item.title}
              imageUrl={image}
              price={parseFloat(item.price)}
              condition={item.condition}
            />
          );
        })}
      </div>
    </div>
  );
}
