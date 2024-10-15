import React from "react";

import { PackagePlus, ArrowLeft, HomeIcon } from "lucide-react";

import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import SidebarProfile from "./SidebarProfile";
import { SessionProvider } from "next-auth/react";

const AccountHeader = () => {
  return (
    <div className=" border-b-2 border-secondary sticky top-0 z-10 bg-background">
      <div className=" max-w-7xl select-none px-4 m-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <SessionProvider>
            <MobileSidebar />
          </SessionProvider>

          <Link href={"/"}>
            {" "}
            <Button
              variant={"link"}
              className=" items-center py-6 text-lg "
            >
              <ArrowLeft className="mr-2 size-6" /> Home
            </Button>
          </Link>
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <div className=" py-4 mx-3">
            <Link href={"/create-listing"}>
              <Button
                variant={"default"}
                className=" items-center py-6 text-lg   text-md border-none hidden sm:inline-flex"
              >
                <PackagePlus className="mr-2 size-6" /> List an Item
              </Button>
            </Link>
            <Link href={"/create-listing"}>
              <Button variant={"default"} size={"icon"} className=" sm:hidden ">
                <PackagePlus className="  size-6" />
              </Button>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
