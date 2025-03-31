"use client";

import { scrollToSection } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroBtns = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 px-4">
      <Button
        onClick={() => scrollToSection("explore", 205)}
        size={"lg"}
        variant={"brand"}
        className="text-xl py-3 "
      >
        Explore
      </Button>
      <Button
        asChild
        size={"lg"}
        variant={"outline"}
        className="text-lg py-3 border-brand "
      >
        <Link href={"/create-listing"}>List an Item</Link>
      </Button>
    </div>
  );
};

export default HeroBtns;
