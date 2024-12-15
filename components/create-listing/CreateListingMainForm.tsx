"use client";
import { addImage, addItem } from "@/actions/create";

import AddItemHeader from "@/components/create-listing/AddItemHeader";
import AddItemForm, { addItemFormSchema } from "./AddItemForm";
import UploadedImages from "@/components/create-listing/UploadedImages";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import UploadLoading from "./UploadLoading";
import AddItemImgInput from "@/components/create-listing/AddItemImgInput";


export default function CreateListingMainForm({
  session,
}: {
  session: Session | null;
}) {

  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgError, setImgError] = useState<String>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<String>("");
  const router = useRouter();

  async function onSubmit(formValues: z.infer<typeof addItemFormSchema>) {
    if (imgFiles.length < 1) {
      setImgError("please upload images");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (imgError != "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!session?.user?.id) {
      console.error("no user found");
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("Creating Listing");
      await addItem(formValues, session.user.id).then(async (newProductId) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setUploadMessage("Uploading Images");
        // Loop through all imgFiles and upload each one
        const uploadPromises = imgFiles.map(async (imgFile, index) => {
          const newImageRef = ref(
            storage,
            `images/products/${newProductId}/image_${index}`
          );
          const uploadTask = await uploadBytesResumable(
            newImageRef,
            imgFile as Blob
          );
          const imgUrl = await getDownloadURL(uploadTask.ref);
          await addImage(newProductId, imgUrl, index + 1);
          setUploadMessage("Almost Done");
        });

        // Wait for all images to be uploaded
        await Promise.all(uploadPromises);
      });
      router.push("/account/my-items");
      toast.success("Item Added Successfully");
    } catch (err) {
      console.error(err);
      router.refresh();
      setIsUploading(false);
      toast.error("something went wrong try again");
    }
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    if (files.length > 8) {
      setImgError("You can only upload up to 8 images");
      return;
    }
    if (files.length == 1) {
      setImgError("Please add more than one image");
      return;
    } else {
      setImgError("");
    }
    setImgFiles(files);
  };

  return (
    <>
      <div className="relative">
        <AddItemHeader />
        <div className="sm:max-w-[65%] w-[80%] mx-auto flex flex-col  gap-14   my-16">
          <h1 className="text-center text-4xl font-bold">Create a Listing</h1>
          <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary mt-3 flex flex-col gap-4">
            <h2 className="text-xl ml-1 ">PHOTOS</h2>
            {imgFiles.length > 0 ? (
              <UploadedImages
                setError={setImgError}
                setImages={setImgFiles}
                images={imgFiles}
              />
            ) : (
              <AddItemImgInput handleChange={handleImgChange} />
            )}
            <p className="text-sm text-white bg-red-400 w-fit px-2 rounded-md text-center  ">
              {imgError}
            </p>
          </div>
          <AddItemForm onSubmit={onSubmit} />
        </div>
      </div>
      {isUploading && <UploadLoading message={uploadMessage} />}
    </>
  );
}
