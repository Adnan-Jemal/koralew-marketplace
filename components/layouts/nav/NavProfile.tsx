"use client";
import { MenuIcon, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import NavProfileDropdown from "./NavProfileDropdown";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const NavProfile = () => {
  const session = useSession().data;
  const user = session?.user;
  if (!user) {
    return (
      <Button asChild>
        <Link href={"/signin"}>Sign In </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" cursor-pointer border-secondary border-2 hover:shadow-md transition-shadow rounded-2xl px-2 py-1.5 gap-3 flex items-center">
          <MenuIcon />
          {user ? (
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={user.image || undefined}
              />
              <AvatarFallback className="text-xl">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User2 className="bg-secondary rounded-full p-2 h-[40px] w-[40px]" />
          )}
        </div>
      </DropdownMenuTrigger>
      <NavProfileDropdown />

      {/* {user ? <NavProfileDropdown/>:redirect('/signin')} */}
    </DropdownMenu>
  );
};
