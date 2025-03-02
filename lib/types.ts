import { SelectItemImages } from "@/db/schema/itemImages";
import { Timestamp } from "firebase/firestore";

export type conditionType = "New" | "Slightly Used" | "Used" | "Refurbished";
export type ItemWithImages = {
  id: number;
  title: string;
  description: string;
  userId: string;
  category: string;
  condition: conditionType;
  price: string;
  views: number;
  createdAt: Date;
  status: "Active" | "Under Review" | "Rejected" | "Sold" | "Removed";
  images: SelectItemImages[];
};

export type firebaseChatType = {
  chatId: string;
  sellerId: string;
  buyerId: string;
  ItemId: number;
  createdAt: Timestamp | null;
  lastMessage: string;
  lastMessageAt: Timestamp | null;
  sellerSnapshot: {
    sellerName: string;
    sellerImg: string;
  };
  BuyerSnapshot: {
    BuyerName: string;
    BuyerImg: string;
  };
  itemSnapshot: {
    title: string;
    thumbnail: string;
    originalPrice: string;
    status: "Active" | "Under Review" | "Rejected" | "Sold" | "Removed";
  };
};

export type firestoreChatTypeWithId = {
  chatId: string;
  sellerId: string;
  buyerId: string;
  itemId: number;
  createdAt: Date | undefined;
  lastMessage: string;
  lastMessageAt: Date | undefined;
  sellerSnapshot: {
    sellerName: string;
    sellerImg: string;
  };
  BuyerSnapshot: {
    BuyerName: string;
    BuyerImg: string;
  };
  itemSnapshot: {
    title: string;
    thumbnail: string;
    originalPrice: string;
    status: ItemStatusType;
  };
  id: string;
};

export type ItemStatusType =
  | "Active"
  | "Under Review"
  | "Rejected"
  | "Sold"
  | "Removed";

export type firebaseMessageType = {
  chatDocId: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageRead: string;
  sentAt: Date | undefined;
};
export type firestoreMessageTypeWithId = {
  id: string;
  chatDocId: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageRead: string;
  sentAt: Date | undefined;
};

export type notificationTypes =
  | "New Message"
  | "Item Listed"
  | "Item Updated"
  | "Item Sold"
  | "Promotional";

export type firestoreNotificationsWithId = {
  id: string;
  receiver: string;
  type: notificationTypes;
  message: string;
  link: string;
  read: boolean;
  sentAt: Date | undefined;
};
