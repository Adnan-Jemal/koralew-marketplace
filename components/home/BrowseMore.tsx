import { categories } from "@/lib/categories";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const topCategories = [
  "Beauty",
  "Home",
  "Automotive",
  "Fashion",
  "Electronics",
  "Sports",
];

const filteredCategories = categories
  .filter((c) => topCategories.includes(c.name))
  .sort(() => Math.random() - 0.5);

const BrowseMore = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <p>Browse More by Category</p>
      <div className="flex-wrap flex gap-4 items-center justify-center">
        {filteredCategories.map((c) => (
          <Button asChild variant={"outline"} key={c.displayName}>
            <Link href={`?category=${c.name}`}>{c.displayName}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BrowseMore;
