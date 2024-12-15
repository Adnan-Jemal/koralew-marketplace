"use client";
import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";

export default function AddItemImgInput({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const imgInputRef = useRef<HTMLInputElement>(null);
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
