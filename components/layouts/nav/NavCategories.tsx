import NavCategory from "./NavCategory";
import { categories } from "@/lib/categories";
import AllNavBtn from "./AllNavBtn";

export default function NavCategories() {
  return (
    <div className="max-w-7xl mx-auto flex items-center mt-4 gap-7 px-4 justify-evenly overflow-x-scroll md:scrollbar-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary ">
      <AllNavBtn />
      {categories.map((cat) => (
        <NavCategory
          key={cat.link}
          categoryLink={cat.link}
          categoryName={cat.name}
          categoryIcon={cat.icon}
        />
      ))}
    </div>
  );
}
