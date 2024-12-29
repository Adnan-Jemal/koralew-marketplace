import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="p-10 gap-10 flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Your Favorites
      </h1>
      <div className="flex flex-wrap gap-8 items-center justify-around ">
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
        <Skeleton className="bg-primary-foreground w-64 h-80 rounded-2xl shadow-md cursor-pointer" />
      </div>
    </div>
  );
}
