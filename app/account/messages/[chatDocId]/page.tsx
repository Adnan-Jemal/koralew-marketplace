import { auth } from "@/auth";
import Messages from "@/components/message/Messages";
import SendMessageForm from "@/components/message/SendMessageForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getChatById } from "@/data/chat";
import { getMessages } from "@/data/messag";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type chatPartnerType = {
  name: string;
  img: string;
  role: string;
};

async function page({ params }: { params: Promise<{ chatDocId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  const param = await params;
  const chatDoc = await getChatById(param.chatDocId);
  if (!chatDoc) {
    console.log("not chat found");
    return redirect("/");
  }
  const messages = await getMessages(chatDoc.chatId);

  const chatPartner =
    chatDoc.sellerId == session.user.id
      ? ({
          name: chatDoc.BuyerSnapshot.BuyerName,
          img: chatDoc.BuyerSnapshot.BuyerImg,
          role: "Buyer",
        } as chatPartnerType)
      : ({
          name: chatDoc.sellerSnapshot.sellerName,
          img: chatDoc.sellerSnapshot.sellerImg,
          role: "Seller",
        } as chatPartnerType);

  return (
    <div className="lg:max-w-[60%] flex flex-col w-full h-[88dvh] min-h-0">
      <div className="grid grid-cols-2 divide-x-2 items-center justify-between py-2 gap-2 border-b-2 px-4">
        <div className="flex gap-2 items-center justify-start p-1 w-full">
          <Button asChild className="size-10 p-2" variant={"secondary"}>
            <Link href={"/account/messages"}>
              <ArrowLeft className="text-primary" />
            </Link>
          </Button>

          <Avatar className="size-12">
            <AvatarImage className="object-cover" src={chatPartner.img} />
            <AvatarFallback>
              {chatPartner.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <p className="lg:text-lg">{chatPartner.name}</p>
            <p className="text-sm text-gray-500"> {chatPartner.role}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 text-end p-1 pl-4">
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500 "> Item</p>
            <p className="line-clamp-2 lg:text-lg">
              {chatDoc.itemSnapshot.title}
            </p>
          </div>
          <Avatar className="rounded-lg size-16">
            <AvatarImage
              className="object-cover"
              src={chatDoc.itemSnapshot.thumbnail}
            />
            <AvatarFallback className="rounded-lg">
              {chatDoc.itemSnapshot.title.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <Messages
          session={session}
          initialMessages={messages}
          chatId={chatDoc.chatId}
        />
      </div>
      <SendMessageForm
        chatDocId={param.chatDocId}
        chatId={chatDoc.chatId}
        session={session}
        receiverId={
          chatDoc.sellerId == session.user.id
            ? chatDoc.buyerId
            : chatDoc.sellerId
        }
        receiverType={
          chatDoc.sellerId == session.user.id ? "buying" : "selling"
        }
      />
    </div>
  );
}

export default page;
