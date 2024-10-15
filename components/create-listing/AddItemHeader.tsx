import { PackagePlus, ArrowLeft, HomeIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";

const AddItemHeader = () => {
  return (
    <div className=" py-4 border-b-2 border-secondary sticky top-0 z-10 bg-background">
      <div className=" max-w-7xl select-none px-4 m-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl  sm:text-3xl">Koralew</h1>
        </Link>

          {/* <Link href={"/"}>
            {" "}
            <Button
              variant={"outline"}
              className=" items-center py-6 text-lg border-none "
            >
              <ArrowLeft className="mr-2 size-6 py-6 text-lg   text-md" /> Home
            </Button>
          </Link> */}
        </div>

        <div className="flex items-center md:gap-4 gap-2">
  <Link href={"/account/dashboard"}>
            {" "}
            <Button
              variant={"outline"}
              className=" items-center py-6 text-md "
            >
              Cancel & Discard
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AddItemHeader;
