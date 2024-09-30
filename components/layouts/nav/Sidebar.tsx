import Link from "next/link";
import SidebarProfile from "./SidebarProfile";
import SidebarMenus from "./SidebarMenuItems";

const Sidebar = () => {
  return (
    <>
      <div className=" hidden sticky top-0 sm:inline-flex w-[300px] h-screen flex-col gap-5 bg-background border-r-2 border-secondary  ">
        <div className="border-b-2 py-[22px] border-secondary px-6">
          <Link href={"/"} className="">
            <h1 className="font-bold text-2xl  sm:text-3xl">Koralew</h1>
          </Link>
        </div>

        <div className="grow flex flex-col px-4 mt-6 gap-4">
          <SidebarMenus />
        </div>
        <SidebarProfile />
      </div>
    </>
  );
};

export default Sidebar;
