import { getSearchedItems } from "@/data/item";
import { conditionType } from "@/lib/types";
import { redirect } from "next/navigation";
import { PackageOpen } from "lucide-react";
import InfiniteItemList from "@/components/general/InfiniteItemList";

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
  const category = sParams.category;
  const searchedItems = await getSearchedItems(
    sParams.q,
    category,
    conditions as conditionType[] | undefined
  );
  if (searchedItems.length == 0) {
    return (
      <div className="flex flex-col w-full h-[70vh] items-center justify-center text-center ">
        <PackageOpen className="size-36" />
        <h2 className="text-3xl font-bold px-10">No results found</h2>
        <p>We could not find anything that matches your search.</p>
      </div>
    );
  }

  return (
    <div className=" w-full mt-12">
      <InfiniteItemList
        initialItems={searchedItems}
        url={`/api/item/search-items?query=${sParams.q}${
          category ? "&category=" + category : ""
        }${conditions ? "&conditions=" + conditions : ""}`}
      />
    </div>
  );
};

export default SearchPage;
