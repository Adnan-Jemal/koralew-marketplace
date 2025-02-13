import { SelectUser } from "@/db/schema/users";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, DotIcon, MapPin, MessageSquareText } from "lucide-react";
import { fromDashedToCapitalizedWord } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CallSellerBtn } from "./CallSellerBtn";
import { Session } from "next-auth";
import MessageSellerBtn from "./MessageSellerBtn";

import { ItemWithImages } from "@/lib/types";
import { getChat } from "@/data/chat";

type SellerProfileTypes = {
  seller: SelectUser;
  session: Session | null;
  item: ItemWithImages;
};

export const SellerProfile = async ({
  seller,
  session,
  item,
}: SellerProfileTypes) => {
  const existingChatId = await getChat(seller.id, item.id);
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
            disabled={session?.user?.id == seller.id}
            sellerPhoneNumber={seller.phoneNumber}
          />
          {session?.user?.id == seller.id ? (
            <Button disabled className="w-full flex gap-2 text-lg rounded-xl">
              <MessageSquareText /> Message
            </Button>
          ) : (
            <MessageSellerBtn
              existingChatId={existingChatId}
              item={item}
              session={session}
              seller={seller}
            />
          )}
        </div>
      </div>
    </div>
  );
};
