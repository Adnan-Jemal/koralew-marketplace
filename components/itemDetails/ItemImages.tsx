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
    images.find((img) => img.order == 6)?.imageUrl
  );
  return (
    <>
      <div className="w-1/2  h-[65vh] rounded-2xl  grid grid-cols-5">
        <div className="flex flex-col col-span-1 p-2  w-full  space-y-2 overflow-y-scroll">
          {images.map((img) => (
            <AspectRatio ratio={1 / 1} className="">
              <Image
                className="object-cover size-full rounded-2xl"
                alt="Item Image"
                height={500}
                width={500}
                src={img.imageUrl || ""}
              />
            </AspectRatio>
           
          ))}
        </div>
        <div className="col-span-4">
         
        <AspectRatio ratio={1/1}>
              <Image
                className="object-cover rounded-2xl size-full"
                alt="Item Image"
                height={500}
                width={500}
                src={currentImg||''}
              />
            </AspectRatio>
        
        </div>
      </div>
    </>
  );
}
