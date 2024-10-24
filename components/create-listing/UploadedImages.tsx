"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";

type propTypes = {
  images:File[]
  setImages: Dispatch<SetStateAction<File[]>>;
};
export default function UploadedImages({  setImages,images }: propTypes) {
  const [fileUrls, setFileUrls] = useState<String[]>([]);
  const urls = images.map((file) => URL.createObjectURL(file));
    setFileUrls((prevUrls) => [...prevUrls, ...urls]);
  return (
    <div className=" min-h-40 p-5 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary  ">
      <div className="flex flex-wrap w-full gap-3 justify-evenly">
        {images.map((img) => (
          <div key={img.toString()} className="relative">
            <Image
              className="rounded-md select-none object-cover size-20 sm:size-32 md:size-40"
              alt="selected product images"
              width={200}
              height={200}
              src={img.toString()}
            />
            <X
              onClick={() => setImages(images.filter((i) => i != img))}
              className="absolute cursor-pointer top-[-5px] right-[-5px] bg-red-500 rounded-full text-white size-5 p-[2px] shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
