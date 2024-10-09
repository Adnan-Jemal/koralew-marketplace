import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
      <div className="flex items-center w-[60%] mx-auto gap-6 flex-wrap justify-center md:justify-start p-8 shadow-lg rounded-2xl dark:border dark:border-secondary  ">
        <Skeleton className="size-24 rounded-full" />

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="text-3xl flex items-center font-semibold gap-2 justify-center  md:justify-start truncate flex-wrap">
              <Skeleton className="h-6  w-64 mt-1" />
            </div>
          </div>
          <Skeleton className="h-6 rounded-2xl w-64 mt-1" />
        </div>
      </div>
      <div className=" w-full p-4 shadow-lg rounded-2xl dark:border dark:border-secondary grid grid-cols-1 gap-6 md:gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          <div>
            <Skeleton className="h-10" />
          </div>

          <div className="">
            <Skeleton className="h-10" />
          </div>
          <div>
            <Skeleton className="h-10" />
          </div>

          <div className="">
            <Skeleton className="h-10" />
          </div>
          <div>
            <Skeleton className="h-10" />
          </div>

          <div className="">
            <Skeleton className="h-10" />
          </div>
        </div>

        <div className="  flex items-center justify-center">
          <Skeleton className="h-10 w-[30%] mt-5" />
        </div>
      </div>
    </div>
  );
};

export default loading;
