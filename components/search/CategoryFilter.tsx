"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { categories } from "@/lib/categories";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";

  const handelValueChange = (value: string) => {
    const url =
      value != "all"
        ? `/search/?q=${query}&category=${value}`
        : `/search/?q=${query}`;
    router.push(url);
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
              <Label className="cursor-pointer" htmlFor={category.link}>
                {category.name}
              </Label>
            </label>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
