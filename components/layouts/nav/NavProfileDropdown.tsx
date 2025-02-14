"use client";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function NavProfileDropdown() {
  return (
    <DropdownMenuContent
      sideOffset={8}
      className="border-secondary border-2 rounded-xl w-44  "
      align="start"
    >
      <DropdownMenuItem asChild className="cursor-pointer text-md ">
        <Link href={"/account/dashboard"}>Account</Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild className="cursor-pointer text-md">
        <Link href={"/account/messages"}>Messages </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="cursor-pointer text-md">
        <Link href={"/account/favorites"}>Favorites </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className=" h-[2px]  " />

      <DropdownMenuItem asChild className="cursor-pointer text-md">
        <Link href={"/create-listing"}>Sell an Item</Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className=" h-[2px]  " />
      <DropdownMenuItem
        onClick={() => signOut()}
        className="cursor-pointer text-md text-red-400"
      >
        Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
