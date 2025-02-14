import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";

type propTypes = {
  id: string;
  active: boolean;
  itemImg: string;
  sellerOrBuyerImg: string;
  sellerOrBuyerName: string;
  lastMessageAt: Date | undefined;
  itemTitle: string;
  lastMessage: string;
  tab:'buying' | 'selling'
};

const MessageCard = ({
  id,
  active,
  itemImg,
  itemTitle,
  lastMessage,
  lastMessageAt,
  sellerOrBuyerImg,
  sellerOrBuyerName,
  tab
}: propTypes) => {
  return (
    <Link href={`/account/messages/${id}?tab=${tab}`}>
      <div
        className={`w-full border-2 flex border-secondary ${
          active && "bg-secondary"
        } rounded-xl my-6 h-fit p-4 gap-2 cursor-pointer shadow-sm `}
      >
        <div className=" w-[20%] relative h-full">
          <AspectRatio ratio={1 / 1}>
            <Image
              alt="Item Image"
              height={200}
              width={200}
              src={itemImg}
              className=" rounded-xl h-full w-full object-cover  "
            />
          </AspectRatio>

          <Avatar className="absolute -bottom-2 -right-2">
            <AvatarImage className="object-cover" src={sellerOrBuyerImg} />
            <AvatarFallback>
              {sellerOrBuyerName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className=" flex-col pl-4  pr-2 flex-1">
          <div className="flex justify-between ">
            <p className="text-sm">{sellerOrBuyerName}</p>
            <p className="text-xs">
              {formatDistanceToNowStrict(lastMessageAt || "", {
                addSuffix: true,
              })}
            </p>
          </div>

          <p className="text-lg font-semibold line-clamp-1">{itemTitle}</p>
          <p className="text-md  text-gray-400 line-clamp-1">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
};

export default MessageCard;
