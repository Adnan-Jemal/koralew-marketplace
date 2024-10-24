'use client'
import { UploadCloud } from "lucide-react";
import React from "react";

export default function UploadLoading({ message }: { message: String }) {
  return (
    <div className="fixed top-0 bottom-0 overflow-hidden  w-screen h-screen z-50 flex items-center  backdrop-blur-sm justify-center no-scroll ">
      <div className="flex items-center justify-center flex-col bg-white dark:bg-black size-52 rounded-full">
        <UploadCloud className="size-24 animate-bounce" />
        {message}
      </div>
    </div>
  );
}
