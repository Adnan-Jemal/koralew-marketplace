"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { updateUserPhoto } from "@/actions/update";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Ellipsis, UploadCloud, XCircle } from "lucide-react";
import Image from "next/image";

type propType = {
  session: Session | null;
};
const UpdatePhotoBtn = ({ session }: propType) => {
  const [imgFile, setImgFile] = useState<File | null>();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [localImgUrl, setLocalImgUrl] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { update } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    setImgFile(file);
    file && setLocalImgUrl(URL.createObjectURL(file));
    file = undefined;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      console.error("You need to be logged in");
      return;
    }
    const userId = session?.user?.id;
    if (!userId) {
      console.error("The user does not exist");
      return;
    }
    if (!imgFile) {
      console.error("No image found");
      toast("No image found");
      return;
    }
    setUploading(true);
    try {
      const newImageRef = ref(storage, `images/users/${userId}`);
      await uploadBytesResumable(newImageRef, imgFile as Blob);
      const imgUrl = await getDownloadURL(newImageRef);
      await updateUserPhoto(userId, imgUrl).then(() => update());
      setOpen(false);
      setImgFile(null);
      setUploading(false);
      toast.success("Profile Image Updated Successfully");
    } catch (err) {
      console.error(err);
      toast.error('something went wrong')
    }
  };

  return (
    <>
      <Dialog   open={open||uploading} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={uploading} variant={"secondary"} size={"sm"}>
            Update Profile Image
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] text-center rounded-xl dark:border-secondary">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Upload Image
            </DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            {localImgUrl == "" || imgFile == null ? (
              <div
                onClick={() => imageInputRef.current?.click()}
                className=" h-40 p-6 border border-secondary flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer mb-6 shadow-lg "
              >
                {" "}
                <UploadCloud className="size-10 cursor-pointer" />
                <span>Click here to upload image</span>
              </div>
            ) : (
              <div className=" relative mb-6 shadow-lg rounded-full border border-secondary">
                {" "}
                <Image
                  src={localImgUrl}
                  width={200}
                  height={200}
                  alt="uploaded Image"
                  className="object-cover rounded-full size-40"
                />{" "}
                <button
                  onClick={() => {
                    setLocalImgUrl("");
                    setImgFile(null);
                  }}
                  disabled={uploading || imgFile == null}
                  className="absolute cursor-pointer disabled:opacity-50 disabled:cursor-wait text-red-400 rounded-full top-0 right-0"
                >
                  <XCircle className=" absolute text-red-400 rounded-full top-0 right-0" />
                </button>
              </div>
            )}

            <input
              ref={imageInputRef}
              disabled={uploading}
              onChange={handleChange}
              hidden
              // className="mt-2 mb-6  w-[70%] file:text-sm text-sm rounded-lg disabled:cursor-progress  bg-secondary cursor-pointer file:bg-primary file:text-primary-foreground file:py-2 file:rounded-lg file:border-none file:mr-3 file:cursor-pointer file:disabled:opacity-60 file:disabled:cursor-progress"
              accept="image/*"
              name="profileImg"
              type="file"
            />
            <Button
              className="w-full"
              disabled={uploading || imgFile == null}
              type="submit"
            >
              {uploading ? (
                <Ellipsis className="text-4xl animate-bounce" />
              ) : (
                "Save Image"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePhotoBtn;
