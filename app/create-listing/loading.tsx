import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="relative">
        <div className="sm:max-w-[65%] w-[80%] mx-auto flex flex-col gap-14 my-16">
          <h1 className="text-center text-4xl font-bold">Create a Listing</h1>
          <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary mt-3 flex flex-col gap-4">
            <h2 className="text-xl ml-1 ">ITEM IMAGES</h2>
            <Skeleton className="h-40 rounded-xl bg-secondary flex items-center justify-center"></Skeleton>
          </div>
          <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary flex flex-col gap-4">
            <h2 className="text-xl my-4 ml-1 uppercase ">Item Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" /> {/* Title Input */}
              <Skeleton className="h-10 w-full" /> {/* Category Input */}
              <Skeleton className="h-10 w-full" /> {/* Description */}
              <Skeleton className="h-10 w-full" /> {/* Price */}
              <Skeleton className="h-10 w-full" /> {/* Condition */}
              <Skeleton className="h-10 w-full" /> {/* Condition */}
            </div>
            <div className="flex items-center justify-center mt-4">
              <Skeleton className="h-10 w-40" /> {/* List Item Button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
