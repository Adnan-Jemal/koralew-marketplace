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

const UpdatePhotoBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"sm"}>
            Update Photo
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] rounded-xl dark:border-secondary">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePhotoBtn;
