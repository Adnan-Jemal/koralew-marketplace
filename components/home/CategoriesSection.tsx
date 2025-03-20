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
  { name: "Electronics", img: electronicImg, link: "/?category=Electronics" },
  { name: "Beauty", img: beautyImg, link: "/?category=Beauty" },
  { name: "Automotive", img: automotiveImg, link: "/?category=Automotive" },
  { name: "Fashion", img: fashionImg, link: "/?category=Fashion" },
  { name: "Home", img: homeImg, link: "/?category=Home" },
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
    <section id='explore' className="scroll-pt-80">
      <h2 className="text-xl px-4 pt-10 pb-6 md:text-2xl lg:text-3xl font-bold">
        Top Categories
      </h2>
      <div
        ref={divRef}
        className="flex items-center  gap-8 justify-evenly  overflow-x-hidden "
      >
        {TopCategories.map((cat, index) => (
          <Link key={index} href={cat.link}>
            <div className="relative min-w-80 h-96 bg-gradient-to-t text-white from-black/75 to-transparent rounded-2xl overflow-clip flex items-end ">
              <Image
                alt={`${cat.name}category Image`}
                src={cat.img}
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="p-4">
                <p className="text-2xl font-semibold">{cat.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className=" w-full flex items-center justify-end">
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
