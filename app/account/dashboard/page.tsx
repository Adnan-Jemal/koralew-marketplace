import { auth } from "@/auth";
import StatCard from "@/components/dashboard/StatCard";
import NotificationIcon from "@/components/notifications/NotificationIcon";
import { getTotalNumOfFavoritedItems } from "@/data/favorite";
import { getTotalItemsViews, getTotalNumOfListedItems } from "@/data/item";
import { Eye, Heart, Package } from "lucide-react";
import React from "react";

export default async function DashboardPage() {
  const session = await auth();
  const userFirstName = session?.user?.name?.split(" ")[0];
  const numOfListedItems = await getTotalNumOfListedItems(session);
  const numOfFavorites = await getTotalNumOfFavoritedItems(session);
  const totalViews = await getTotalItemsViews(session);

  return (
    <div className="flex flex-col gap-12 w-[80%] mx-auto">
      <div className="flex items-center justify-between gap-4 w-full flex-wrap-reverse    mx-auto mt-24">
        <div className="bg-secondary p-6 sm:px-10 rounded-xl ">
          <span className="flex gap-2 pr-2">
            <h2 className="text-5xl font-bold">👋🏽 </h2>
            <h2 className="text-[42px] font-bold">Hello {userFirstName}!</h2>
          </span>

          <p className="md:text-end">Here is how you are doing on Koralew</p>
        </div>
        <div className=" bg-secondary p-4 rounded-xl end">
          <NotificationIcon session={session} />
        </div>
      </div>
      <div className="flex justify-evenly flex-wrap mx-auto gap-10 mt-12 w-full">
        <StatCard
          title="Items Listed"
          number={numOfListedItems}
          btnTxt="List an Item"
          btnLink={"/create-listing"}
          icon={Package}
        />
        <StatCard
          title="Total Views"
          number={totalViews}
          btnTxt="View Items"
          btnLink={"/account/my-items"}
          icon={Eye}
        />
        <StatCard
          title="Favorites"
          number={numOfFavorites}
          btnTxt="View Favorites"
          btnLink={"/account/favorites"}
          icon={Heart}
        />
      </div>
    </div>
  );
}
