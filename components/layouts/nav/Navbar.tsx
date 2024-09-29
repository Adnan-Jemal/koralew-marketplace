import Link from "next/link";
import { Search } from "lucide-react";
import { ModeToggle } from "../../ui/ModeToggle";
import { NavProfile } from "./NavProfile";

export const Navbar = () => {
  return (
    <div
      className={` border-b-2 border-secondary sticky  top-0 z-10 bg-background`}
    >
      <div className=" max-w-7xl select-none px-4 m-auto py-3  flex items-center justify-between gap-2">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl  sm:text-3xl">Koralew</h1>
        </Link>

        <div
          className={`flex-1 hidden sm:inline-flex   border-2 rounded-lg transition-shadow border-secondary   p-2 max-w-[40%]`}
        >
          <input
            type="text"
            className="outline-none w-full bg-transparent   "
            placeholder="Search"
          />
          <Search className="cursor-pointer hover:text-primary " />
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <NavProfile />
          <ModeToggle />
        </div>
      </div>
      <div
        className={`sm:hidden flex border-2 rounded-lg transition-shadow border-secondary p-2  mx-4 mb-2  `}
      >
        <input
          type="text"
          className="outline-none w-full bg-transparent   "
          placeholder="Search"
        />
        <Search className="cursor-pointer hover:text-primary " />
      </div>
    </div>
  );
};
