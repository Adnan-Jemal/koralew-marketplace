"use client";
import React from "react";
import CategoryFilter from "./CategoryFilter";
import ConditionFilter from "./ConditionFilter";
import { conditionType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSideBar = () => {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";

  const updateURL = (category: string, condition: conditionType[]) => {
    const categoryExists = category != "All" && !!category;
    const conditionExists = condition.length > 0;

    if (categoryExists && conditionExists) {
      router.push(
        `/search/?q=${query}&category=${category}&condition=${condition}`
      );
    } else if (!categoryExists && conditionExists) {
      router.push(`/search/?q=${query}&condition=${condition}`);
    } else if (categoryExists && !conditionExists) {
      router.push(`/search/?q=${query}&category=${category}`);
    } else {
      router.push(`/search/?q=${query}`);
    }
  };

  return (
    <div className="sticky top-[82px] w-96 h-[88vh] sm:flex flex-col p-4 gap-16  hidden ">
      <CategoryFilter updateURL={updateURL} />
      <ConditionFilter updateURL={updateURL} />
    </div>
  );
};

export default FilterSideBar;
