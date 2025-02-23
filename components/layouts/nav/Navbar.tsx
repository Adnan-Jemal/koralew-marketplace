import Link from "next/link";
import NotificationIcon from "@/components/notifications/NotificationIcon";
import { NavProfile } from "./NavProfile";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { auth } from "@/auth";
import { SearchBar } from "./SearchBar";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div
      className={` border-b-2 border-secondary sticky  top-0 z-10 bg-background`}
    >
      <div className=" max-w-7xl select-none px-4 m-auto py-3  flex items-center justify-between gap-2">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl  sm:text-3xl">ቆ Koralew</h1>
        </Link>

        <SearchBar />

        <div className="flex items-center md:gap-4 gap-2">
          {session && <NotificationIcon session={session} />}
          <NavProfile session={session} />
          <ModeToggle />
        </div>
      </div>
      <SearchBar smallScreen />
    </div>
  );
};
