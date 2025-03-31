import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export default function ChatPageSkeleton() {
  return (
    <div className="lg:max-w-[60%] flex flex-col w-full h-[88dvh] min-h-0">
      {/* Header Skeleton */}
      <div className="grid grid-cols-2 divide-x-2 items-center justify-between py-2 gap-2 border-b-2 px-4">
        {/* Left Side: Back button, avatar, name & role */}
        <div className="flex gap-2 items-center justify-start p-1 w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col justify-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
        {/* Right Side: Item info */}
        <div className="flex items-center justify-end gap-3 text-end p-1 pl-4">
          <div className="flex flex-col justify-center">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-32 mt-1" />
          </div>
          <Skeleton className="h-16 w-16 rounded-lg" />
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 min-h-0 overflow-hidden p-4 space-y-8">
        {Array.from({ length: 6 }).map((_, i) => {
          const isLeft = i % 2 === 0; // alternate alignment
          return (
            <div
              key={i}
              className={`flex items-start space-x-2 ${
                !isLeft ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              {/* Message Bubble Skeleton */}

              <Skeleton
                className={clsx(" h-10 w-2/4 p-2 rounded-lg", {
                  "bg-primary text-primary-foreground rounded-br-none  ":
                    !isLeft,
                  "bg-secondary rounded-bl-none ": isLeft,
                })}
              />
            </div>
          );
        })}
      </div>

      {/* Send Message Form Skeleton */}
      <div className="p-4 border-t">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
