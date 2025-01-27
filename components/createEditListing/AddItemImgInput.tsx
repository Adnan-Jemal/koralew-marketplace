"use client";
import { UploadCloud } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { toast } from "sonner";
const maxImgSizeInBytes = 2 * 1024 * 1024;
const MaxNumOfImgs = 8;
type propTypes = {
  setImgFiles: Dispatch<SetStateAction<File[]>>;
  setImgError: Dispatch<SetStateAction<string>>;
};

export default function AddItemImgInput({
  setImgFiles,
  setImgError,
}: propTypes) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    const numOfLargeFiles = files.filter(
      (file) => file.size > maxImgSizeInBytes
    ).length;

    if (files.length > MaxNumOfImgs) {
      setImgError("You can only upload up to " + MaxNumOfImgs + " images!");
      return;
    }
    if (files.length == 1) {
      setImgError("Please add more than one image!");
      return;
    }
    if (numOfLargeFiles > 0) {
      toast.error(
        numOfLargeFiles + " of the selected files not added due to size limits!"
      );
    } else {
      setImgError("");
    }
    setImgFiles(files);
    //remove large files
    setImgFiles((prevImgs) =>
      prevImgs.filter((img) => img.size < maxImgSizeInBytes)
    );
  };

  return (
    <div
      onClick={() => imgInputRef.current?.click()}
      className=" h-40 p-6 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer bg-secondary  "
    >
      <UploadCloud className="size-10 cursor-pointer" />
      <span>Click Here to Add Images</span>
      <input
        ref={imgInputRef}
        // disabled={uploading}
        onChange={handleImgChange}
        hidden
        accept="image/*"
        name="productImages"
        type="file"
        multiple
        max={MaxNumOfImgs}
      />
    </div>
  );
}
