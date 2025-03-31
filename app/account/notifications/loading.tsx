import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareDotIcon } from "lucide-react";
import React from "react";

const NotificationsLoading = () => {
  return (
    <div className="p-10 gap-10 flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Notifications
      </h1>

      {/* Skeleton list of notification cards */}
      <div className="flex flex-col gap-8 items-center justify-center w-[80%] mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full bg-primary-foreground/50 flex items-center justify-center text-center sm:justify-normal sm:text-start p-4 rounded-lg gap-3 flex-wrap shadow-md"
          >
            {/* Icon skeleton */}
            <div className="bg-background p-3 rounded-full">
              <MessageSquareDotIcon className="size-8" />
            </div>
            {/* Notification details skeleton */}
            <div className="flex flex-col flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            {/* Action button skeleton */}
            <div>
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsLoading;
