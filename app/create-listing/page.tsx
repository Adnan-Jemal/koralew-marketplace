import { auth } from "@/auth";
import AddItemForm from "@/components/create-listing/AddItemForm";
import AddItemHeader from "@/components/create-listing/AddItemHeader";
import AddItemImgForm from "@/components/create-listing/AddItemImgForm";

import React from "react";

export default async function page() {
  return (
    <div>
      <AddItemHeader />
      <div className="sm:max-w-[65%] w-[80%] mx-auto flex flex-col  gap-14  my-10">
        <h1 className="text-center text-4xl font-bold">Create a Listing</h1>
        <AddItemImgForm/>
        <AddItemForm />
      </div>
    </div>
  );
}
