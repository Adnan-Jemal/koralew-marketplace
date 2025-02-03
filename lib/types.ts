import { SelectProductImages } from "@/db/schema/productImages";
import { Timestamp } from "firebase/firestore";

export type ItemWithImages = {
  id: number;
  title: string;
  description: string;
  userId: string;
  category: string;
  condition: "New" | "Slightly Used" | "Used" | "Refurbished";
  price: string;
  views: number;
  createdAt: Date;
  status: "Active" | "Under Review" | "Rejected" | "Sold" | "Removed";
  images: SelectProductImages[];
};

export type firebaseChatType = {
  chatId: string;
  sellerId: string;
  buyerId: string;
  productId: number;
  createdAt: Timestamp | null;
  lastMessage: string;
  lastMessageAt: Timestamp | null;
  sellerSnapshot: {
    sellerName: string;
    sellerImg: string;
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
  productId: number;
  createdAt: Date | undefined;
  lastMessage: string;
  lastMessageAt: Date | undefined;
  sellerSnapshot: {
    sellerName: string;
    sellerImg: string;
  };
  itemSnapshot: {
    title: string;
    thumbnail: string;
    originalPrice: string;
    status: "Active" | "Under Review" | "Rejected" | "Sold" | "Removed";
  };
  id: string;
};
