import Image from "next/image";
import React from "react";

type propType = {
  title: string;
  imageUrl: string;
  price: number;
  condition: string;
};

export default function ItemCard({
  title,
  imageUrl,
  price,
  condition,
}: propType) {
  return (
    <div className="flex flex-col bg-primary-foreground justify-between w-60 h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer ">
      <Image
        className=" h-56 w-full object-cover select-none "
        height={100}
        width={100}
        src={imageUrl}
        alt="Item Image"
      />
      <div className="p-3 flex flex-col justify-between gap-3">
        <h3 className="text-xl capitalize line-clamp-2">{title}</h3>
        <span className="h-[2px] w-[90%] bg-secondary self-center"></span>
        <div className="flex justify-around px-2 ">
          <p className="font-bold text-xl ">${price.toFixed()}</p>
          <span className="w-[2px] bg-secondary"></span>
          <span className="bg-black bg-opacity-80 dark:bg-opacity-75 dark:bg-white dark:text-black text-white px-3 text-[14px] text-center max-h-fit py-[2px] rounded-md capitalize ">
            {condition.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
