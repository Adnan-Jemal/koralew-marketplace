"use client";
import { Button } from "@/components/ui/button";
import {
  Heart,
  LayoutDashboard,
  MessagesSquare,
  Package,
  Settings,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction} from "react";

const menuItems = [
  {
    link: "/account/dashboard",
    icon: <LayoutDashboard className="mr-2 size-6" />,
    text: "Dashboard",
  },
  {
    link: "/account/profile",
    icon: <UserCog className="mr-2 size-6" />,
    text: "Profile",
  },
  {
    link: "/account/my-items",
    icon: <Package className="mr-2 size-6" />,
    text: "My Items",
  },
  {
    link: "/account/favorites",
    icon: <Heart className="mr-2 size-6" />,
    text: "Favorites",
  },
  {
    link: "/account/messages",
    icon: <MessagesSquare className="mr-2 size-6" />,
    text: "Messages",
  },
  {
    link: "/account/settings",
    icon: <Settings className="mr-2 size-6" />,
    text: "Settings",
  },
];

type PropType = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const SidebarMenuItems = ({ setOpen }: PropType) => {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          asChild
          onClick={() => {
            if (setOpen) setOpen(false);
          }}
          variant={"outline"}
          size={"lg"}
          className={`flex items-center justify-start w-full text-md border-none transition-colors select-none ${
            pathname === item.link && "bg-secondary"
          }`}
        >
          <Link href={item.link}>
            {item.icon} {item.text}
          </Link>
        </Button>
      ))}
    </>
  );
};

export default SidebarMenuItems;
