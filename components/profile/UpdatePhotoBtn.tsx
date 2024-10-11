"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

const UpdatePhotoBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"sm"}>
            Update Photo
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] text-center rounded-xl dark:border-secondary">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
          </DialogHeader>
          <form action="">
            
            <Input className="mt-4 mb-2" name="profilePicture" type="file" />
            <Button type="submit" variant={"secondary"}>Upload Image</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePhotoBtn;
