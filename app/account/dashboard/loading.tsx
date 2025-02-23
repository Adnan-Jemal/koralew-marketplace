import React from "react";
// Replace this import with wherever your Skeleton component lives
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12 w-[80%] mx-auto animate-pulse">
      {/* Top Section: Greeting + Notification */}
      <div className="flex items-center justify-between gap-4 w-full flex-wrap-reverse mx-auto mt-24">
        {/* Greeting Card Skeleton */}
        <div className="bg-secondary p-6 sm:px-10 rounded-xl">
          <div className="flex gap-2 pr-2">
            <Skeleton className="w-16 h-8 rounded-md" />
            <Skeleton className="w-44 h-8 rounded-md" />
          </div>
          <Skeleton className="w-36 h-4 mt-4 rounded-md" />
        </div>
        {/* Notification Icon Skeleton */}
        <div className="bg-secondary p-4 rounded-xl">
          <Skeleton className="w-8 h-8 rounded-md" />
        </div>
      </div>

      <div className="flex justify-evenly flex-wrap mx-auto gap-10 mt-12 w-full">
        <Skeleton className="flex-1 h-52 min-w-40" />
        <Skeleton className="flex-1 h-52 min-w-40" />
        <Skeleton className="flex-1 h-52 min-w-40" />
      </div>
    </div>
  );
}
