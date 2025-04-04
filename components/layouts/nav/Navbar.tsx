import NotificationIcon from "@/components/notifications/NotificationIcon";
import { NavProfile } from "./NavProfile";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { auth } from "@/auth";
import { SearchBar } from "../../search/SearchBar";
import Logo from "@/components/general/Logo";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div
      className={` border-b-2 border-secondary sticky  top-0 z-50 sm:min-h-[82px] min-h-[134px] bg-background`}
    >
      <div className=" max-w-7xl select-none px-4 mx-auto mb-0 py-3  flex items-center justify-between gap-2">
        <Logo />
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
