import { auth } from "@/auth";
import AddItemForm from "@/components/create-listing/AddItemForm";
import AddItemHeader from "@/components/create-listing/AddItemHeader";

import React from "react";

export default async function page() {
  return (
    <div>
      <AddItemHeader />
      <div className="w-[80%] mx-auto flex flex-col  gap-14  my-10">
        <AddItemForm />
      </div>
    </div>
  );
}
