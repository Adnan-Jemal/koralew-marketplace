import React, { Suspense } from "react";
import CategoryFilter from "./CategoryFilter";

const FilterSideBar = () => {
  return (
    <div className="sticky top-0 w-72 h-[88vh] flex flex-col p-4">
      <Suspense>
        <CategoryFilter />
      </Suspense>
    </div>
  );
};

export default FilterSideBar;
