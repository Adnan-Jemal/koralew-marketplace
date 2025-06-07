"use client";
import NavCategory from "./NavCategory";
import { categories } from "@/lib/categories";
import AllNavBtn from "./AllNavBtn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function NavCategories() {
  const divRef = useRef<HTMLDivElement>(null);
  const [leftBtnHidden, setLeftBtnHidden] = useState(true);
  const [rightBtnHidden, setRightBtnHidden] = useState(true);
  const [scrollBy, setScrollBy] = useState(250);

  useEffect(() => {
    checkScrollButtons();
    if (divRef.current) {
      if (divRef.current.clientWidth < 400) {
        setScrollBy(150);
      } else {
        setScrollBy(250);
      }
    }
  }, [divRef.current?.clientWidth]);

  const checkScrollButtons = () => {
    if (!divRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = divRef.current;
    const isAtStart = scrollLeft === 0;
    const isAtEnd = Math.round(scrollLeft) + clientWidth >= scrollWidth;

    setLeftBtnHidden(isAtStart);
    setRightBtnHidden(isAtEnd);
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
    <div
      
      className="sticky top-[134px] sm:top-[82px] bg-white dark:bg-black max-w-7xl z-50 
    mx-auto rounded-xl  "
    >
      <div
      data-cy="nav-categories"
        ref={divRef}
        className="  flex items-center pt-4  px-16 gap-8  justify-evenly  overflow-x-hidden rounded-full "
      >
        <AllNavBtn />
        {categories.map((cat) => (
          <NavCategory
            key={cat.name}
            categoryName={cat.name}
            categoryIcon={cat.icon}
          />
        ))}
        <div
          className={cn(
            "absolute right-0  backdrop-blur-md rounded-xl p-1 ",
            rightBtnHidden && "hidden"
          )}
        >
          <Button
            variant={"default"}
            className="shadow-2xl m-2"
            size={"icon"}
            onClick={handleRightScroll}
          >
            <ArrowRight />
          </Button>
        </div>
        <div
          className={cn(
            "absolute left-0  backdrop-blur-md rounded-xl p-1 ",
            leftBtnHidden && "hidden"
          )}
        >
          <Button
            variant={"default"}
            className="shadow-2xl m-2"
            size={"icon"}
            onClick={handleLeftScroll}
          >
            <ArrowLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}
