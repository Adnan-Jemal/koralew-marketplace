"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";

export const SearchBar = ({
  smallScreen = false,
}: {
  smallScreen?: boolean;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("q") ?? "");
  const category = params.get("category");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm)
      router.push(
        `/search?q=${searchTerm}${category ? `&category=${category}` : ""}`
      );
    else router.push("/");
  };

  return (
    <div
      className={`
    border-2 rounded-xl transition-shadow border-secondary p-1 pl-2
    ${
      smallScreen
        ? "flex sm:hidden mx-4 mb-2"
        : "hidden sm:inline-flex flex-1 max-w-[40%]"
    }
  `}
    >
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="outline-none w-full bg-transparent flex-1"
          placeholder="Search"
          aria-label="Search articles"
        />
        <button
          type="submit"
          className="hover:text-primary transition-colors h-full p-2 rounded-xl bg-secondary"
          aria-label="Perform search"
        >
          <Search className="size-5" />
        </button>
      </form>
    </div>
  );
};
