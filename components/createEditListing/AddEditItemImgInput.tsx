"use client";
import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";

const MaxNumOfImgs = 8;
type propTypes = {
  handleImgAddChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddItemImgInput({ handleImgAddChange }: propTypes) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => imgInputRef.current?.click()}
      className=" h-40 p-6 border border-secondary flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer bg-secondary  "
    >
      <UploadCloud className="size-10 cursor-pointer" />
      <span>Click Here to Add Images</span>
      <input
        ref={imgInputRef}
        // disabled={uploading}
        onChange={handleImgAddChange}
        hidden
        accept="image/jpeg, image/png, image/webp"
        name="itemImages"
        type="file"
        multiple
        max={MaxNumOfImgs}
      />
    </div>
  );
}
