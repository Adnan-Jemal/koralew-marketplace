import FilterSideBar from "@/components/search/FilterSideBar";
import React, { Suspense } from "react";

const SearchPage = () => {
  return (
    <div className=" max-w-7xl mx-auto flex">
      <Suspense>
        <FilterSideBar />
      </Suspense>
    </div>
  );
};

export default SearchPage;
