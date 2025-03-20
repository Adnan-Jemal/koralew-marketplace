import InfiniteItemList from "@/components/general/InfiniteItemList";
import CategoriesSection from "@/components/home/CategoriesSection";
import { HeroSection } from "@/components/home/HeroSection";
import NavCategories from "@/components/layouts/nav/NavCategories";
import { Button } from "@/components/ui/button";
import { getCategoryItems } from "@/data/item";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

type propType = {
  searchParams: Promise<{ category: string }>;
};
export default async function Home(props: propType) {
  const searchParams = await props.searchParams;
  // const capitalizedCategory =
  //   searchParams?.category?.charAt(0).toUpperCase() +
  //   searchParams.category?.slice(1);

  const categoryItems = searchParams.category
    ? await getCategoryItems(searchParams.category)
    : [];

  return (
    <div className="flex-1">
      <NavCategories />
      <div className="max-w-7xl mx-auto  mt-10 px-3 ">
        {categoryItems.length == 0 && searchParams.category ? (
          <div className="flex flex-col w-full mt-20 items-center justify-center text-center gap-4 px-10">
            <PackageOpen className="size-36" />
            <h2 className="text-3xl font-bold ">Nothing Here Yet!</h2>
            <p>
              It looks like this category is empty at the moment.{" "}
              <br className="hidden sm:inline-block" />
              Check back soon or be the first to add an item!
            </p>
            <Button asChild variant={"secondary"}>
              <Link href={"/create-listing"}>Add Your Listing</Link>
            </Button>
          </div>
        ) : searchParams.category && categoryItems.length > 0 ? (
          <InfiniteItemList
            initialItems={categoryItems}
            url={`api/item/category-items?category=${searchParams.category}`}
          />
        ) : (
          <div className="w-full">
            <div className="border-2 rounded-xl overflow-hidden">
              <HeroSection />
            </div>
            <CategoriesSection />
          </div>
        )}
      </div>
    </div>
  );
}
