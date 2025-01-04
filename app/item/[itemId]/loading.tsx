import { Skeleton } from "@/components/ui/skeleton";

export default function ItemLoading() {
  return (
    <>
      {/* Breadcrumbs and Action Buttons */}
      <div className="w-[90%] max-w-6xl mx-auto flex  justify-between items-start md:items-center gap-4 py-4">
        <Skeleton className="w-1/3 md:w-1/4 h-6" />
        <div className="flex gap-4">
          <Skeleton className="w-20 h-8 md:w-24 md:h-10" />
          <Skeleton className="w-20 h-8 md:w-24 md:h-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-4">
        <div className="flex lg:w-[50%] w-[90%] gap-4 m-4">
          {/* Image Section */}
          <div className="flex  flex-col gap-4 justify-center lg:justify-start">
            <Skeleton className="size-20 md:w-28 md:h-28 lg:w-32 lg:h-32" />
            <Skeleton className="size-20 md:w-28 md:h-28 lg:w-32 lg:h-32" />
            <Skeleton className="size-20 md:w-28 md:h-28 lg:w-32 lg:h-32" />
            <Skeleton className="size-20 md:w-28 md:h-28 lg:w-32 lg:h-32" />
          </div>
          <Skeleton className=" w-full mx-auto " />
        </div>

        {/* Item Info Section */}

        <div className=" m-4 flex flex-col pt-4 gap-6 md:gap-10">
          <Skeleton className="h-8 w-3/4 md:h-12" />
          <Skeleton className="h-6 w-1/3 md:h-10" />

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-8 w-36 md:h-9 md:w-44" />
            <Skeleton className="h-8 w-48 md:h-9 md:w-56" />
            <Skeleton className="h-8 w-36 md:h-9 md:w-44" />
          </div>

          <Skeleton className="h-32 w-full md:h-44" />
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16">
        <h3 className="text-lg font-semibold mb-4">
          <Skeleton className="h-6 w-40 m-4" />
        </h3>
        <div className="flex flex-wrap gap-12 m-4">
          <Skeleton className="w-56 h-72" />
          <Skeleton className="w-56 h-72" />
          <Skeleton className="w-56 h-72" />
          <Skeleton className="w-56 h-72" />
          <Skeleton className="w-56 h-72" />
        </div>
      </div>
    </>
  );
}
