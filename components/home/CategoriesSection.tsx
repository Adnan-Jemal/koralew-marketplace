"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import electronicImg from "@/public/categoryImgs/Electronics.jpg";
import fashionImg from "@/public/categoryImgs/Fashion.jpg";
import beautyImg from "@/public/categoryImgs/BeautyProducts.jpg";
import homeImg from "@/public/categoryImgs/Home.jpg";
import automotiveImg from "@/public/categoryImgs/Engine.jpg";
import Link from "next/link";

const TopCategories = [
  {
    name: "Electronics",
    img: electronicImg,
    link: "/?category=Electronics",
    subcategories: "Laptops, Smartphones, Headphones, Cameras, Gaming Consoles",
  },
  {
    name: "Beauty",
    img: beautyImg,
    link: "/?category=Beauty",
    subcategories: "Skincare, Makeup, Haircare, Fragrances, Bath & Body",
  },
  {
    name: "Automotive",
    img: automotiveImg,
    link: "/?category=Automotive",
    subcategories:
      "Car Accessories, Tools & Equipment, Car Care, Motorcycle Accessories",
  },
  {
    name: "Fashion",
    img: fashionImg,
    link: "/?category=Fashion",
    subcategories: "Clothing, Footwear, Accessories, Bags, Jewelry",
  },
  {
    name: "Home",
    img: homeImg,
    link: "/?category=Home",
    subcategories: "Furniture, Decor, Kitchenware, Gardening, Bedding",
  },
];
const CategoriesSection = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [leftBtnDisabled, setLeftBtnDisabled] = useState(true);
  const [rightBtnDisabled, setRightBtnDisabled] = useState(false);
  const [scrollBy] = useState(350);

  useEffect(() => {
    checkScrollButtons();
  }, []);
  //calculate to disable and enable btns accordingly
  const checkScrollButtons = () => {
    if (!divRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = divRef.current;
    const isAtStart = scrollLeft === 0;
    const isAtEnd = Math.round(scrollLeft) + clientWidth >= scrollWidth;

    setLeftBtnDisabled(isAtStart);
    setRightBtnDisabled(isAtEnd);
  };

  const handleRightScroll = () => {
    divRef.current?.scrollBy({ left: scrollBy, behavior: "smooth" });
    //  time for the scroll to update before checking again
    setTimeout(checkScrollButtons, 300);
  };

  const handleLeftScroll = () => {
    divRef.current?.scrollBy({ left: -scrollBy, behavior: "smooth" });
    //  time for the scroll to update before checking again
    setTimeout(checkScrollButtons, 300);
  };
  return (
    <section  >
      <h2 className="text-xl px-4  pb-6 md:text-2xl lg:text-3xl font-bold">
        Top Categories
      </h2>
      <div
        ref={divRef}
        className="flex items-center  gap-8 justify-evenly  overflow-x-hidden "
      >
        {TopCategories.map((cat, index) => (
          <Link key={index} href={cat.link}>
            <div data-cy="home-categories" className="relative min-w-80 h-96 bg-gradient-to-t text-white from-black/80 to-transparent rounded-2xl overflow-clip flex items-end ">
              <Image
                alt={`${cat.name}category Image`}
                src={cat.img}
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{cat.name}</h3>
                <p>{cat.subcategories}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className=" w-full flex items-center justify-end mt-2">
        <Button
          disabled={leftBtnDisabled}
          variant={"default"}
          className="shadow-2xl m-2"
          size={"icon"}
          onClick={handleLeftScroll}
        >
          <ArrowLeft />
        </Button>
        <Button
          disabled={rightBtnDisabled}
          variant={"default"}
          className="shadow-2xl m-2"
          size={"icon"}
          onClick={handleRightScroll}
        >
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default CategoriesSection;
