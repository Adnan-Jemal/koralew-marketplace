import React from "react";

import { PackagePlus, ArrowLeft } from "lucide-react";

import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SessionProvider } from "next-auth/react";

const AccountHeader = () => {
  return (
    <div className=" border-b-2 border-secondary sticky top-0 z-10 bg-background">
      <div className=" max-w-7xl select-none px-4 m-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <SessionProvider>
            <MobileSidebar />
          </SessionProvider>
          {/* <Breadcrumb>
        <BreadcrumbList className="text-md text-gray-500 dark:text-gray-400">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            Account
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}{" "}
          <Button
            asChild
            variant={"link"}
            className=" items-center py-6 text-lg "
          >
            <Link href={"/"}>
              <ArrowLeft className="mr-2 size-6" /> Home
            </Link>
          </Button>
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <div className=" py-4 mx-3">
            <Button
              asChild
              variant={"default"}
              className=" items-center py-6 text-lg   text-md border-none hidden sm:inline-flex"
            >
              <Link href={"/create-listing"}>
                <PackagePlus className="mr-2 size-6" /> List an Item
              </Link>
            </Button>

            <Button
              asChild
              variant={"default"}
              size={"icon"}
              className=" sm:hidden "
            >
              <Link href={"/create-listing"}>
                <PackagePlus className="  size-6" />
              </Link>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
