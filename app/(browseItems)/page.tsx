import InfiniteItemList from "@/components/general/InfiniteItemList";
import NavCategories from "@/components/layouts/nav/NavCategories";
import { getCategoryItems } from "@/data/item";

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
    <>
      <NavCategories />
      <div className="max-w-7xl mx-auto  mt-10 ">
        {searchParams.category ? (
          <InfiniteItemList
            initialItems={categoryItems}
            url={`api/item/category-items?category=${searchParams.category}`}
          />
        ) : (
          <h2>Home</h2>
        )}
      </div>
    </>
  );
}
