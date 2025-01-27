"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

type propTypes = {
  imgFiles: File[];
  setImgFiles: Dispatch<SetStateAction<File[]>>;
  setImgError: Dispatch<SetStateAction<string>>;
};
const MaxImgSizeInBytes = 2 * 1024 * 1024;
const MaxNumOfImgs = 8;
export default function AddedImages({
  setImgFiles,
  imgFiles,
  setImgError,
}: propTypes) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    const numOfLargeFiles = files.filter(
      (file) => file.size > MaxImgSizeInBytes
    ).length;
    if (files.length + imgFiles.length > MaxNumOfImgs) {
      setImgError(
        "You can only upload " +
          (MaxNumOfImgs - imgFiles.length) +
          " more images!"
      );
      return;
    }
    if (numOfLargeFiles > 0) {
      setImgError(
        numOfLargeFiles + " of the files not added due to size limits!"
      );
    } else {
      setImgError("");
    }

    setImgFiles((prevImages) => [...prevImages, ...files]);
    //remove large files
    setImgFiles((prevImgs) =>
      prevImgs.filter((img) => img.size < MaxImgSizeInBytes)
    );
  };
  return (
    <div className=" min-h-40 p-5 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary  ">
      <div className="flex flex-wrap  mx-auto gap-6 justify-evenly items-center">
        {imgFiles.map((img) => {
          const url = URL.createObjectURL(img);

          return (
            <div key={imgFiles.indexOf(img)} className="relative ">
              <Image
                className={`rounded-md select-none ${
                  !url && "animate-pulse"
                } bg-gray-200 dark:bg-gray-600 object-cover size-20 sm:size-32 md:size-40`}
                alt="selected product images"
                width={200}
                height={200}
                src={url}
              />
              <X
                onClick={() => {
                  setImgFiles(imgFiles.filter((i) => i != img));
                  setImgError("");
                }}
                className="absolute cursor-pointer top-[-5px] right-[-5px] bg-red-500 rounded-full text-white size-5 p-[2px] shadow-lg"
              />
            </div>
          );
        })}
        {imgFiles.length != MaxNumOfImgs && (
          <div
            onClick={() => imgInputRef.current?.click()}
            className="bg-primary-foreground size-20 sm:size-32 md:size-40 rounded-xl p-1 sm:p-2 flex flex-col items-center justify-evenly  cursor-pointer border-2 hover:border-primary text-center"
          >
            <UploadCloud className="size-16" />
            <p className="text-sm sm:text-[16px]">Add More Image</p>
            <input
              ref={imgInputRef}
              onChange={handleImgChange}
              hidden
              accept="image/*"
              name="productImages"
              type="file"
              multiple
              max={MaxNumOfImgs}
            />
          </div>
        )}
      </div>
    </div>
  );
}
