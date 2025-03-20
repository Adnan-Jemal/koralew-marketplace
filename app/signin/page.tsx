import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";
import black_bg_logo from "@/public/black_bg_logo.png";
import white_bg_logo from "@/public/white_bg_logo.png";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { redirect } from "next/navigation";

import React from "react";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <HeroHighlight className="h-screen w-full ">
      <div className="h-screen w-full flex items-center justify-center flex-col gap-6 text-center ">
        <Link href={"/"} className="p-2 rounded-lg bg-background h-fit mb-3  overflow-hidden">
          {/* <h1 className="font-bold text-2xl  sm:text-3xl">ቆ Koralew</h1> */}
          <Image
            alt="Logo"
            src={black_bg_logo}
            className=" object-cover w-80 h-20 hidden dark:inline-flex "
          />
          <Image
            alt="Logo"
            src={white_bg_logo}
            className=" object-cover  w-80 h-20 dark:hidden "
          />
        </Link>

        <h3 className="text-xl">Login / Sign up</h3>
        <SignInForm />
      </div>
    </HeroHighlight>
  );
}
