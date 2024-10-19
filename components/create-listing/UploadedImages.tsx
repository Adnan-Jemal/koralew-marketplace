"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { XCircle, X } from "lucide-react";

type propTypes = {
  images: String[];
  setImages: Dispatch<SetStateAction<String[]>>;
};
export default function UploadedImages({ images, setImages }: propTypes) {
  return (
    <div className=" min-h-40 p-5 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary  ">
      <div className="flex flex-wrap w-full gap-3 justify-evenly">
        {images.map((img) => (
          <div className="relative">
            <Image
              className="rounded-md select-none object-cover size-40"
              key={img.toString()}
              alt="selected product images"
              width={200}
              height={200}
              src={img.toString()}
            />
            <X
              onClick={() => setImages(images.filter((i) => i != img))}
              className="absolute cursor-pointer top-[-5px] right-[-5px] z-10 bg-red-500 rounded-full text-white size-5 p-[2px] shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
