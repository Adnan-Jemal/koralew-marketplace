import { getBuyingChats, getSellingChats } from "@/actions/read";
import { auth } from "@/auth";
import MessagesList from "@/components/message/MessagesList";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const sellingChats = await getSellingChats();
  const buyingChats = await getBuyingChats();
  return (
    <div className="flex">
      <MessagesList initialSellingChats={sellingChats} initialBuyingChats={buyingChats} session={session} />
      {children}
    </div>
  );
}
