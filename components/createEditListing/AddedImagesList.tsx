"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { MaxNumOfImgs } from "./AddItem/AddItemImgsForm";

type propTypes = {
  imgUrls: string[];
  handleImgAddChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImgItem: (img: string) => void;
};
export default function AddedImagesList({
  imgUrls,
  removeImgItem,
  handleImgAddChange,
}: propTypes) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className=" min-h-40 p-5 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary  ">
      <div className="flex flex-wrap  mx-auto gap-6 justify-evenly items-center">
        {imgUrls.map((img) => {
          return (
            <div key={imgUrls.indexOf(img)} className="relative ">
              <Image
                className={`rounded-md select-none ${
                  !img && "animate-pulse"
                } bg-gray-200 dark:bg-gray-600 object-cover size-20 sm:size-32 md:size-40`}
                alt="selected product images"
                width={200}
                height={200}
                src={img}
              />
              <X
                onClick={() => {
                  removeImgItem(img);
                }}
                className="absolute cursor-pointer top-[-5px] right-[-5px] bg-red-500 rounded-full text-white size-5 p-[2px] shadow-lg"
              />
            </div>
          );
        })}
        {imgUrls.length != MaxNumOfImgs && (
          <div
            onClick={() => imgInputRef.current?.click()}
            className="bg-primary-foreground size-20 sm:size-32 md:size-40 rounded-xl p-1 sm:p-2 flex flex-col items-center justify-evenly  cursor-pointer border-2 hover:border-primary text-center"
          >
            <UploadCloud className="size-16" />
            <p className="text-sm sm:text-[16px]">Add More Image</p>
            <input
              ref={imgInputRef}
              onChange={handleImgAddChange}
              hidden
              accept="image/jpeg, image/png, image/webp"
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
