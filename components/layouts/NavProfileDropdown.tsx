"use client";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function NavProfileDropdown() {
  return (
    <DropdownMenuContent
      sideOffset={8}
      className="border-secondary border-2 rounded-xl w-40 "
      align="start"
    >
      <Link href={"/account/dashboard"}>
        <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
      </Link>

      <Link href={"/account/messages"}>
        <DropdownMenuItem className="cursor-pointer">Messages</DropdownMenuItem>
      </Link>

      <DropdownMenuSeparator className=" h-[2px]  " />
      <Link href={"/"}>
        <DropdownMenuItem className="cursor-pointer">
          Sell an Item
        </DropdownMenuItem>
      </Link>
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
