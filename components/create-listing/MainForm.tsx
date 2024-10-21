"use client";
import { addItem } from "@/actions/create";
import AddItemForm, {
  addItemFormSchema,
} from "@/components/create-listing/AddItemForm";
import AddItemHeader from "@/components/create-listing/AddItemHeader";
import AddItemImgForm from "@/components/create-listing/AddItemImgForm";
import UploadedImages from "@/components/create-listing/UploadedImages";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function MainForm({session}:{session:Session|null}) {
  const [fileUrls, setFileUrls] = useState<String[]>([]);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [error, setError] = useState<String>("");

  async function onSubmit(formValues: z.infer<typeof addItemFormSchema>) {
    if (fileUrls.length < 1) {
      setError("please upload images");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else {
      setError("");
    }

    if (!session?.user?.id) {
      console.error("no user found");
      return;
    }
    try {
      await addItem(formValues,session.user.id)
      const newImageRef = ref(storage, `images/services/${'service id'}`);
      imgFiles.forEach(
        async (imgFile) => await uploadBytesResumable(newImageRef, imgFile as Blob)
      );

      const imgUrl = await getDownloadURL(newImageRef);
      // await updateUserPhoto(userId, imgUrl).then(() => update());
      // setOpen(false);
      // setImgFile(null);
      // setUploading(false);
      toast("Profile Image Updated Successfully");
    } catch (err) {
      console.error(err);
      toast("something went wrong");
    }

    console.log("on submit");
    console.log(formValues);
    
    console.log(imgFiles);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(session?.user)
    const files = Array.from(e.currentTarget.files || []);
    setImgFiles(files);
    if (files.length > 8) {
      setError("You can only upload up to 8 images");
      return;
    } else {
      setError("");
      setImgFiles([]);
    }
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
          <p className="text-sm text-white bg-red-400 w-fit px-2 rounded-md text-center  ">
            {error}
          </p>
        </div>
        <AddItemForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}