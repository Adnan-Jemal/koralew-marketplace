import { LucideSquareStack } from "lucide-react";
import NavCategory from "./NavCategory";
import { categories } from "@/lib/categories";

export default function NavCategories() {
  const navCategories = [
    {
      name: "All",
      link: "",
      icon: <LucideSquareStack />,
    },
    ...categories,
  ];
  return (
    <div className="max-w-7xl mx-auto flex items-center mt-4 gap-7 px-4 justify-evenly overflow-x-scroll md:scrollbar-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary ">
      {navCategories.map((cat) => (
        <NavCategory
          categoryLink={cat.link}
          categoryName={cat.name}
          categoryIcon={cat.icon}
        />
      ))}
    </div>
  );
}
