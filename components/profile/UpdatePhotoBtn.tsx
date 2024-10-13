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
import React, { useState } from "react";
import { Session } from "next-auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Ellipsis } from "lucide-react";

type propType = {
  session: Session | null;
};
const UpdatePhotoBtn = ({ session }: propType) => {
  const [img, setImg] = useState<File | null>();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { update } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files?.[0]);
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
    if (!img) {
      console.error("No image found");
      toast("No image found");
      return;
    }
    setUploading(true);
    try {
      const newImageRef = ref(storage, `images/users/${userId}`);
      await uploadBytesResumable(newImageRef, img as Blob);
      const imgUrl = await getDownloadURL(newImageRef);
      await updateUserPhoto(userId, imgUrl).then(() => update());
      setOpen(false);
      setImg(null);
      setUploading(false);
      toast("Profile Image Updated Successfully");
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={uploading} variant={"secondary"} size={"sm"}>
            Update Profile Image
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] text-center rounded-xl dark:border-secondary">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              disabled={uploading}
              onChange={handleChange}
              className="mt-4 mb-2 hover:border-secondary-foreground cursor-pointer"
              name="profileImg"
              type="file"
            />
            <Button disabled={uploading || img == null} type="submit">
              {uploading ? (
                <Ellipsis className="text-4xl animate-bounce" />
              ) : (
                "Upload Image"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePhotoBtn;
