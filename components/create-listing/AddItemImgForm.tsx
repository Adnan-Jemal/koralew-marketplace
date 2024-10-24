"use client";
import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";

export default function AddItemImgForm({
  handleChange,imgInputRef 
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgInputRef:React.RefObject<HTMLInputElement>
}) {
  

  return (
    <div
      onClick={() => imgInputRef.current?.click()}
      className=" h-40 p-6 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer bg-secondary  "
    >
      {" "}
      <UploadCloud className="size-10 cursor-pointer" />
      <span>Click here to upload images</span>
      <input
        ref={imgInputRef}
        // disabled={uploading}
        onChange={handleChange}
        hidden
        accept="image/*"
        name="productImages"
        type="file"
        multiple
        max={8}
      />
    </div>
  );
}
