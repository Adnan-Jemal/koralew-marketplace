import { formatDistanceToNow } from "date-fns";
import {
  BadgeAlert,
  BadgeCheck,
  BadgeMinus,
  Clock,
  Grid2x2,
} from "lucide-react";
import React from "react";

export default function ItemInfo({
  category,
  condition,
  createdAt,
}: {
  category: string;
  condition: string;
  createdAt: Date;
}) {
  return (
    <div className="flex flex-wrap py-4  gap-4 border-b border-t border-secondary">
      <div className="flex space-x-1 border p-2 items-center rounded-xl  ">
        <Grid2x2 className="size-5" />
        <p>
          Category:
          <span className="font-semibold">{" " + category}</span>
        </p>
      </div>
      <div className="flex space-x-1 border p-2 items-center rounded-xl">
        {condition === "New" ? (
          <BadgeCheck className="size-5" />
        ) : condition === "Used" ? (
          <BadgeAlert className="size-5" />
        ) : (
          <BadgeMinus className="size-5" />
        )}
        <p>
          Condition:
          <span className="font-semibold">{" " + condition}</span>
        </p>
      </div>
      <div className="flex space-x-1 border p-2 items-center rounded-xl">
        <Clock className="size-5" />
        <p>
          Listed
          <span className="font-semibold">
            {" " + formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </p>
      </div>
    </div>
  );
}
