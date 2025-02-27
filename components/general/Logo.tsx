import Image from "next/image";
import Link from "next/link";
import React from "react";
import black_bg_logo from "@/public/black_bg_logo.png";
import white_bg_logo from "@/public/white_bg_logo.png";

const Logo = () => {
  return (
    <Link href={"/"}>
      {/* <h1 className="font-bold text-2xl  sm:text-3xl">ቆ Koralew</h1> */}
      <Image
        alt="Logo"
        src={black_bg_logo}
        className=" object-cover w-40 h-9 hidden dark:inline-flex "
      />
      <Image
        alt="Logo"
        src={white_bg_logo}
        className=" object-cover w-40 h-9 dark:hidden "
      />
    </Link>
  );
};

export default Logo;
