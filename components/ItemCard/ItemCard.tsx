import { ItemStatusType } from "@/lib/types";
import clsx from "clsx";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type propType = {
  title: string;
  imageUrl: string;
  price: number;
  condition: string;
  itemStatus?: ItemStatusType;
  id: number;
  itemViews?: number;
};

export default function ItemCard({
  title,
  imageUrl,
  price,
  condition,
  id,
  itemStatus,
  itemViews,
}: propType) {
  return (
    <Link href={`/item/${id}`}>
      <div className="flex flex-col bg-primary-foreground justify-between  w-72 h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer relative ">
        <div className="  h-[60%] select-none ">
          <Image
            src={imageUrl}
            loading="eager"
            height={500}
            width={500}
            alt="Item Image"
            className=" h-full w-full object-cover"
          />
        </div>

        <div className="px-3 py-[10px] h-[40%] flex flex-col justify-around">
          <h4 className="text-xl capitalize line-clamp-2 pb-0 ">{title}</h4>
          <span className="h-[2px] p-0 m-0 w-[90%] bg-secondary self-center" />
          <div className="flex justify-around  px-2  ">
            <p className="font-bold text-xl ">{price.toFixed() + " "}ብር</p>
            <span className="w-[2px] bg-secondary"></span>
            <span className="bg-black bg-opacity-80 dark:bg-opacity-75 dark:bg-white dark:text-black text-white px-3 text-[14px] text-center max-h-fit py-[2px] rounded-md capitalize ">
              {condition.toLowerCase()}
            </span>
          </div>
        </div>
        {itemStatus && (
          <div
            className={clsx(
              "absolute py-1 px-2 top-0 right-0 text-white rounded-r-none rounded-l-md rounded-t-none",
              {
                "bg-green-500": itemStatus === "Active",
                "bg-gray-500": itemStatus === "Sold",
                "bg-yellow-500 ": itemStatus === "Under Review",
                "bg-red-500": itemStatus === "Rejected",
              }
            )}
          >
            {itemStatus}
          </div>
        )}

        {itemViews != undefined && (
          <div className="absolute py-1 px-2 top-0 left-0 text-white rounded-l-none rounded-r-md rounded-t-none bg-brand flex gap-2 items-center justify-center">
            <Eye />
            {itemViews}
          </div>
        )}
      </div>
    </Link>
  );
}
