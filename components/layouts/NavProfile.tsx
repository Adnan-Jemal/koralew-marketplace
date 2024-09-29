import { MenuIcon, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { auth } from "@/auth";
import NavProfileDropdown from "./NavProfileDropdown";
import { Button } from "../ui/button";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export const NavProfile = async () => {
  const session = await auth();
  const user = session?.user;
  if(!user){
    return(
      <Link href={'/signin'}><Button>Sign In</Button></Link>
     
      
    )
    
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" cursor-pointer border-secondary border-2 hover:shadow-md transition-shadow rounded-2xl px-2 py-1.5 gap-3 flex items-center">
          <MenuIcon />
          {user ? (
            <Avatar>
              <AvatarImage src={user.image!!} />
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
