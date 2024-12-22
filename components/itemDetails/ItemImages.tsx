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
      <div className="w-[90%] relative lg:w-1/2 lg:sticky h-fit lg:top-28 mx-auto rounded-2xl  flex gap-2">
        {/* used to hold space for the absolute positioned div aka image list */}
        <div className="w-1/5"></div>
        <div
          id="image-list"
          className={`flex flex-col col-span-1 p-2 w-1/5 h-full absolute  space-y-4 overflow-y-auto ${
            images.length < 6 && "scrollbar-none"
          }  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary `}
        >
          {images.map((img) => (
            <AspectRatio ratio={1 / 1} key={img.imageUrl}>
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
        <div className="w-4/5">
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
