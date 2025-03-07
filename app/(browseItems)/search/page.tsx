import ItemCard from "@/components/ItemCard/ItemCard";
import FilterSideBar from "@/components/search/FilterSideBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getSearchedItems } from "@/data/item";
import { conditionType } from "@/lib/types";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type searchPropType = {
  searchParams: Promise<{
    q: string;
    category?: string;
    condition?: conditionType;
  }>;
};

const SearchPage = async ({ searchParams }: searchPropType) => {
  const sParams = await searchParams;
  if (!sParams.q) {
    return redirect("/");
  }
  const conditions = sParams.condition?.split(",");
  const searchedItems = await getSearchedItems(
    sParams.q,
    sParams.category,
    conditions as conditionType[] | undefined
  );

  return (
    <div className=" max-w-7xl  mx-auto flex  justify-between">
      <Suspense>
        <FilterSideBar />
      </Suspense>

      <div className=" w-full flex flex-wrap gap-x-4 gap-y-10 mt-12 justify-evenly">
        {searchedItems?.map((item) => (
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
                item.images.find((img) => img.order == 1)?.imageUrl ||
                item.images[0].imageUrl
              }
              price={parseFloat(item.price)}
              condition={item.condition}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
