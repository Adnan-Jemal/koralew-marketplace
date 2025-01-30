"use client";
import { Dispatch, SetStateAction} from "react";
import { toast } from "sonner";
import AddItemImgInput from "../AddEditItemImgInput";
import AddedImagesList from "../AddedImagesList";
import { EditImgFilesT } from "./EditListingMain";
import { maxImgSizeInBytes, MaxNumOfImgs } from "../AddItem/AddItemImgsForm";

type propTypes = {
  imgFiles: EditImgFilesT[];
  setImgFiles: Dispatch<SetStateAction<EditImgFilesT[]>>;
  setRemovedImgUrls: Dispatch<SetStateAction<string[]>>;
  setImgError: Dispatch<SetStateAction<string>>;
  imgError: string;
};
function EditItemImgsForm({
  setImgFiles,
  imgFiles,
  setImgError,
  setRemovedImgUrls,
  imgError,
}: propTypes) {
  const handleImgAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let FilesFromInput = Array.from(e.currentTarget.files || []);
    const numOfLargeFiles = FilesFromInput.filter(
      (file) => file.size > maxImgSizeInBytes
    ).length;

    if (FilesFromInput.length > MaxNumOfImgs) {
      setImgError("You can only upload up to " + MaxNumOfImgs + " images!");
      return;
    }
    if (FilesFromInput.length + imgFiles.length > MaxNumOfImgs) {
      setImgError(
        "You can only upload " +
          (MaxNumOfImgs - imgFiles.length) +
          " more images!"
      );
      return;
    }
    if (FilesFromInput.length + imgFiles.length == 1) {
      setImgError("Please add more than one image!");
      return;
    }
    if (numOfLargeFiles > 0) {
      FilesFromInput = FilesFromInput.filter((f) => f.size < maxImgSizeInBytes);
      toast.error(
        numOfLargeFiles + " of the selected files not added due to size limits!"
      );
    } else {
      setImgError("");
    }
    for (const file of FilesFromInput) {
      setImgFiles((prev) => [
        ...prev,
        { file: file, url: URL.createObjectURL(file) },
      ]);
    }
  };

  const removeImgItem =  (RemovedImgURL: string) => {
    setRemovedImgUrls((prev) => [...prev, RemovedImgURL]);
    setImgFiles((prevImgs) => prevImgs.filter((img) => img.url != RemovedImgURL));
    setImgError("");
  };

  return (
    <>
      {imgFiles.length > 0 ? (
        <AddedImagesList
          imgUrls={imgFiles.map((i) => i.url)}
          handleImgAddChange={handleImgAddChange}
          removeImgItem={removeImgItem}
        />
      ) : (
        <AddItemImgInput handleImgAddChange={handleImgAddChange} />
      )}
      <p className="text-sm text-white bg-red-400 w-fit px-2 rounded-md text-center  ">
        {imgError}
      </p>
    </>
  );
}

export default EditItemImgsForm;
