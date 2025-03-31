"use client";

import { scrollToSection } from "@/lib/utils";
import { Button } from "../ui/button";

const ExploreBtn = () => {
  return (
    <Button
      onClick={() => scrollToSection("explore", 205)}
      size={"lg"}
      variant={"brand"}
      className="text-xl py-3 "
    >
      Explore
    </Button>
  );
};

export default ExploreBtn;
