"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type propTypes = {
  categoryName: string;
  categoryLink: string;
  categoryIcon?: React.ReactNode;
};
export default function NavCategory({
  categoryName,
  categoryIcon,
  categoryLink,
}: propTypes) {
  // used to check if the current tap is selected
  const currentPath = usePathname();
  const route = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handelClick = () => {
    params.set("category", categoryLink);
    route.push(`${currentPath}?${params}`);
  };

  if (params.get("category") == categoryLink) {
    return (
      <button
        className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 mx-1 `}
      >
        {categoryIcon}
        <p className=" text-sm mt-1 w-full text-nowrap">{categoryName}</p>
        <div
          className={`h-[2px] w-full bg-primary transition-colors ease-in rounded-full mt-2 `}
        ></div>
      </button>
    );
  }

  return (
    <button
      onClick={handelClick}
      className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 mx-1 `}
    >
      {categoryIcon}
      <p className=" text-sm mt-1 w-full text-nowrap">{categoryName}</p>
      <div
        className={`h-[2px] w-full  group-hover:bg-primary transition-colors ease-in rounded-full mt-2 `}
      ></div>
    </button>
  );
}
