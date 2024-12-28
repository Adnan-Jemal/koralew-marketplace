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
      className="border-secondary border-2 rounded-xl w-40 "
      align="start"
    >
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link href={"/account/dashboard"}>Dashboard</Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild className="cursor-pointer">
        <Link href={"/account/messages"}>Messages </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className=" h-[2px]  " />

      <DropdownMenuItem asChild className="cursor-pointer">
        <Link href={"/create-listing"}>Sell an Item</Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className=" h-[2px]  " />
      <DropdownMenuItem
        onClick={() => signOut()}
        className="cursor-pointer text-red-400"
      >
        Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
