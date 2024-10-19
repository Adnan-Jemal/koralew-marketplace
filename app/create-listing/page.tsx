"use client";
import AddItemForm, {
  addItemFormSchema,
} from "@/components/create-listing/AddItemForm";
import AddItemHeader from "@/components/create-listing/AddItemHeader";
import AddItemImgForm from "@/components/create-listing/AddItemImgForm";
import UploadedImages from "@/components/create-listing/UploadedImages";

import React, { useState } from "react";
import { z } from "zod";

export default function page() {
  const [fileUrls, setFileUrls] = useState<String[]>([]);
  const [error,setError]=useState<string>('')
  async function onSubmit(values: z.infer<typeof addItemFormSchema>) {
    // await updateUser(userData.id, values).then(() => toast("Profile Updated"));
    if(fileUrls.length<1){
      setError("please upload images")
      window.scrollTo({top:0,behavior:"smooth"})
      return
    }else{setError('')}
    console.log("from parent");
    console.log(values);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    if (files.length > 8) {
      setError("You can only upload up to 8 images")
      return;
    }else{setError('')}
    const urls = files.map((file) => URL.createObjectURL(file));
    setFileUrls((prevUrls) => [...prevUrls, ...urls]);
  };
  return (
    <div>
      <AddItemHeader />
      <div className="sm:max-w-[65%] w-[80%] mx-auto flex flex-col  gap-14  my-10">
        <h1 className="text-center text-4xl font-bold">Create a Listing</h1>
        <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary mt-3 flex flex-col gap-4">
          <h2 className="text-xl ml-1 ">PHOTOS</h2>
          {fileUrls.length > 0 ? (
            <UploadedImages setImages={setFileUrls} images={fileUrls} />
          ) : (
            <AddItemImgForm handleChange={handleChange} />
          )}
          <p className="text-sm text-white bg-red-400 w-fit px-2 rounded-md text-center  ">{error}</p>
        </div>
        <AddItemForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
