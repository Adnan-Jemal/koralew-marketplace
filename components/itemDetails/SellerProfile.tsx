import React from "react";

import { SelectUser } from "@/db/schema";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, DotIcon, MapPin, MessageSquareText } from "lucide-react";
import { fromDashedToCapitalizedWord } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CallSellerBtn } from "./CallSellerBtn";
import { auth } from "@/auth";
import Link from "next/link";

export const SellerProfile = async ({ seller }: { seller: SelectUser }) => {
  const session = await auth();
  return (
    <div className="flex p-6 border border-secondary rounded-2xl shadow-sm gap-4 flex-col md:flex-row">
      <Avatar className="size-20 mx-auto">
        <AvatarImage src={seller.image || undefined} />
        <AvatarFallback className="text-5xl m-auto ">
          {seller?.name!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center justify-center  w-full gap-2">
        <div className="flex w-full justify-between items-center flex-col md:flex-row px-1 ">
          <p className="text-2xl">{seller.name}</p>
          <span className="border rounded-md bg-secondary py-1 px-2 hidden md:inline">
            Seller
          </span>
        </div>

        <div className="flex  flex-col md:flex-row w-full mx-auto">
          <div className="flex items-center justify-center space-x-1  ">
            {" "}
            <MapPin className="size-4" />
            <p>
              <span className="">
                {" " +
                  fromDashedToCapitalizedWord(seller.country) +
                  " / " +
                  seller.city}
              </span>
            </p>
          </div>

          <DotIcon className="hidden md:inline" />
          <div className="flex items-center justify-center space-x-1  ">
            {" "}
            <Clock className="size-4" />
            <p>
              Joined
              <span className="">
                {" " +
                  formatDistanceToNow(seller.joinedAt, { addSuffix: true })}
              </span>
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex w-full gap-4">
          <CallSellerBtn
            session={session}
            sellerPhoneNumber={seller.phoneNumber}
          />

          <Button asChild className="w-full flex gap-2 text-lg rounded-xl">
            <Link href="/account/messages">
              <MessageSquareText /> Message
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
