import { Search } from "lucide-react";
import React from "react";

export const SearchBar = ({
  smallScreen = false,
}: {
  smallScreen?: boolean;
}) => {
  return (
    <>
      {smallScreen ? (
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
      ) : (
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
      )}
    </>
  );
};
