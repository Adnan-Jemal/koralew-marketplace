import ItemCard from "@/components/ItemCard/ItemCard";
import { getUserItems } from "@/data/item";
import { PackageOpen } from "lucide-react";

export default async function MyItemsPage() {
  const userItems = await getUserItems();

  return (
    <div className="p-10 gap-10  flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Your Listed Items
      </h1>
      {userItems.length < 1 && (
        <div className="flex flex-col w-full h-80 items-center justify-center text-center">
          <PackageOpen className="size-36" />
          <h2 className="text-3xl font-bold">No Items Found</h2>
          <p>List an item and it will be displayed here.</p>
        </div>
      )}
      <div className="flex flex-wrap gap-8 items-center justify-around ">
        {userItems?.map((item) => {
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
              itemStatus={item.status}
              itemViews={item.views || 0}
            />
          );
        })}
      </div>
    </div>
  );
}
