import { Skeleton } from "@/components/ui/skeleton";

export default function FilterSidebarSkeleton() {
  return (
    <div className="sticky top-[82px] w-96 h-[88vh] sm:flex flex-col p-4 gap-16 hidden">
      {/* Category Skeleton */}
      <div className="h-1/2 w-full space-y-2">
        <Skeleton className="h-5 w-28" />
        <div className="bg-secondary rounded-2xl w-full h-full px-2 py-4 space-y-2 ">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-background">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-background">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-background">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-background">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-background">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Condition Skeleton */}
      <div className="w-full space-y-2 mb-4">
        <Skeleton className="h-5 w-28 mb-2" />
        <div className="bg-secondary rounded-2xl w-full h-fit p-4 mx-auto gap-2 flex flex-wrap items-center justify-center">
          <div className="flex items-center space-x-2 p-4 rounded-lg bg-background">
            {/* <Skeleton className="h-5 w-5 rounded-full" /> */}
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-lg bg-background">
            {/* <Skeleton className="h-5 w-5 rounded-full" /> */}
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-lg bg-background">
            {/* <Skeleton className="h-5 w-5 rounded-full" /> */}
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-lg bg-background">
            {/* <Skeleton className="h-5 w-5 rounded-full" /> */}
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
