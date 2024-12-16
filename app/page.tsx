import { getCategoryItems } from "@/actions/read";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Navbar } from "@/components/layouts/nav/Navbar";
import NavCategories from "@/components/layouts/nav/NavCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type propType = {
  searchParams: { category: string };
};
export default async function Home({ searchParams }: propType) {
  const capitalizedCategory =
    searchParams?.category?.charAt(0).toUpperCase() +
    searchParams.category?.slice(1);
  const categoryItems = await getCategoryItems(capitalizedCategory);

  return (
    <>
      <Navbar />
      <NavCategories />

      <div className="max-w-7xl mx-auto flex  flex-wrap gap-8 mt-10 items-center justify-around ">
        {categoryItems?.map((item) => {
          
          return (
            <Suspense
            key={item.id}
              fallback={
                <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
              }
            >
              {" "}
              <ItemCard
                id={item.id}
                key={item.id}
                title={item.title}
                imageUrl={item.images.find(img=>img.order===1)?.imageUrl||item.images[0].imageUrl}
                price={parseFloat(item.price)}
                condition={item.condition}
              />
            </Suspense>
          );
        })}
      </div>
    </>
  );
}
