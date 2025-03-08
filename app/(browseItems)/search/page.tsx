import ItemCard from "@/components/ItemCard/ItemCard";
import { getSearchedItems } from "@/data/item";
import { conditionType } from "@/lib/types";
import { redirect } from "next/navigation";
import { PackageOpen } from "lucide-react";

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
  if (searchedItems.length == 0) {
    return (
      <div className="flex flex-col w-full h-[70vh] items-center justify-center text-center px-10">
        <PackageOpen className="size-36" />
        <h2 className="text-3xl font-bold">No results found</h2>
        <p>We could not find anything that matches your search.</p>
      </div>
    );
  }

  return (
    <div className=" w-full flex flex-wrap gap-x-4 gap-y-10 mt-12 justify-evenly">
      {searchedItems?.map((item) => (
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
      ))}
    </div>
  );
};

export default SearchPage;
