"use client";
import { addImage } from "@/actions/create";
import AddItemForm, { addItemFormSchema } from "../AddItemForm";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import UploadLoading from "../UploadLoading";
import { Session } from "next-auth";
import { SelectProductImages } from "@/db/schema/productImages";
import EditItemImgsForm from "./EditItemImgsForm";
import { SelectProduct } from "@/db/schema/products";
import { updateItem } from "@/actions/update";
import { deleteItemImgs } from "@/actions/delete";

export type EditImgFilesT = {
  file?: File;
  url: string;
};
type EditListingMainTypes = {
  session: Session | null;
  itemImgs: SelectProductImages[];
  item: SelectProduct;
  maxImgOrder: number;
};

function EditListingMain({
  session,
  itemImgs,
  item,
  maxImgOrder,
}: EditListingMainTypes) {
  const router = useRouter();
  const ExistingItemImgs = itemImgs.map((i) => {
    return { url: i.imageUrl };
  });
  const [removedImgUrls, setRemovedImgUrls] = useState<string[]>([]);
  const [imgFiles, setImgFiles] = useState<EditImgFilesT[]>(ExistingItemImgs);
  const [imgError, setImgError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  async function onSubmit(formValues: z.infer<typeof addItemFormSchema>) {
    if (imgFiles.length < 2) {
      setImgError("Please upload 2 or more images!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!session?.user?.id) {
      console.error("no user found");
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("Updating Listing");

      await updateItem(formValues, item.id);

      window.scrollTo({ top: 0, behavior: "smooth" });
      setUploadMessage("Uploading Images");

      //get newly added imgs removing existing once
      const newImgFiles = imgFiles.filter((i) => i.file);

      // Loop through all imgFiles and upload each one
      const uploadPromises = newImgFiles.map(async (img, index) => {
        //upload each imgs to cloud storage
        const newImageRef = ref(
          storage,
          `images/products/${item.id}/image_${maxImgOrder + index}`
        );
        const uploadTask = await uploadBytesResumable(
          newImageRef,
          img.file as Blob
        );

        //get url of each uploaded imgs
        const imgUrl = await getDownloadURL(uploadTask.ref);

        //add new img url to db
        await addImage(item.id, imgUrl, maxImgOrder + index + 1);
      });

      // Wait for all images to be uploaded
      await Promise.all(uploadPromises);
      setUploadMessage("Almost Done");
      //delete removed imgs form cloud
      await deleteItemImgs(removedImgUrls, item.id);
      router.push("/account/my-items");
      toast.success("Item Updated Successfully");
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
              setRemovedImgUrls={setRemovedImgUrls}
            />
          </div>
          <AddItemForm item={item} onSubmit={onSubmit} />
        </div>
      </div>
      {isUploading && <UploadLoading message={uploadMessage} />}
    </>
  );
}

export default EditListingMain;
