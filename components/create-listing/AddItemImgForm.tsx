import { UploadCloud } from "lucide-react";
import React from "react";

export default function AddItemImgForm() {
  return (
    <div className="w-full p-6 shadow-lg rounded-3xl dark:border dark:border-secondary mt-3 flex flex-col gap-4">
        <h2 className="text-xl ml-1 ">PHOTOS</h2>
        <div
                // onClick={() => imageInputRef.current?.click()}
                className=" h-40 p-6 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer bg-secondary  "
              >
                {" "}
                <UploadCloud className="size-10 cursor-pointer" />
                <span>Click here to upload images</span>
              </div>
    </div>
  );
}
