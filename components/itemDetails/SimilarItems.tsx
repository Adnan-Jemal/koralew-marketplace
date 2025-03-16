import React, { Suspense } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { Skeleton } from "../ui/skeleton";
import { getSimilarCategoryItems } from "@/data/item";

export const SimilarItems = async ({
  category,
  itemId,
}: {
  category: string;
  itemId: number;
}) => {
  const SimilarCategoryItems = await getSimilarCategoryItems(category, itemId);
  if (SimilarCategoryItems.length == 0) {
    return <div className="py-14"></div>;
  }
  return (
    <div className=" mx-auto mt-20 px-8 ">
      <h3 className="text-3xl font-semibold mb-10">Similar Items</h3>
      <div className=" flex  flex-wrap gap-x-4 gap-y-10  items-center justify-center sm:justify-normal  ">
        {SimilarCategoryItems?.map((item) => {
          return (
            <Suspense
              key={item.id}
              fallback={
                <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
              }
            >
              <ItemCard
                id={item.id}
                key={item.id}
                title={item.title}
                imageUrl={
                  item.images.find((img) => img.order === 1)?.imageUrl ||
                  item.images[0].imageUrl
                }
                price={parseFloat(item.price)}
                condition={item.condition}
              />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};
