"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, Suspense, useEffect, useState } from "react";
import FilterDrawer from "./DrawerFilter";
import { Button } from "../ui/button";

export const SearchBar = ({
  smallScreen = false,
}: {
  smallScreen?: boolean;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();
  const [searchTerm, setSearchTerm] = useState(params.get("q") ?? "");
  const category = params.get("category");

  //added because the input did not cleared when navigated to home page
  useEffect(() => {
    setSearchTerm(params.get("q") ?? "");
  }, [params]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm)
      router.push(
        `/search?q=${searchTerm}${category ? `&category=${category}` : ""}`
      );
    else router.push("/");
  };

  return (
    <Suspense>
      <div
        className={`
    ${
      smallScreen
        ? "flex sm:hidden mx-4 mb-2 items-center gap-2"
        : "hidden sm:inline-flex flex-1 max-w-[40%]"
    }
  `}
      >
        <div className=" border-2 rounded-xl transition-shadow border-secondary p-1 pl-2 w-full">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="outline-none  bg-transparent flex-1"
              placeholder="Search"
              aria-label="Search articles"
            />
            <Button
              type="submit"
              variant={"secondary"}
              size={"icon"}
              aria-label="Perform search"
            >
              <Search />
            </Button>
          </form>
        </div>
        {smallScreen && path.includes("search") && <FilterDrawer />}
      </div>
    </Suspense>
  );
};
