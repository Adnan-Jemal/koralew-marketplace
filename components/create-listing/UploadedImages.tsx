"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

type propTypes = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  setError: Dispatch<SetStateAction<String>>;
};
const maxImgSizeInBytes = 2 * 1024 * 1024;
export default function UploadedImages({
  setImages,
  images,
  setError,
}: propTypes) {
  return (
    <div className=" min-h-40 p-5 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary  ">
      <div className="flex flex-wrap w-full gap-3 justify-evenly">
        {images.map((img) => {
          let url = URL.createObjectURL(img);
          if (img.size > maxImgSizeInBytes)
            setError(`Your image "${img.name}" is too large`);
          return (
            <div key={img.name} className="relative">
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
                  setImages(images.filter((i) => i != img));
                  setError("");
                }}
                className="absolute cursor-pointer top-[-5px] right-[-5px] bg-red-500 rounded-full text-white size-5 p-[2px] shadow-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
