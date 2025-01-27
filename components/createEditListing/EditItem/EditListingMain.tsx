"use client";
import { addImage, addItem } from "@/actions/create";
import AddItemForm, { addItemFormSchema } from "../AddItemForm";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import UploadLoading from "../UploadLoading";
import AddItemImgInput from "@/components/createEditListing/AddEditItemImgInput";
import { Session } from "next-auth";
import AddedImages from "../AddedImagesList";
import { SelectProductImages } from "@/db/schema/productImages";
import AddItemImgsForm from "../AddItem/AddItemImgsForm";
import EditItemImgsForm from "./EditItemImgsForm";
import { ItemWithImages } from "@/lib/types";
import { SelectProduct } from "@/db/schema/products";

type EditListingMainTypes = {
  session: Session | null;
  itemImgs: SelectProductImages[];
  item: SelectProduct[];
};
export type EditImgFilesT = {
  file?: File;
  url: string;
};
function EditListingMain({ session, itemImgs, item }: EditListingMainTypes) {
  const router = useRouter();
  const ItemImgFiles = itemImgs.map((i) => {
    return { url: i.imageUrl };
  });
  const [imgFiles, setImgFiles] = useState<EditImgFilesT[]>(ItemImgFiles);
  const [imgError, setImgError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  async function onSubmit(formValues: z.infer<typeof addItemFormSchema>) {
    if (imgFiles.length < 2) {
      setImgError("Please upload 2 or more images!");
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
      await addItem(formValues).then(async (newProductId) => {
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
            imgFile.file as Blob
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

  return (
    <>
      <div className="relative">
        <div className="sm:max-w-[65%] w-[80%] mx-auto flex flex-col  gap-14   my-16">
          <h1 className="text-center text-4xl font-bold">Edit Listing</h1>
          <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary mt-3 flex flex-col gap-4">
            <h2 className="text-xl ml-1 ">ITEM IMAGES</h2>
            <EditItemImgsForm
              imgError={imgError}
              imgFiles={imgFiles}
              setImgError={setImgError}
              setImgFiles={setImgFiles}
            />
          </div>
          <AddItemForm item={item[0]} onSubmit={onSubmit} />
        </div>
      </div>
      {isUploading && <UploadLoading message={uploadMessage} />}
    </>
  );
}

export default EditListingMain;
