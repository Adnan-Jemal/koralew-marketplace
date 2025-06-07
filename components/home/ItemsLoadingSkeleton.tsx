import React from "react";
import { Skeleton } from "../ui/skeleton";

const ItemsLoadingSkeleton = () => {
  return (
    <div className="flex flex-row w-full justify-between">
      <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
      <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
      <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
      <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
    </div>
  );
};

export default ItemsLoadingSkeleton;
