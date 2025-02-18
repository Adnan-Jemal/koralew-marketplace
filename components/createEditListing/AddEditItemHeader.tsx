"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useRouter } from "next/navigation";

const AddEditItemHeader = () => {
  const router = useRouter();
  return (
    <div className=" py-4 border-b-2 border-secondary sticky top-0 z-10 bg-background">
      <div className=" max-w-7xl select-none px-4 m-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <h1 className="font-bold text-2xl  sm:text-3xl">Koralew</h1>
          </Link>
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <Button
            onClick={router.back}
            variant={"outline"}
            className=" items-center py-6 text-md "
          >
            Cancel & Discard
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AddEditItemHeader;
