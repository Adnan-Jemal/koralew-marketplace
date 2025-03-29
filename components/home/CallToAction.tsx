import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="w-5/6 mx-auto bg-secondary rounded-xl p-6 lg:p-10 flex items-center justify-between gap-4 flex-wrap">
      {" "}
      <div className="space-y-2 lg:w-2/3">
        <h3 className="text-3xl font-semibold">Got Something to Sell?</h3>
        <p className="text-lg">
          Experience a hassle-free selling process—list your item in minutes,
          reach buyers instantly, and become a Koralew seller. It&apos;s free and
          easy!
        </p>
      </div>
      <Button asChild size={"lg"} variant={"brand"} className="text-lg">
        <Link href={'/create-listing'}>List Item</Link>
      </Button>
    </div>
  );
};

export default CallToAction;
