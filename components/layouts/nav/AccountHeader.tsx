"use client";

import { PackagePlus, House } from "lucide-react";

import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SessionProvider } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const AccountHeader = () => {
  const path = usePathname();
  return (
    <div className=" border-b-2 border-secondary sticky top-0 z-10 bg-background">
      <div className=" max-w-7xl select-none px-4 m-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <SessionProvider>
            <MobileSidebar />
          </SessionProvider>
          <Breadcrumb>
            <BreadcrumbList className=" text-sm sm:text-lg text-gray-500 dark:text-gray-400">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex gap-1 items-center">
                  <House className="size-5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="hidden md:inline-block">
                Account
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:inline-block" />
              <BreadcrumbItem className="capitalize">
                {path.split("/").at(2)}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <Button
            asChild
            variant={"link"}
            className=" items-center py-6 text-lg "
          >
            <Link href={"/"}>
              <ArrowLeft className="mr-2 size-6" /> Home
            </Link>
          </Button> */}
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <div className=" py-4 mx-3">
            <Button
              asChild
              variant={"brand"}
              className=" items-center py-6 text-lg   text-md border-none hidden sm:inline-flex"
            >
              <Link href={"/create-listing"}>
                <PackagePlus className="mr-2 size-6" /> List an Item
              </Link>
            </Button>

            <Button
              asChild
              variant={"brand"}
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
