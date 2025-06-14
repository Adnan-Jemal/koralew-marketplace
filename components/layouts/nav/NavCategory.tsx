"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type propTypes = {
  categoryName: string;
  categoryIcon?: React.ReactNode;
};
export default function NavCategory({ categoryName, categoryIcon }: propTypes) {
  // used to check if the current tap is selected
  const currentPath = usePathname();
  const route = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handelClick = () => {
    params.set("category", categoryName);
    route.push(`${currentPath}?${params}`);
  };

  if (params.get("category") == categoryName) {
    return (
      <span
        data-cy="nav-category"
        className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 mx-1`}
      >
        {categoryIcon}
        <p className=" text-sm mt-1 w-full text-nowrap">{categoryName}</p>
        <div
          className={`h-[2px] w-full bg-primary transition-colors ease-in rounded-full mt-2 `}
        ></div>
      </span>
    );
  }

  return (
    <span
      onClick={handelClick}
      className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 mx-1 `}
    >
      {categoryIcon}
      <p className=" text-sm mt-1 w-full text-nowrap">{categoryName}</p>
      <div
        className={`h-[2px] w-full  group-hover:bg-brand transition-colors ease-in rounded-full mt-2 `}
      ></div>
    </span>
  );
}
