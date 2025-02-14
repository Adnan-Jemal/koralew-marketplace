"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { firestoreChatTypeWithId } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageCard from "@/components/message/MessageCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Session } from "next-auth";

type MessagesListProps = {
  initialBuyingChats: firestoreChatTypeWithId[];
  initialSellingChats: firestoreChatTypeWithId[];
  session: Session | null;
};

const MessagesList: React.FC<MessagesListProps> = ({
  initialBuyingChats,
  initialSellingChats,
  session,
}) => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyingChats, setBuyingChats] = useState(initialBuyingChats);
  const [sellingChats, setSellingChats] = useState(initialSellingChats);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'buying');

  const onTabChange = (value: string) => {
    setActiveTab(value);
    if (path.toString() != `/account/messages?tab=${value}`)
      router.replace(`/account/messages?tab=${value}`);
  };

  //update url
  useEffect(() => {
    if (!searchParams.has('tab')) router.push("/account/messages?tab=buying");
  }, [path,searchParams,router]);
  //listen for chat changes
  useEffect(() => {
    if (!session?.user?.id) return;

    // Buying Chats (User is Buyer)
    const buyingChatsRef = collection(firestore, "chats");
    const buyingQuery = query(
      buyingChatsRef,
      where("buyerId", "==", session.user.id),
      orderBy("lastMessageAt", "desc")
    );

    const unsubscribeBuying = onSnapshot(
      buyingQuery,
      (snapshot) => {
        setBuyingChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            lastMessageAt: doc.data().lastMessageAt?.toDate(),
            createdAt: doc.data().createdAt?.toDate(),
          })) as firestoreChatTypeWithId[]
        );
      },
      (error) => console.error("Error fetching buying chats:", error)
    );

    return () => unsubscribeBuying();
  }, [session]);

  useEffect(() => {
    if (!session?.user?.id) return;

    // Selling Chats (User is Seller)
    const sellingChatsRef = collection(firestore, "chats");
    const sellingQuery = query(
      sellingChatsRef,
      where("sellerId", "==", session.user.id),
      where("itemSnapshot.status", "!=", "Removed"),
      orderBy("lastMessageAt", "desc")
    );

    const unsubscribeSelling = onSnapshot(
      sellingQuery,
      (snapshot) => {
        setSellingChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            lastMessageAt: doc.data().lastMessageAt?.toDate(),
            createdAt: doc.data().createdAt?.toDate(),
          })) as firestoreChatTypeWithId[]
        );
      },
      (error) => console.error("Error fetching selling chats:", error)
    );

    return () => unsubscribeSelling();
  }, [session]);

  return (
    <div
      className={`lg:w-[40%] min-w-80 w-full h-[88vh] overflow-y-scroll scrollbar-none sm:bg-inherit border-r-2 border-secondary p-8 flex flex-col gap-4 ${
        path.split("/").at(-1) !== "messages" && "hidden lg:flex"
      }`}
    >
      <h2 className="text-3xl">Messages</h2>

      <Tabs
        onValueChange={onTabChange}
        value={activeTab}
        
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 text-lg h-fit ">
          <TabsTrigger className="text-lg" value="buying">
            Buying
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="selling">
            Selling
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buying">
          {buyingChats.length > 0 ? (
            buyingChats.map((c) => (
              <MessageCard
                key={c.id}
                id={c.id}
                active={path.split("/").at(-1) === c.id}
                itemImg={c.itemSnapshot.thumbnail}
                sellerOrBuyerImg={c.sellerSnapshot.sellerImg}
                sellerOrBuyerName={c.sellerSnapshot.sellerName}
                lastMessageAt={c.lastMessageAt}
                itemTitle={c.itemSnapshot.title}
                lastMessage={c.lastMessage}
                tab={'buying'}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No buying messages yet.
            </p>
          )}
        </TabsContent>

        <TabsContent value="selling">
          {sellingChats.length > 0 ? (
            sellingChats.map((c) => (
              <MessageCard
                key={c.id}
                id={c.id}
                active={path.split("/").at(-1) === c.id}
                itemImg={c.itemSnapshot.thumbnail}
                sellerOrBuyerImg={c.BuyerSnapshot.BuyerImg}
                sellerOrBuyerName={c.BuyerSnapshot.BuyerName}
                lastMessageAt={c.lastMessageAt}
                itemTitle={c.itemSnapshot.title}
                lastMessage={c.lastMessage}
                tab='selling'
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No selling messages yet.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesList;
