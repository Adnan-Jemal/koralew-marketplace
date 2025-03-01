import SidebarProfile from "./SidebarProfile";
import SidebarMenuItems from "./SidebarMenuItems";
import Logo from "@/components/general/Logo";

const Sidebar = () => {
  return (
    <>
      <div className=" hidden sticky top-0 sm:inline-flex w-[300px] h-screen flex-col gap-5 bg-background border-r-2 border-secondary  ">
        <div className="border-b-2 py-[22px] border-secondary px-6">
          <Logo />
        </div>

        <div className="grow flex flex-col px-4 mt-6 gap-4 ">
          <SidebarMenuItems />
        </div>
        <SidebarProfile />
      </div>
    </>
  );
};

export default Sidebar;
