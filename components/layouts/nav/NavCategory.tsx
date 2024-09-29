"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type propTypes = {
  categoryName: String;
  categoryLink: String;
  categoryIcon?: React.ReactNode;
};
export default function NavCategory({
  categoryName,
  categoryIcon,
  categoryLink,
}: propTypes) {
  //used to check if the current tap is selected
  const currentPath = useParams();
  console.log(currentPath.catName, categoryLink);
  const catLink = categoryLink.slice(1);

  if (currentPath.catName == catLink) {
    return (
      <div>
       
        <button
          className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 `}
        >
          {categoryIcon}
          <p className="text-[.85rem] font-medium mt-1">{categoryName}</p>
          <div
            className={`h-[2px] w-full bg-primary transition-colors ease-in rounded-full mt-2 `}
          ></div>
        </button>
      </div>
    );
  }

  return (
    <Link href={`/category${categoryLink}`}>
      <button
        className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 `}
      >
        {categoryIcon}
        <p className="text-[.85rem] font-medium mt-1">{categoryName}</p>
        <div
          className={`h-[2px] w-full  group-hover:bg-primary transition-colors ease-in rounded-full mt-2 `}
        ></div>
      </button>
    </Link>
  );
}
