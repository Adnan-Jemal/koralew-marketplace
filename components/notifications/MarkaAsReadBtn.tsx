"use client";

import { markaNotificationRead } from "@/actions/notification";
import { Button } from "../ui/button";
import { BellDot, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type MarkaAsReadBtnPropType = {
  notificationId: string;
  notificationRead: boolean;
  notificationLink: string | null | undefined;
};

const MarkaAsReadBtn = ({
  notificationId,
  notificationRead,
  notificationLink,
}: MarkaAsReadBtnPropType) => {
  const router = useRouter();

  const handleClick = async () => {
    await markaNotificationRead(notificationId);
    if (notificationLink) router.push(notificationLink);
  };
  if (notificationRead) {
    return (
      <div className="flex items-center ml-0 sm:ml-auto gap-2">
        <CheckCheck />
        Read
      </div>
    );
  }
  return (
    <Button
      onClick={handleClick}
      variant={"outline"}
      className="flex items-center ml-0 sm:ml-auto gap-2"
    >
      <BellDot /> Mark as read
    </Button>
  );
};

export default MarkaAsReadBtn;
