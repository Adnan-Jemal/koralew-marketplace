"use client";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import AddItemImgInput from "../AddEditItemImgInput";

import { ImgFilesT } from "./CreateListingMainForm";
import AddedImagesList from "../AddedImagesList";

export const maxImgSizeInBytes = 1024 * 1024;
export const MaxNumOfImgs = 8;
type propTypes = {
  imgFiles: ImgFilesT[];
  setImgFiles: Dispatch<SetStateAction<ImgFilesT[]>>;
  setImgError: Dispatch<SetStateAction<string>>;
  imgError: string;
};
function AddItemImgsForm({
  setImgFiles,
  imgFiles,
  setImgError,
  imgError,
}: propTypes) {
  const handleImgAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filesFromInput = Array.from(e.currentTarget.files || []);
    const numOfLargeFiles = filesFromInput.filter(
      (file) => file.size > maxImgSizeInBytes
    ).length;

    if (filesFromInput.length > MaxNumOfImgs) {
      setImgError("You can only upload up to " + MaxNumOfImgs + " images!");
      return;
    }
    if (filesFromInput.length + imgFiles.length > MaxNumOfImgs) {
      setImgError(
        "You can only upload " +
          (MaxNumOfImgs - imgFiles.length) +
          " more images!"
      );
      return;
    }
    if (filesFromInput.length + imgFiles.length == 1) {
      setImgError("Please add more than one image!");
      return;
    }
    if (numOfLargeFiles > 0) {
      filesFromInput = filesFromInput.filter((f) => f.size < maxImgSizeInBytes);
      toast.error(
        numOfLargeFiles + " of the selected files not added due to size limits!"
      );
    } else {
      setImgError("");
    }
    filesFromInput.forEach((file) =>
      setImgFiles((prev) => [
        ...prev,
        { file: file, url: URL.createObjectURL(file) },
      ])
    );
  };

  const removeImgItem = (removedImgUrl: string) => {
    setImgFiles((prevImgs) =>
      prevImgs.filter((img) => img.url != removedImgUrl)
    );
    setImgError("");
  };

  return (
    <>
      {imgFiles.length > 0 ? (
        <AddedImagesList
          imgUrls={imgFiles.map((i) => i.url)}
          handleImgAddChange={handleImgAddChange}
          removeImgItem={removeImgItem}
        />
      ) : (
        <AddItemImgInput handleImgAddChange={handleImgAddChange} />
      )}
      <p className="text-sm text-white bg-red-400 w-fit px-2 rounded-md text-center  ">
        {imgError}
      </p>
    </>
  );
}

export default AddItemImgsForm;
