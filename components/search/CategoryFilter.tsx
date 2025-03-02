"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { categories } from "@/lib/categories";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useSearchParams } from "next/navigation";
import { conditionType } from "@/lib/types";

type propType = {
  updateURL: (category: string, condition: conditionType[]) => void;
};

const CategoryFilter = ({ updateURL }: propType) => {
  const params = useSearchParams();
  const condition: conditionType[] =
    (params.getAll("condition") as conditionType[]) ?? [];

  const handelValueChange = (value: string) => {
    updateURL(value ?? "all", condition);
  };
  return (
    <div className="h-1/2 w-full space-y-2">
      <h3 className="text-xl ">Category</h3>{" "}
      <ScrollArea
        type="auto"
        className="bg-secondary  rounded-2xl w-full h-full p-2 "
      >
        <RadioGroup
          onValueChange={(value) => handelValueChange(value)}
          value={params.get("category") ?? "all"}
          className="p-4"
        >
          {[{ name: "All", link: "all" }, ...categories].map((category) => (
            <label
              key={category.link}
              htmlFor={category.link}
              className="flex items-center space-x-3 p-4 rounded-lg bg-background cursor-pointer"
            >
              <RadioGroupItem
                value={category.link}
                id={category.link}
                className="z-10"
              />
              <p className="cursor-pointer text-sm">{category.name}</p>
            </label>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
