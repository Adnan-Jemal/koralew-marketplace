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
  console.log(imageUrl)
  return (
    <div className="flex flex-col bg-primary-foreground justify-between w-64 h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer ">
      <div className="  h-[60%] select-none ">
        <Image src={imageUrl} loading="eager" height={500} width={500}  alt="Item Image" className=" h-full w-full object-cover" />
      </div>

      <div className="px-3 py-[10px] h-[40%] flex flex-col justify-around">
        <h4 className="text-xl capitalize line-clamp-2 pb-0 ">{title}</h4>
        <span className="h-[2px] p-0 m-0 w-[90%] bg-secondary self-center"/>
        <div className="flex justify-around  px-2  ">
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
