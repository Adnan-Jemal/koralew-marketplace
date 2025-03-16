import FilterSideBar from "@/components/search/FilterSideBar";
import FilterSidebarSkeleton from "@/components/search/FilterSidebarSkeleton";
import React, { Suspense } from "react";

const searchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" max-w-7xl  mx-auto flex  justify-between w-full flex-1">
      <Suspense fallback={<FilterSidebarSkeleton />}>
        <FilterSideBar />
      </Suspense>

      {children}
    </div>
  );
};

export default searchLayout;
