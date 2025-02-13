import { firestoreNotificationsWithId } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareDotIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import MarkaAsReadBtn from "./MarkaAsReadBtn";

const NotificationCard = ({
  notification,
}: {
  notification: firestoreNotificationsWithId;
}) => {
  return (
    <Link
      href={notification.link}
      className="w-4/5 flex items-center justify-center"
    >
      <div
        key={notification.id}
        className="w-full bg-secondary flex items-center justify-center text-center sm:justify-normal sm:text-start p-4 rounded-lg gap-3 flex-wrap"
      >
        <div className="bg-background p-3 rounded-full">
          <MessageSquareDotIcon className="size-8" />
        </div>
        <div className=" flex flex-col">
          <p className="text-sm">{notification.type}</p>
          <p className="text-lg">{notification.message}</p>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(notification.sentAt || "") + " ago"}
          </p>
        </div>
        <MarkaAsReadBtn
          notificationId={notification.id}
          notificationRead={notification.read}
        />
      </div>
    </Link>
  );
};

export default NotificationCard;
