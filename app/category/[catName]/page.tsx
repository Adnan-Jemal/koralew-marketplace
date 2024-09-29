import { Navbar } from "@/components/layouts/nav/Navbar";
import NavCategories from "@/components/layouts/nav/NavCategories";

type protTypes = {
  params: {
    catName: String;
  };
};

export default function CategoryPage({ params }: protTypes)  {
  return (
    <>
      <Navbar />
      <NavCategories />
      <div className="">
        <div className="flex items-center justify-center mt-6">
          <h1 className="mx-auto text-4xl">{params.catName.toLocaleUpperCase()}</h1>
        </div>
      </div>
    </>
  );
};

