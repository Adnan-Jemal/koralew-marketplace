"use client";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { SelectProductImages } from "@/db/schema";
import { useState } from "react";

export default function ItemImages({
  images,
}: {
  images: SelectProductImages[];
}) {
  const [currentImg, setCurrentImg] = useState(
    images.find((img) => img.order == 1)?.imageUrl || ""
  );
  return (
    <>
      <div className="w-[90%] md:w-1/2 md:sticky md:h-fit md:top-28 mx-auto rounded-2xl  grid grid-cols-5 gap-2">
        <div
          id="image-list"
          className={`flex flex-col col-span-1 p-2  w-full  space-y-4 overflow-y-scroll ${
            images.length < 6 && "scrollbar-none"
          }  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary h-[50vh] sm:h-[60vh] lg:h-[68vh] `}
        >
          {images.map((img) => (
            <AspectRatio ratio={1 / 1} key={img.id}>
              <Image
                onClick={() => setCurrentImg(img.imageUrl)}
                className={`object-cover size-full rounded-2xl cursor-pointer shadow-md ${
                  currentImg == img.imageUrl &&
                  "shadow-lg border-2 border-blue-600"
                } `}
                alt="Item Image"
                height={500}
                width={500}
                src={img.imageUrl}
              />
            </AspectRatio>
          ))}
        </div>
        <div className="col-span-4 ">
          <AspectRatio ratio={1 / 1}>
            <Image
              className="object-cover rounded-2xl size-full"
              alt="Item Image"
              height={500}
              width={500}
              src={currentImg}
            />
          </AspectRatio>
        </div>
      </div>
    </>
  );
}
