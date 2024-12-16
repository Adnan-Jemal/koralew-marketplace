"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu} from "lucide-react";

import { useState } from "react";
import SidebarMenus from "./SidebarMenuItems";
import SidebarProfile from "./SidebarProfile";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className=" border-none mt-1  ">
          <Button variant={"ghost"} size={"icon"} className="">
            <Menu className="size-8" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col border-secondary">
          <div className="grow flex flex-col px-4 mt-6 gap-4">
            <SidebarMenus setOpen={setOpen} />
          </div>
          <SidebarProfile />
        </SheetContent>
      </Sheet>
    </div>
  );
}
