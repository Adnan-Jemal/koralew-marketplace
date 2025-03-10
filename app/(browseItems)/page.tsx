import ItemCard from "@/components/ItemCard/ItemCard";
import NavCategories from "@/components/layouts/nav/NavCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryItems } from "@/data/item";
import { Suspense } from "react";

type propType = {
  searchParams: Promise<{ category: string }>;
};
export default async function Home(props: propType) {
  const searchParams = await props.searchParams;
  // const capitalizedCategory =
  //   searchParams?.category?.charAt(0).toUpperCase() +
  //   searchParams.category?.slice(1);

  const categoryItems = await getCategoryItems(searchParams.category);

  return (
    <>
      <NavCategories />

      <div className="max-w-7xl mx-auto flex  flex-wrap gap-x-4 gap-y-10 mt-10 items-center justify-evenly ">
        {categoryItems?.map((item) => (
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
    </>
  );
}
