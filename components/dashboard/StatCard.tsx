import React from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type propType = {
  title: string;
  number: number;
  btnTxt: string;
  btnLink: string;
  icon: LucideIcon;
};

const StatCard = ({ title, number, btnTxt, btnLink, icon: Icon }: propType) => {
  return (
    <div className="bg-secondary p-6 rounded-xl flex flex-col gap-2 flex-1 ">
      <span className="flex flex-wrap items-center justify-between px-2">
        <p className="text-5xl font-bold">{number}</p>
        <Icon className="size-14" />
      </span>

      <p className="text-2xl">{title}</p>
      <Link href={btnLink}>
        <Button
          className="w-full text-md mt-4 hover:border-primary hover:border"
          variant={"outline"}
          size={"lg"}
        >
          {btnTxt}
        </Button>
      </Link>
    </div>
  );
};

export default StatCard;
