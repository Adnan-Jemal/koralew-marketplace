import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonProfileForm = () => {
  return (
    <div className=" grid grid-cols-1 gap-6 md:gap-12">
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
      </div>

      <div className="  flex items-center justify-center">
        <Skeleton className="h-10 w-[30%] mt-5" />
      </div>
    </div>
  );
};

export default SkeletonProfileForm;
