"use client";
import MessageCard from "@/components/message/MessageCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { firestoreChatTypeWithId } from "@/lib/types";
import { usePathname } from "next/navigation";

type propTypes = {
  buyingChats: firestoreChatTypeWithId[];
  sellingChats: firestoreChatTypeWithId[];
};

const MessagesList = ({ buyingChats, sellingChats }: propTypes) => {
  const path = usePathname();

  return (
    <div
      className={`lg:w-[40%] min-w-80 w-full h-[88vh] overflow-y-scroll scrollbar-none sm:bg-inherit  border-r-2 border-secondary p-8 flex flex-col gap-4 ${
        //hide comp on small screen chat page and visible on large screen chat page.
        path.split("/").at(-1) != "messages" && "hidden lg:flex"
      }`}
    >
      <h2 className="text-3xl">Messages</h2>
      <Tabs defaultValue="Buying" className="w-full">
        <TabsList className="grid w-full grid-cols-2 text-lg h-fit">
          <TabsTrigger className="text-lg" value="Buying">
            Buying
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="Selling">
            Selling
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Buying">
          <div>
            {buyingChats.map((c) => (
              <MessageCard
                active={path.split("/").at(-1) == c.id}
                id={c.id}
                key={c.chatId}
                itemImg={c.itemSnapshot.thumbnail}
                sellerOrBuyerImg={c.sellerSnapshot.sellerImg}
                sellerOrBuyerName={c.sellerSnapshot.sellerName}
                lastMessageAt={c.lastMessageAt}
                itemTitle={c.itemSnapshot.title}
                lastMessage={c.lastMessage}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Selling">
          {" "}
          <div>
            {sellingChats.map((c) => (
              <MessageCard
                active={path.split("/").at(-1) == c.id}
                id={c.id}
                key={c.chatId}
                itemImg={c.itemSnapshot.thumbnail}
                sellerOrBuyerImg={c.BuyerSnapshot.BuyerImg}
                sellerOrBuyerName={c.BuyerSnapshot.BuyerName}
                lastMessageAt={c.lastMessageAt}
                itemTitle={c.itemSnapshot.title}
                lastMessage={c.lastMessage}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesList;
