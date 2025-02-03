import { getBuyingChats, getSellingChats } from "@/actions/read";
import MessagesList from "@/components/message/MessagesList";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sellingChats = await getSellingChats();
  const buyingChats = await getBuyingChats();
  return (
    <div className="flex">
      <MessagesList sellingChats={sellingChats} buyingChats={buyingChats} />
      {children}
    </div>
  );
}
