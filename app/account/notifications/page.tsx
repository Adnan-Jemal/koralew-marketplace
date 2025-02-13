import NotificationCard from "@/components/notifications/NotificationCard";
import { getNotifications } from "@/data/notification";

import { BellOffIcon } from "lucide-react";

const NotificationsPage = async () => {
  const notifications = await getNotifications();
  return (
    <div className="p-10 gap-10  flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">
        Notifications
      </h1>
      {notifications.length < 1 && (
        <div className="flex flex-col w-full h-80 items-center justify-center text-center">
          <BellOffIcon className="size-36" />
          <h2 className="text-3xl font-bold">Notifications Empty</h2>
          <p>You do not have any notifications at the moment</p>
        </div>
      )}
      <div className="flex flex-col gap-8 items-center justify-center ">
        {notifications?.map((n) => {
          return <NotificationCard key={n.id} notification={n} />;
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
