import React from "react";
import { getTrendingItems } from "@/data/item";
import ItemCard from "../ItemCard/ItemCard";

const TrendingSection = async () => {
  const trendingItems = await getTrendingItems();

  return (
    <section id="explore">
      <h2 className="text-xl px-4  pb-6 md:text-2xl lg:text-3xl font-bold">
        Trending Items
      </h2>
      <div className="flex flex-wrap gap-x-4 gap-y-10 items-center justify-evenly ">
        {trendingItems.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={
              item.images.find((img) => img.order === 1)?.imageUrl ||
              item.images[0].imageUrl
            }
            price={parseFloat(item.price)}
            condition={item.condition}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
